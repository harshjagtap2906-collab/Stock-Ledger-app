const DB_NAME = 'stock-ledger-db';
let db = null;
let items = [];
let firebaseReady = false;

const stampColors = [
  ['var(--stamp-1)','var(--stamp-1-bg)'],
  ['var(--stamp-2)','var(--stamp-2-bg)'],
  ['var(--stamp-3)','var(--stamp-3-bg)'],
  ['var(--stamp-4)','var(--stamp-4-bg)'],
  ['var(--stamp-5)','var(--stamp-5-bg)'],
];
function catColor(cat){
  let hash = 0;
  for(let i=0;i<cat.length;i++) hash = (hash*31 + cat.charCodeAt(i)) % 1000;
  return stampColors[hash % stampColors.length];
}

function uid(){
  return 'm_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}

function setupNotConfigured(){
  document.getElementById('loginScreen').innerHTML = `
    <div class="logincard">
      <div class="loginbrand">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAIAAADdvvtQAAAChElEQVR4nO3dO0oDQQCAYRXvI4i9aaytBBGxEAuLVLbewcrC3scVLGx9XMsDKBj93U2yfF89MDvkZzYw2c3mztnxBvzV1rIvgPUmIBIBkQiIREAkAiIREImASAREIiASAZEIiERAJAIiERCJgEgERCIgEgGRCIhEQCQCIhEQiYBIBEQiIBIBkQiIREAkAiIREImASAREIiASAZEIiERAJAIiERCJgEgERCIgEgGRCIhEQCQCIhEQiYBIBEQiIBIBkQiIREAkAiIREImASAREIiASAZEIiERAJAIiERCJgEgERCIgku0xJ7s+v5jt7i04+Obp4fn9tUx3uD+bHx0vOPj54+3m8X7BwZNZSGcHIhEQiYBIBEQiIBIBkQiIREAkAiIREImASAREIiASAZEIiERAJAIiERCJgEgERCIgEgGRjPpYz69cnZxenZwu+yr+wWQW8i07EImASAREIiASAZEIiERAJAIiERCJgEhW9yhj5Bd7DWcyC/mWHYhEQCQCIhEQiYBIBEQiIBIBkQiIREAkAiIREImASAREIiASAZEIiERAJAIiERCJgEgERCIgks2dsxV94Ii1YAciERCJgEgERCIgEgGRCIhEQCQCIhEQiYBIBEQiIBIBkQiIREAkAiIREImASAREIiASAZEIiERAJGP84dzL7d0Is/DVwfxy6CkGfzJVPUs3aEbD3sLUswoG/RR8ByIREImASAREIiASAZEIiERAJAIiERDJsAGNcJjHj9b4LIzJG+M90Y5Ul2UKP+dg2tzCSAREIiASAZEIiERAJAIiERCJgEgERCIgEgGRCIhEQCQCIhEQiYBIBEQiIBIBkQiIREAkAiIREImASD4BbdM9nSKy66YAAAAASUVORK5CYII=" alt="Harsh Heater's" class="logo-img">
        <h1>Stock Ledger</h1>
        <span class="company">Harsh Heater's</span>
      </div>
      <p class="loginhint">Sync isn't set up yet. Open <code>firebase-config.js</code> and follow the README to connect your free Firebase project, then reload this page.</p>
    </div>`;
}

async function init(){
  const cfg = window.firebaseConfig;
  if(!cfg || cfg.apiKey === 'YOUR_API_KEY'){
    setupNotConfigured();
    return;
  }

  try{
    firebase.initializeApp(cfg);
    db = firebase.firestore();
    try{
      await db.enablePersistence({ synchronizeTabs: true });
    }catch(e){
      // Persistence unavailable (e.g. private browsing, multiple tabs without sync) — app still works, just without local caching between full closes.
    }
  }catch(e){
    document.getElementById('foot').textContent = 'Could not connect. Check firebase-config.js and your Firebase project settings.';
    return;
  }

  let unsubscribe = null;

  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('appScreen').style.display = '';
      firebaseReady = true;
      if(unsubscribe) unsubscribe();
      unsubscribe = db.collection('materials').onSnapshot(
        (snapshot) => {
          items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          render();
        },
        (err) => {
          document.getElementById('foot').textContent = 'Sync error: ' + err.message;
        }
      );
    } else {
      firebaseReady = false;
      if(unsubscribe){ unsubscribe(); unsubscribe = null; }
      items = [];
      document.getElementById('appScreen').style.display = 'none';
      document.getElementById('loginScreen').style.display = '';
    }
  });

  if('serviceWorker' in navigator){
    try{ await navigator.serviceWorker.register('service-worker.js'); }catch(e){}
  }
}

function currentUserLabel(){
  const user = firebase.auth().currentUser;
  return user && user.email ? user.email : 'Someone';
}

async function logHistory(action, description){
  if(!db) return;
  try{
    await db.collection('history').add({
      action,
      description,
      user: currentUserLabel(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }catch(e){
    // History logging failures shouldn't block the actual inventory action.
  }
}

async function addItem(name, cat, qty){
  const data = { name: name.trim(), category: (cat.trim() || 'Uncategorized'), qty: Math.max(0, Math.round(qty)) };
  await db.collection('materials').doc(uid()).set(data);
  logHistory('added', `Added "${data.name}" — ${data.qty} in ${data.category}`);
}

async function updateItem(id, patch){
  const before = items.find(i => i.id === id);
  await db.collection('materials').doc(id).update(patch);
  if(!before) return;
  if('qty' in patch && patch.qty !== before.qty){
    logHistory('qty_changed', `"${before.name}" quantity changed from ${before.qty} to ${patch.qty}`);
  }
  if('name' in patch && patch.name !== before.name){
    logHistory('renamed', `Renamed "${before.name}" to "${patch.name}"`);
  }
}

async function deleteItemWithClient(id, client){
  const item = items.find(i => i.id === id);
  await db.collection('materials').doc(id).delete();
  if(item){
    logHistory('deleted', `Removed "${item.name}" (was ${item.qty} in ${item.category}) — given to: ${client}`);
  }
}

async function decrementWithClient(id, client){
  const before = items.find(i => i.id === id);
  if(!before) return;
  const newQty = Math.max(0, before.qty - 1);
  await db.collection('materials').doc(id).update({ qty: newQty });
  logHistory('qty_changed', `"${before.name}" quantity changed from ${before.qty} to ${newQty} — given to: ${client}`);
}

async function clearAll(){
  const snapshot = await db.collection('materials').get();
  const batch = db.batch();
  snapshot.docs.forEach(d => batch.delete(d.ref));
  await batch.commit();
}

function getCategories(){
  const set = new Set(items.map(i => i.category));
  return Array.from(set).sort((a,b) => a.localeCompare(b));
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function render(){
  const cats = getCategories();
  const catFilter = document.getElementById('catFilter');
  const currentFilter = catFilter.value;
  catFilter.innerHTML = '<option value="">All categories</option>' + cats.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  catFilter.value = cats.includes(currentFilter) ? currentFilter : '';

  const catList = document.getElementById('catList');
  catList.innerHTML = cats.map(c => `<option value="${escapeHtml(c)}">`).join('');

  document.getElementById('statTotal').textContent = items.length;
  document.getElementById('statOut').textContent = items.filter(i => i.qty === 0).length;

  const search = document.getElementById('search').value.trim().toLowerCase();
  const catSel = catFilter.value;
  const sortBy = document.getElementById('sortBy').value;

  let visible = items.filter(i => {
    const matchesSearch = !search || i.name.toLowerCase().includes(search) || i.category.toLowerCase().includes(search);
    const matchesCat = !catSel || i.category === catSel;
    return matchesSearch && matchesCat;
  });

  visible.sort((a,b) => {
    if(sortBy === 'name') return a.name.localeCompare(b.name);
    if(sortBy === 'category') return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    if(sortBy === 'qty-asc') return a.qty - b.qty;
    if(sortBy === 'qty-desc') return b.qty - a.qty;
    return 0;
  });

  const rowsEl = document.getElementById('rows');
  if(visible.length === 0){
    rowsEl.innerHTML = `<div class="empty"><div class="big">${items.length === 0 ? 'No materials yet' : 'Nothing matches'}</div>${items.length === 0 ? 'Add your first material above to start the ledger.' : 'Try a different search or category.'}</div>`;
  } else {
    rowsEl.innerHTML = visible.map(rowHtml).join('');
  }

  document.getElementById('foot').textContent = `${items.length} material${items.length === 1 ? '' : 's'} tracked · synced across your devices`;

  attachRowHandlers();
}

function rowHtml(i){
  const [ink, bg] = catColor(i.category);
  return `
  <div class="row" data-id="${i.id}">
    <div class="mname">
      <input type="text" value="${escapeHtml(i.name)}" data-field="name" data-id="${i.id}">
      <span class="catpill catpill-mobile" style="color:${ink};background:${bg};">${escapeHtml(i.category)}</span>
    </div>
    <div class="colcat"><span class="catpill" style="color:${ink};background:${bg};">${escapeHtml(i.category)}</span></div>
    <div class="qtybox">
      <button data-act="dec" data-id="${i.id}" aria-label="Decrease quantity">−</button>
      <span class="n ${i.qty === 0 ? 'zero' : ''}">${i.qty}</span>
      <button data-act="inc" data-id="${i.id}" aria-label="Increase quantity">+</button>
    </div>
    <button class="delbtn" data-act="del" data-id="${i.id}">Remove</button>
  </div>`;
}

function attachRowHandlers(){
  document.querySelectorAll('.qtybox button').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const it = items.find(x => x.id === id);
      if(!it) return;
      if(btn.dataset.act === 'inc'){
        updateItem(id, { qty: it.qty + 1 });
      } else {
        if(it.qty <= 0) return;
        openActionModal('decrement', id);
      }
    };
  });
  document.querySelectorAll('.delbtn').forEach(btn => {
    btn.onclick = () => openActionModal('delete', btn.dataset.id);
  });
  document.querySelectorAll('.mname input').forEach(inp => {
    inp.onchange = () => {
      const val = inp.value.trim();
      if(!val){ inp.value = items.find(x => x.id === inp.dataset.id).name; return; }
      updateItem(inp.dataset.id, { name: val });
    };
  });
}

document.getElementById('addBtn').onclick = () => {
  const nameEl = document.getElementById('fName');
  const catEl = document.getElementById('fCat');
  const qtyEl = document.getElementById('fQty');
  const errEl = document.getElementById('addErr');

  const name = nameEl.value.trim();
  const qty = parseInt(qtyEl.value, 10);

  if(!name){
    errEl.textContent = 'Enter a material name first.';
    errEl.style.display = 'block';
    nameEl.focus();
    return;
  }
  if(isNaN(qty) || qty < 0){
    errEl.textContent = 'Quantity must be zero or more.';
    errEl.style.display = 'block';
    qtyEl.focus();
    return;
  }
  errEl.style.display = 'none';
  addItem(name, catEl.value, qty);
  nameEl.value = '';
  catEl.value = '';
  qtyEl.value = '1';
  nameEl.focus();
};

['fName','fCat','fQty'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => { if(e.key === 'Enter') document.getElementById('addBtn').click(); });
});

document.getElementById('search').addEventListener('input', render);
document.getElementById('catFilter').addEventListener('change', render);
document.getElementById('sortBy').addEventListener('change', render);

document.getElementById('exportBtn').onclick = () => {
  const headers = ['Material', 'Category', 'Quantity'];
  const escapeCsv = (val) => {
    const s = String(val);
    if(/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const lines = [headers.join(',')];
  items.forEach(i => {
    lines.push([escapeCsv(i.name), escapeCsv(i.category), i.qty].join(','));
  });
  const csv = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0,10);
  a.href = url;
  a.download = `harsh-heaters-stock-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

document.getElementById('importBtn').onclick = () => {
  document.getElementById('importFile').click();
};

function parseCsv(text){
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for(let i = 0; i < text.length; i++){
    const c = text[i];
    if(inQuotes){
      if(c === '"'){
        if(text[i+1] === '"'){ field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else {
      if(c === '"') inQuotes = true;
      else if(c === ','){ row.push(field); field = ''; }
      else if(c === '\n' || c === '\r'){
        if(c === '\r' && text[i+1] === '\n') i++;
        row.push(field); field = '';
        if(row.length > 1 || row[0] !== '') rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if(field !== '' || row.length){ row.push(field); rows.push(row); }
  return rows;
}

document.getElementById('importFile').onchange = async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  try{
    const text = await file.text();
    const isJson = file.name.toLowerCase().endsWith('.json');
    let incoming = [];

    if(isJson){
      const parsed = JSON.parse(text);
      if(!Array.isArray(parsed)) throw new Error('bad format');
      incoming = parsed.map(raw => ({
        name: String(raw.name || 'Unnamed'),
        category: String(raw.category || 'Uncategorized'),
        qty: Math.max(0, Math.round(Number(raw.qty) || 0))
      }));
    } else {
      const clean = text.replace(/^\uFEFF/, '');
      const rows = parseCsv(clean);
      if(rows.length === 0) throw new Error('empty file');
      const header = rows[0].map(h => h.trim().toLowerCase());
      const nameIdx = header.indexOf('material') >= 0 ? header.indexOf('material') : 0;
      const catIdx = header.indexOf('category') >= 0 ? header.indexOf('category') : 1;
      const qtyIdx = header.indexOf('quantity') >= 0 ? header.indexOf('quantity') : 2;
      const dataRows = /material|name/i.test(rows[0][0] || '') ? rows.slice(1) : rows;
      incoming = dataRows
        .filter(r => r.length && r[nameIdx] && r[nameIdx].trim())
        .map(r => ({
          name: r[nameIdx].trim(),
          category: (r[catIdx] || 'Uncategorized').trim() || 'Uncategorized',
          qty: Math.max(0, Math.round(Number(r[qtyIdx]) || 0))
        }));
    }

    if(incoming.length === 0) throw new Error('no rows found');

    const merge = confirm(`Import ${incoming.length} material(s). Click OK to merge with your current list, or Cancel to replace it entirely.`);
    if(!merge){
      await clearAll();
    }
    for(const raw of incoming){
      await db.collection('materials').doc(uid()).set(raw);
    }
    logHistory('imported', `Imported ${incoming.length} material(s) from ${file.name}${merge ? ' (merged)' : ' (replaced list)'}`);
  }catch(err){
    alert('Could not read that file. Use a file exported from this app (.csv or .json).');
  }
  e.target.value = '';
};

if(!navigator.onLine){
  document.getElementById('statusTag').textContent = 'offline';
}
window.addEventListener('online', () => document.getElementById('statusTag').textContent = 'offline-ready');
window.addEventListener('offline', () => document.getElementById('statusTag').textContent = 'offline');

document.getElementById('loginBtn').onclick = async () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginErr');
  errEl.style.display = 'none';

  if(!email || !password){
    errEl.textContent = 'Enter both your email and password.';
    errEl.style.display = 'block';
    return;
  }

  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.textContent = 'Logging in…';
  try{
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }catch(e){
    let msg = 'Could not log in. Check your email and password.';
    if(e.code === 'auth/invalid-email') msg = 'That email address looks invalid.';
    if(e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') msg = 'Email or password is incorrect.';
    if(e.code === 'auth/too-many-requests') msg = 'Too many attempts. Wait a moment and try again.';
    if(e.code === 'auth/network-request-failed') msg = 'No internet connection — you need to be online to log in the first time on this device.';
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }
  btn.disabled = false;
  btn.textContent = 'Log in';
};

['loginEmail','loginPassword'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => { if(e.key === 'Enter') document.getElementById('loginBtn').click(); });
});

document.getElementById('logoutBtn').onclick = () => {
  firebase.auth().signOut();
};

let pendingAction = null; // { type: 'decrement' | 'delete', id }

function openActionModal(type, id){
  const item = items.find(i => i.id === id);
  if(!item) return;
  pendingAction = { type, id };

  const titleEl = document.getElementById('actionModalTitle');
  const textEl = document.getElementById('actionModalText');
  const confirmBtn = document.getElementById('actionModalConfirm');
  const nameInput = document.getElementById('actionClientName');
  const errEl = document.getElementById('actionModalErr');

  nameInput.value = '';
  errEl.style.display = 'none';

  if(type === 'delete'){
    titleEl.textContent = 'Remove this material?';
    textEl.textContent = `Are you sure you want to remove "${item.name}" from your inventory? This can't be undone.`;
    confirmBtn.textContent = 'Yes, remove';
    confirmBtn.classList.add('dangerbtn');
  } else {
    titleEl.textContent = 'Reduce quantity';
    textEl.textContent = `Reducing "${item.name}" from ${item.qty} to ${item.qty - 1}.`;
    confirmBtn.textContent = 'Confirm';
    confirmBtn.classList.remove('dangerbtn');
  }

  document.getElementById('actionModal').style.display = 'flex';
  nameInput.focus();
}

function closeActionModal(){
  pendingAction = null;
  document.getElementById('actionModal').style.display = 'none';
}

document.getElementById('actionModalCancel').onclick = closeActionModal;
document.getElementById('actionModalConfirm').onclick = async () => {
  const nameInput = document.getElementById('actionClientName');
  const errEl = document.getElementById('actionModalErr');
  const client = nameInput.value.trim();

  if(!client){
    errEl.textContent = 'Client name is required — enter who this material is going to.';
    errEl.style.display = 'block';
    nameInput.focus();
    return;
  }
  if(!pendingAction) return;

  const { type, id } = pendingAction;
  if(type === 'delete'){
    await deleteItemWithClient(id, client);
  } else {
    await decrementWithClient(id, client);
  }
  closeActionModal();
};
document.getElementById('actionModal').addEventListener('click', (e) => {
  if(e.target.id === 'actionModal') closeActionModal();
});
document.getElementById('actionClientName').addEventListener('keydown', e => {
  if(e.key === 'Enter') document.getElementById('actionModalConfirm').click();
});

let historyUnsubscribe = null;

function formatHistoryTime(ts){
  if(!ts || !ts.toDate) return 'just now';
  return ts.toDate().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function openHistoryModal(){
  document.getElementById('historyModal').style.display = 'flex';
  const listEl = document.getElementById('historyList');
  listEl.innerHTML = 'Loading…';
  if(historyUnsubscribe) historyUnsubscribe();
  historyUnsubscribe = db.collection('history').orderBy('timestamp', 'desc').limit(200).onSnapshot(
    (snapshot) => {
      if(snapshot.empty){
        listEl.innerHTML = '<div class="hempty">No activity yet.</div>';
        return;
      }
      listEl.innerHTML = snapshot.docs.map(d => {
        const h = d.data();
        return `<div class="hitem"><div class="haction">${escapeHtml(h.description || '')}</div><div class="hmeta">${escapeHtml(h.user || 'Someone')} · ${formatHistoryTime(h.timestamp)}</div></div>`;
      }).join('');
    },
    () => { listEl.innerHTML = '<div class="hempty">Could not load history.</div>'; }
  );
}

function closeHistoryModal(){
  document.getElementById('historyModal').style.display = 'none';
  if(historyUnsubscribe){ historyUnsubscribe(); historyUnsubscribe = null; }
}

document.getElementById('historyBtn').onclick = openHistoryModal;
document.getElementById('historyClose').onclick = closeHistoryModal;
document.getElementById('historyModal').addEventListener('click', (e) => {
  if(e.target.id === 'historyModal') closeHistoryModal();
});

init();
