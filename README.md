Harsh Heater's — Stock Ledger
A materials inventory tracker that installs like a real app on laptop and
phone, works with zero internet connection, and automatically syncs
across all your devices whenever any one of them has a connection.
How the sync works
This app uses Firebase Firestore (a free Google service) as its backend.
Firestore is built specifically for this kind of app: every device keeps a
local cached copy of the data (so it works fully offline — add, edit, delete,
all work with zero signal), and the moment any device gets back online, it
automatically pushes and pulls changes with every other device. No manual
export/import needed, no server for you to run.
This needs a one-time setup (about 10 minutes, free, no credit card) to
create your own private Firebase project. Your inventory data lives in that
project, under your control — not shared with anyone outside your team.
One-time setup: create your Firebase project
Go to https://console.firebase.google.com and sign in with any Google
account. Click "Add project", name it (e.g. "harsh-heaters-stock"), and
finish the wizard (you can disable Google Analytics, it's not needed).
In your new project, click the web icon (`</>`) on the project
overview page to register a web app. Give it any nickname and click
"Register app". You do not need Firebase Hosting for this step.
Firebase shows you a `firebaseConfig` object with values like `apiKey`,
`authDomain`, `projectId`, etc. Copy each value into `firebase-config.js`
in this folder, replacing the placeholder text.
In the left sidebar, click Build → Firestore Database → Create
database. Choose any location close to you, and start in
production mode.
Go to the Rules tab of Firestore and replace the rules with:
```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /materials/{materialId} {
         allow read, write: if request.auth != null;
       }
       match /history/{historyId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
Click "Publish". This means only people using your app (signed in
automatically, see next step) can read or write your inventory.
In the left sidebar, click Build → Authentication → Get started.
On the "Sign-in method" tab, enable Email/Password (click it, toggle
"Enable", click "Save"). This is what powers the login screen.
Still on Authentication, click the Users tab, then Add user for
each person on your team who should have access. Enter their email and
set a password for them (they can be the same simple password to start —
just tell your team what it is). Repeat for every teammate. There's no
public sign-up screen in the app — only accounts you create here can log in.
That's it — your backend is live and free (Firestore's free tier covers
far more reads/writes per day than a small business inventory needs).
Hosting the app files
Same as before — the app itself is still a set of static files that need a
URL to be installed on phones. Use GitHub Pages or Netlify Drop (see the
install guides from earlier), uploading every file in this folder
including your edited `firebase-config.js`.
Installing and logging in on each device
Install the same way as before (address bar install icon on laptop,
Share → Add to Home Screen on iPhone, Chrome's Install prompt on Android).
The first time it opens, it shows a login screen — each teammate enters
the email and password you created for them in step 7 above. After that
first login (which needs internet), the session stays remembered on that
device, including offline — they won't need to log in again unless they
explicitly log out.
Add a material on one logged-in device and watch it appear on the others
within a second or two while both are online — then try switching one to
airplane mode: it still works, and syncs up the moment it reconnects.
Managing who has access
To remove someone's access, delete or disable their account in Firebase
console → Authentication → Users. To reset a forgotten password, use the
same screen (click the user, then the options menu). No app update needed
for either — it takes effect immediately.
Deleting materials safely
Clicking Remove on any material now shows a confirmation popup before
anything is deleted — you have to explicitly confirm "Yes, remove" or it
cancels. This applies on every device.
Activity history
The History button opens a running log of every action taken in the
app — materials added, quantities changed, renames, removals, and bulk
imports — each with who did it and when. It updates live and syncs the
same way the inventory does, so it's a shared record across your whole
team, not just one device.
Exporting to Excel
The Export to Excel button still works exactly as before, producing a
`.csv` file with every material, category, and quantity — handy for
printing, sharing outside the app, or as an extra backup. Import can
also still read `.csv` or `.json` files in, on top of the automatic sync.
A note on privacy
With email/password accounts, only people you've explicitly added in
Firebase console → Authentication → Users can log in and see your
inventory — there's a real password wall now. Keep your Firebase project
login (the Google account you signed up with) private, since that's what
controls the whole project.
Files in this folder
`index.html`, `styles.css`, `app.js` — the app
`firebase-config.js` — your Firebase project keys (fill this in)
`manifest.json` — makes it installable
`service-worker.js` — caches everything for offline use
`icons/` — app icons
