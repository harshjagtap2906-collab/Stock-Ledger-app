I already have a base version of this software/application developed in Claude.

Your task is NOT to blindly rebuild the application from scratch.

First, inspect the existing codebase, architecture, database/schema, UI, components, routes, APIs, authentication, and existing functionality. Understand what has already been implemented.

Then enhance the existing application to meet the complete requirements below.

IMPORTANT DEVELOPMENT RULES
Preserve existing working functionality.
Do not unnecessarily rewrite or replace existing components.
Reuse the existing technology stack and architecture wherever practical.
Before making major architectural changes, understand the current implementation.
If a requested feature already partially exists, improve/extend it instead of creating a duplicate.
Keep the application modular and maintainable.
Do not hard-code customer, product, invoice, GST, accounting, or company data.
All business data must be stored in the database.
The application must be designed for a real manufacturing business, not merely as a demo invoice generator.
The UI should be professional, clean, responsive, and easy for a non-technical business owner to operate.
Use proper validation throughout the application.
Important financial records should not be permanently deleted without confirmation/audit handling.
Maintain an audit trail for important changes.
All calculations must be performed programmatically and consistently.
Avoid duplicate data wherever possible by using master records and relationships.
The software must support future expansion.
Financial transactions must be linked to appropriate ledger/accounting entries wherever applicable.
Do not create separate, disconnected financial data for invoices, payments and ledgers.
The ledger should be generated from actual business transactions rather than manually maintained duplicate records.
Historical financial transactions must remain unchanged even if master data is subsequently modified.
1. PRIMARY OBJECTIVE

Build/enhance the application into a complete:

Heater Manufacturing Business Management + Billing + Accounting/Ledger + GST Software

The system should manage:

Customers
Customer history
Products
Heater specifications
Product dimensions
Unit conversion
Quotations
Sales Orders
Production Orders
Delivery Challans
Sales Invoices
Payments
Customer Ledgers
Supplier Ledgers
Cash & Bank Ledgers
General Ledger
Outstanding amounts
Credit Notes
Debit Notes
Sales Returns
Inventory
Raw Materials
Finished Goods
Suppliers
Purchases
Purchase Payments
GST-related information
CA/GST data exports
Accounting reports
Business reports
Dashboard
Users and permissions
Company settings
Invoice numbering
Financial year management
Backup/export functionality

The system should allow the business owner to search for a customer and immediately see their complete business history.

Example:

Search:

ABC Industries

The application should show:

Customer information
GST information
Previous quotations
Previous orders
Previous invoices
Products purchased
Quantities purchased
Rates
Payments
Outstanding balance
Customer ledger
Credit/debit notes
Total business value
Complete transaction history
2. APPLICATION MODULES

Create the application using the following major modules:

Dashboard
Customers
Products
Quotations
Sales Orders
Production
Delivery Challans
Invoices
Payments & Receipts
Customer Ledger
Supplier Ledger
Accounting / General Ledger
Credit/Debit Notes
Inventory
Purchases
Suppliers
GST / CA Reports
Accounting Reports
Business Reports
Users & Permissions
Settings
Backup / Data Export
3. DASHBOARD

Create a professional business dashboard.

Show cards for:

Today's Sales
This Month's Sales
This Year's Sales
Total Outstanding
Payments Received
Payments Made
Receivables
Payables
Cash Balance
Bank Balance
Pending Orders
Pending Production
Ready for Dispatch
Low Stock Items
Number of Customers
Number of Suppliers
Number of Invoices

Include useful charts such as:

Monthly sales
Sales by customer
Sales by product
Outstanding payments
Receivables vs Payables
Cash/Bank balance
Order status
Production status

Allow date filtering.

Example:

From: 01-Apr-2026

To: 31-Mar-2027

4. CUSTOMER MASTER

Create a complete Customer Master.

Fields should include:

Basic Information
Customer ID
Customer Name
Company Name
Customer Type
Contact Person
Mobile Number
Alternate Mobile
Email
Website
Notes
Billing Address
Address Line 1
Address Line 2
City
District
State
State Code
PIN Code
Country
Shipping Address

Allow:

Same as Billing Address

If unchecked, capture separate shipping address.

GST Information
GST Registration Status
GSTIN
PAN
State
State Code
Place of Supply
GST Customer Type

Possible customer types:

Registered Business
Unregistered
Composition
Other
Commercial Information
Payment Terms
Credit Limit
Opening Balance
Opening Balance Type
Customer Status
Notes

Customer status:

Active
Inactive
Blocked

Opening balance must support:

Debit
Credit
5. CUSTOMER PROFILE

Every customer should have a detailed profile page.

Example:

ABC Industries

Display summary cards:

Total Orders
Total Invoices
Total Sales
Total Paid
Outstanding
Opening Balance
Current Balance
Last Order Date
Last Invoice Date

Then show tabs:

Overview

Customer information.

Quotations

All quotations issued to the customer.

Orders

All sales orders.

Invoices

All invoices.

Payments

All payments received.

Outstanding

All unpaid/partially paid invoices.

Products Purchased

Show:

Product
Total Quantity
Number of Orders
Last Purchase Date
Average Rate
Total Value
Ledger

Display the complete customer ledger.

Transaction History

A chronological history of all activity.

6. POWERFUL GLOBAL SEARCH

Create a global search.

The user should be able to search by:

Customer name
Company name
Customer ID
GSTIN
Mobile number
Invoice number
Order number
Quotation number
Delivery Challan number
Product name
Product code
Customer PO number
Payment reference
Ledger/account name

Search should provide relevant results immediately.

7. PRODUCT MASTER

Create a Product Master specifically suitable for a heater manufacturing business.

Fields:

Product ID
Product Code
Product Name
Product Category
Product Type
Description
HSN/SAC
GST Rate
Standard Selling Rate
Unit of Measurement
Active/Inactive

Examples of product categories:

Tubular Heater
Coil Heater
Cartridge Heater
Band Heater
Immersion Heater
Finned Heater
Ceramic Heater
Customized Heater
Other

Do not hard-code these categories.

Allow the administrator to add/edit categories.

8. HEATER-SPECIFIC PRODUCT SPECIFICATIONS

Because this is a heater manufacturing business, products need technical specifications.

Support configurable fields such as:

Wattage
Voltage
Length
Width
Height
Diameter
Shape
Material
Sheath Material
Terminal Type
Terminal Length
Thread Size
Mounting Type
Temperature Rating
Resistance
Phase
Frequency
Element Type
Connection Type
Custom Specification

The application should allow additional custom specification fields to be added later.

Do not force every heater to have the same specifications.

Different heater types may require different fields.

9. DIMENSION / UNIT MANAGEMENT

This is a critical requirement.

Whenever the user enters product dimensions, provide a unit selector.

Example:

Dimension Unit: [ mm ▼ ]

Options:

mm
cm
inch

The user should be able to enter:

Length = 250

Diameter = 12

Unit = mm

The system should display:

250 mm × 12 mm Dia

If the user changes the display unit to inch, calculate the converted value automatically.

Example:

250 mm → 9.84 inch

12 mm → 0.47 inch

Support conversion between:

mm
cm
inches

Use accurate conversion formulas and avoid rounding until the final display/calculation stage.

10. DIMENSION DISPLAY OPTIONS

The user should be able to decide how dimensions appear on the invoice.

Examples:

Format 1

250 × 50 × 12 mm

Format 2

9.84 × 1.97 × 0.47 inch

Format 3

250 mm L × 12 mm Dia

Format 4

Custom text:

250mm L × 12mm Dia × 1/2" BSP Thread

Provide a:

Custom Specification / Description

field.

The system should never prevent the user from manually adding technical specifications.

11. QUOTATION MODULE

Create a quotation module.

Quotation fields:

Quotation Number
Quotation Date
Valid Until
Customer
Billing Address
Shipping Address
Customer Contact
Customer PO/reference
Products
Specifications
Quantity
Unit
Rate
Discount
Taxable Value
GST
Total
Terms & Conditions
Notes

Actions:

Save Draft
Generate PDF
Print
Email
Duplicate
Convert to Sales Order
Cancel

Quotation numbering should be automatic.

Example:

QT/26-27/0001

12. SALES ORDER MODULE

Quotation should be convertible to Sales Order.

Example flow:

Quotation → Sales Order

Sales Order fields:

Sales Order Number
Order Date
Customer
Customer PO Number
PO Date
Expected Delivery Date
Products
Specifications
Quantity
Rate
Discount
GST
Total
Payment Terms
Delivery Terms
Notes

Order statuses:

Draft
Confirmed
Pending Production
In Production
Ready
Partially Dispatched
Dispatched
Completed
Cancelled
13. PRODUCTION MODULE

Since the business is a manufacturer, create a Production Order module.

Example:

Production Order:

PROD/26-27/0015

Customer:

ABC Industries

Product:

Tubular Heater

Specifications:

2000W / 230V / SS304 / 250mm × 12mm Dia

Quantity:

100 Nos.

Production status:

New
Approved
In Production
QC Pending
QC Passed
QC Failed
Ready for Dispatch
Completed
Cancelled

Track:

Planned quantity
Produced quantity
Rejected quantity
Remaining quantity
Production start date
Completion date
Remarks
14. INVENTORY

Create inventory management.

Support:

Raw Materials

Examples:

SS Tube
Nichrome Wire
Ceramic Insulator
Terminals
Connectors
Insulation material
Packaging material
Finished Goods

Track finished heaters.

Inventory fields:

Item
Item Code
Category
Unit
Opening Stock
Purchased
Consumed
Produced
Sold
Returned
Adjusted
Closing Stock

Inventory should maintain a stock movement history.

Do not simply overwrite stock quantities.

15. SUPPLIER MASTER

Create Supplier Master.

Fields:

Supplier Name
Supplier ID
Contact Person
Mobile
Email
GSTIN
PAN
Address
State
State Code
Payment Terms
Opening Balance
Opening Balance Type
Notes

Opening balance must support:

Debit
Credit
16. PURCHASE MODULE

Create:

Purchase Orders
Purchase Invoices
Purchase Returns
Supplier Payments

Purchase transactions should update inventory where applicable.

Purchase transactions must also affect the appropriate supplier ledger and accounting records.

17. DELIVERY CHALLAN

Create a Delivery Challan module.

Allow:

Sales Order → Delivery Challan

Automatically populate:

Customer
Shipping Address
Products
Specifications
Quantity
Order Reference

Fields:

Delivery Challan Number
Date
Transporter
Vehicle Number
Destination
Reference Order
Notes

Allow conversion:

Delivery Challan → Invoice

18. SALES INVOICE MODULE

This is one of the most important modules.

The invoice should be visually based on the invoice image provided with this requirement.

The attached invoice should be treated as a layout/style reference, but the content and fields should be adapted for this heater manufacturing business.

The invoice should have a professional Indian GST invoice format.

19. INVOICE HEADER

Include:

Company Logo
Company Name
Business/Division Name
Registered Address
Phone
Email
Website
GSTIN
PAN
State
State Code

Invoice information:

Invoice Number
Invoice Date
Delivery Note Number
Delivery Note Date
Customer PO Number
Customer PO Date
Dispatch Document Number
Dispatch Through
Destination
E-Way Bill Number, where applicable
IRN, where applicable
Acknowledgement Number, where applicable
Acknowledgement Date, where applicable
20. BUYER AND SHIPPING INFORMATION

Invoice should have:

Bill To
Customer Name
Address
GSTIN
State
State Code
Contact
Ship To
Customer Name
Shipping Address
GSTIN
State
State Code
Contact

Allow separate billing and shipping addresses.

21. INVOICE PRODUCT TABLE

Use a heater-friendly table.

Recommended columns:

Sr. No.
Product
Product Code
Description / Specifications
HSN/SAC
Quantity
Unit
Rate
Discount %
Taxable Value
CGST
SGST
IGST
Total Amount

Example:

Product:

Tubular Heater

Description:

2000W / 230V / U-Type / SS304 / 250mm L × 12mm Dia

Quantity:

10 Nos.

22. AUTOMATIC INVOICE DESCRIPTION

Do not make the user manually type the entire heater specification every time.

When the user selects a product and enters specifications, automatically construct the invoice description.

Example:

Product:

Tubular Heater

Specifications:

2000W
230V
U-Type
SS304
250mm Length
12mm Diameter
1/2" BSP Thread

Automatically generate:

Tubular Heater – 2000W / 230V / U-Type / SS304 / 250mm L × 12mm Dia / 1/2" BSP

Allow the user to edit the generated description before finalizing the invoice.

23. GST CALCULATION

Implement proper configurable GST calculations.

Calculate:

Gross Amount
Discount
Taxable Value
CGST
SGST
IGST
Total GST
Round Off
Grand Total

Determine applicable tax based on the configured company state and place of supply/customer information.

Do not hard-code tax rates.

GST rates must be configurable in the product/tax master.

The system should retain the tax rate actually used on each invoice so that historical invoices do not change if the master rate is updated later.

24. AMOUNT IN WORDS

Automatically convert the final invoice amount into Indian currency words.

Example:

₹75,500.00

Display:

Indian Rupees Seventy Five Thousand Five Hundred Only

Do not require manual entry.

25. BANK DETAILS

Company settings should contain:

Bank Name
Account Name
Account Number
IFSC
Branch
UPI ID

Automatically display configured bank details on invoices.

26. PAYMENT & RECEIPT MANAGEMENT

Every invoice should have payment tracking.

Example:

Invoice Amount:

₹75,500

Paid:

₹50,000

Outstanding:

₹25,500

Payment fields:

Payment ID
Invoice
Customer
Payment Date
Amount
Payment Mode
Bank/Cash Account
Transaction Reference
Cheque Number, where applicable
Notes

Payment methods:

Cash
Bank Transfer
UPI
Cheque
Other

Support:

Fully Paid
Partially Paid
Unpaid

Every payment should automatically update:

Invoice payment status
Customer outstanding
Customer ledger
Appropriate cash/bank ledger
Accounting records
27. CUSTOMER OUTSTANDING

Create an outstanding report.

Columns:

Customer
Invoice Number
Invoice Date
Invoice Amount
Amount Paid
Balance
Due Date
Days Outstanding
Status

Statuses:

Not Due
Due
Overdue
Paid

Outstanding should be calculated from actual invoice and payment transactions.

Do not maintain a separate manually editable outstanding amount.

28. CREDIT NOTE / DEBIT NOTE

Support:

Credit Notes
Debit Notes
Sales Returns
Invoice Adjustments

Maintain references to the original invoice.

Credit/Debit Notes should automatically affect:

Customer outstanding
Customer ledger
GST reports
Sales reports
Accounting ledger

Do not allow financial documents to become disconnected from their source transactions.

29. INVOICE CANCELLATION

Provide controlled invoice cancellation.

Before cancellation:

Ask for confirmation.
Capture cancellation reason.
Record user.
Record date/time.

Cancelled invoices should remain in the system.

Do not simply delete them.

Maintain invoice number history.

If accounting entries were generated for the invoice, cancellation/reversal should properly handle those entries without destroying the original audit history.

30. INVOICE NUMBERING

Provide configurable automatic numbering.

Examples:

Invoices:

INV/26-27/0001

Quotations:

QT/26-27/0001

Sales Orders:

SO/26-27/0001

Delivery Challans:

DC/26-27/0001

Credit Notes:

CN/26-27/0001

Debit Notes:

DN/26-27/0001

Payment Receipts:

REC/26-27/0001

Allow the administrator to configure:

Prefix
Financial year
Starting number
Number of digits
31. GST / CA DATA MANAGEMENT

This is a CRITICAL requirement.

The application must maintain complete structured transaction data so that the business owner can give a clean data dump to their Chartered Accountant.

Do not make the GST/CA report dependent only on PDF invoices.

All GST-relevant information must be stored in structured database fields.

32. CA / GST EXPORT MODULE

Create:

Reports → GST / CA Export

Allow the user to select:

Financial Year
From Date
To Date
Month
Quarter
Transaction Type

Export formats:

Excel
CSV

Primary format should be Excel.

33. GST SALES EXPORT

The export should include fields such as:

Financial Year
Invoice Number
Invoice Date
Invoice Status
Customer Name
Customer GSTIN
Customer PAN, where applicable
Customer Type
Billing State
Shipping State
Place of Supply
Customer State Code
Product Name
Product Code
HSN/SAC
Description
Quantity
Unit
Rate
Gross Amount
Discount
Taxable Value
CGST Rate
CGST Amount
SGST Rate
SGST Amount
IGST Rate
IGST Amount
Total GST
Round Off
Invoice Total
Payment Status
IRN
Ack Number
Ack Date
E-Way Bill Number
Original Invoice Reference, where applicable
Credit/Debit Note Reference, where applicable
34. GST REPORTS

Provide separate reports for:

B2B Sales

Customer GSTIN available.

B2C Sales

Applicable non-GST registered customers.

HSN-wise Sales

Group by HSN/SAC.

Show:

HSN
Product
Quantity
Taxable Value
CGST
SGST
IGST
Total GST
GST Summary

Show:

Total invoices
Total taxable value
CGST
SGST
IGST
Total GST
Grand total
Credit/Debit Notes

Separate report.

Cancelled Invoices

Separate report.

Outstanding

Separate report.

35. CA DATA DUMP

Create a single option:

Generate CA Data Dump

This should generate a well-organized Excel workbook.

Ideally create separate sheets:

Customers
Sales Invoices
Invoice Items
Payments
Receipts
Customer Ledger
Supplier Ledger
Credit Notes
Debit Notes
HSN Summary
GST Summary
Outstanding
Payables
General Ledger
Trial Balance
Cash Book
Bank Book
Cancelled Invoices
Product Master
Tax Master
Suppliers
Purchases
Purchase Items
Company Information

This will make the data much easier for the CA to work with.

The exact GST filing/reconciliation format may change over time, so build the export system to be configurable and extensible, rather than hard-coding one permanent government format.

36. IMPORTANT DATA RETENTION PRINCIPLE

Never destroy historical GST or accounting data simply because a master record has changed.

For example:

If a customer's GSTIN changes in 2027, invoices created in 2026 must continue showing the GSTIN that was applicable on those historical invoices.

Similarly:

If a product's GST rate changes, old invoices must retain the original tax rate used when they were created.

Therefore invoice/customer/product transaction records must preserve historical transaction snapshots where appropriate.

37. REPORTS

Create reports for:

Sales
Daily Sales
Monthly Sales
Yearly Sales
Customer-wise Sales
Product-wise Sales
HSN-wise Sales
Customers
Customer List
Customer Purchase History
Customer Outstanding
Top Customers
Payments
Payment Received
Outstanding
Overdue
Customer Ledger
Suppliers
Supplier List
Supplier Purchase History
Supplier Outstanding
Supplier Ledger
Products
Product Sales
Quantity Sold
Revenue by Product
Inventory
Stock
Stock Movement
Low Stock
Raw Material Consumption
Finished Goods
Orders
Pending Orders
Completed Orders
Cancelled Orders
Pending Dispatch
Production
Pending Production
Completed Production
Rejected Quantity
Production by Product
38. CUSTOMER LEDGER

This is a critical accounting feature.

For every customer, provide a complete chronological ledger.

Example:

Date	Particulars	Reference	Debit	Credit	Balance
01-Apr	Opening Balance	OB	₹10,000		₹10,000
05-Apr	Sales Invoice	INV001	₹25,000		₹35,000
10-Apr	Payment Received	REC001		₹15,000	₹20,000
15-Apr	Credit Note	CN001		₹2,000	₹18,000

The ledger must support:

Opening balance
Invoices
Payments
Credit notes
Debit notes
Sales returns
Adjustments
Closing balance
Running balance
Financial-year filtering
Date filtering
Invoice/reference links

Provide:

View Ledger
Print Ledger
Export Excel
Export PDF

The ledger should be automatically generated from actual transactions.

The user should not need to manually enter the same transaction twice.

39. SUPPLIER LEDGER

Create a complete supplier ledger.

Example:

Date	Particulars	Reference	Debit	Credit	Balance
01-Apr	Opening Balance	OB		₹20,000	₹20,000
05-Apr	Purchase Invoice	PINV001		₹50,000	₹70,000
10-Apr	Payment to Supplier	PAY001	₹30,000		₹40,000

Track:

Opening balance
Purchase invoices
Supplier payments
Purchase returns
Debit notes
Credit notes
Adjustments
Closing balance
Running balance
40. CASH LEDGER / CASH BOOK

Create a Cash Book.

Track:

Cash receipts
Cash payments
Customer cash payments
Supplier cash payments
Other cash receipts
Other cash expenses
Manual adjustments, where authorized

Show:

Opening cash balance
Total receipts
Total payments
Closing cash balance

Example:

Date	Particulars	Reference	Receipt	Payment	Balance
01-Apr	Opening Cash	OB			₹50,000
05-Apr	Customer Payment	REC001	₹10,000		₹60,000
06-Apr	Supplier Payment	PAY001		₹5,000	₹55,000
41. BANK LEDGER / BANK BOOK

Support one or multiple bank accounts.

Bank account master should include:

Bank Name
Account Name
Account Number
IFSC
Branch
Opening Balance
Account Type
Active/Inactive

Bank Book should track:

Customer payments
Supplier payments
Bank transfers
Other receipts
Other payments
Bank charges
Adjustments

Show:

Opening balance
Receipts
Payments
Closing balance

Allow bank-wise filtering.

42. GENERAL LEDGER / ACCOUNT HEADS

Create a basic accounting ledger system.

Allow administrator/accountant to create account heads.

Examples:

Assets
Cash
Bank
Customer Receivables
Inventory
Machinery
Other Assets
Liabilities
Supplier Payables
GST Payable
Loans
Other Liabilities
Income
Sales
Other Income
Expenses
Electricity
Rent
Salary
Transport
Repairs
Bank Charges
Office Expenses
Manufacturing Expenses
Other Expenses
Capital
Owner's Capital
Drawings

Account heads should be configurable.

Do not hard-code the chart of accounts.

43. ACCOUNTING TRANSACTION ENGINE

The system should use a consistent accounting transaction engine.

Whenever an applicable business transaction occurs, generate the appropriate debit/credit entries.

Examples:

Sales Invoice

Conceptually:

Customer Receivable → Debit

Sales → Credit

GST Output Accounts → Credit

Customer Payment

Cash/Bank → Debit

Customer Receivable → Credit

Purchase Invoice

Purchase/Inventory → Debit

Input GST → Debit

Supplier Payable → Credit

Supplier Payment

Supplier Payable → Debit

Cash/Bank → Credit

The exact accounting treatment should be configurable and designed so that the CA/accountant can adjust account mappings.

Do not hard-code accounting assumptions where configuration is appropriate.

44. JOURNAL / ADJUSTMENT ENTRIES

Provide an authorized accounting user with a Journal Entry module.

Fields:

Journal Number
Date
Account
Debit
Credit
Narration
Reference
Attachments, where supported
Created By
Approved By
Status

Rules:

Total Debit must equal Total Credit.
Journal entries should require appropriate permissions.
Finalized entries should not be deleted.
Corrections should use reversal/adjustment entries.
Maintain audit history.
45. OPENING BALANCES

Provide a proper Opening Balance module.

Allow opening balances for:

Customers
Suppliers
Cash
Bank
Inventory
General Ledger Accounts

Opening balances should be associated with a financial year.

Example:

Financial Year: 2026-27

Allow:

Customer ABC Industries → Debit ₹50,000

Supplier XYZ Ltd → Credit ₹25,000

The opening balance should flow correctly into the respective ledger.

46. TRIAL BALANCE

Create a Trial Balance report.

Show:

Account	Debit	Credit
Cash	₹50,000	
Bank	₹1,00,000	
Customers	₹2,50,000	
Suppliers		₹1,50,000
Sales		₹5,00,000
Expenses	₹2,00,000	

Total Debit should equal Total Credit.

Provide:

Date filtering
Financial-year filtering
Excel export
PDF export
47. PROFIT & LOSS REPORT

Create a basic Profit & Loss report.

Show:

Income
Sales
Other Income
Expenses
Purchases/Cost of Goods, where configured
Manufacturing expenses
Salary
Rent
Electricity
Transport
Other expenses

Calculate:

Total Income

Total Expenses

Net Profit / Loss

The accounting architecture should allow this report to be expanded later.

48. BALANCE SHEET

Design the accounting structure to support a Balance Sheet.

At minimum support:

Assets
Cash
Bank
Receivables
Inventory
Fixed Assets
Liabilities
Payables
GST Payable
Loans
Other Liabilities
Capital
Owner Capital
Retained Earnings / Profit
Drawings

The report should be based on accounting ledger balances.

49. ACCOUNTING PERIOD / FINANCIAL YEAR

Create financial year management.

Example:

2026-27

Financial year:

01-Apr-2026 → 31-Mar-2027

Support:

Multiple financial years
Financial-year-wise numbering
Opening balances
Ledger filtering
GST reporting
Sales reporting
Accounting reporting

Do not allow transactions to accidentally be recorded in the wrong financial year.

50. LEDGER RECONCILIATION

Provide basic reconciliation tools.

For customer:

Invoice Total - Payments - Credit Notes + Debit Notes = Outstanding

For supplier:

Purchase Total - Payments - Debit Notes + Credit Notes = Payable

The system should identify inconsistencies.

Provide warnings if:

Ledger balance does not match outstanding.
Payment is not linked correctly.
Invoice accounting entry is missing.
Credit/debit note is not reflected properly.
51. GST / CA DATA MANAGEMENT

This is a CRITICAL requirement.

The application must maintain complete structured transaction data so that the business owner can give a clean data dump to their Chartered Accountant.

Do not make the GST/CA report dependent only on PDF invoices.

All GST-relevant information must be stored in structured database fields.

The CA should be able to obtain:

Sales data
Purchase data
GST data
Customer data
Supplier data
Payment data
Customer ledger
Supplier ledger
General ledger
Trial balance
HSN summary
Outstanding
Payables
Credit/debit notes
Cancelled invoices
Accounting adjustments
52. CA DATA DUMP

Create:

Reports → Generate CA Data Dump

Generate a well-organized Excel workbook.

Recommended sheets:

Company Information
Customers
Suppliers
Products
Sales Invoices
Invoice Items
Payments/Receipts
Purchase Invoices
Purchase Items
Supplier Payments
Customer Ledger
Supplier Ledger
General Ledger
Cash Book
Bank Book
Trial Balance
HSN Summary
GST Summary
Credit Notes
Debit Notes
Outstanding
Payables
Inventory
Stock Movement
Cancelled Invoices
Tax Master
Account Heads
Journal Entries
Audit Log
53. DATA EXPORT

Provide export to:

Excel
CSV
PDF

For:

Customers
Products
Orders
Invoices
Payments
Customer Ledger
Supplier Ledger
General Ledger
Cash Book
Bank Book
Trial Balance
Inventory
GST
Reports
54. IMPORTANT FINANCIAL SAFETY

Do not allow accidental deletion of:

Finalized invoices
Payments
GST transactions
Credit notes
Debit notes
Ledger transactions
Journal entries
Purchase invoices

Instead use:

Cancel
Void
Reverse
Adjustment

with proper audit history.

55. AUDIT TRAIL

Maintain an audit log for important actions.

Track:

User
Date
Time
Action
Record
Old Value
New Value

Examples:

Invoice INV/26-27/0021 edited

Payment ₹25,000 recorded

Invoice cancelled

Customer GSTIN changed

Journal entry created

Ledger adjustment created

Opening balance changed

This is especially important for financial records.

56. SETTINGS

Create a comprehensive settings module.

Company Settings
Company Name
Logo
Address
GSTIN
PAN
State
State Code
Phone
Email
Website
Bank Settings
Bank
Account
IFSC
Branch
UPI
Invoice Settings
Numbering
Default terms
Default tax settings
Logo
Footer
Signature
Product Settings
Categories
Units
Custom fields
HSN
GST rates
Accounting Settings
Financial Year
Chart of Accounts
Account Groups
Payment Modes
Default Sales Account
Default Purchase Account
Default Customer Receivable Account
Default Supplier Payable Account
GST Accounts
Cash Account
Bank Accounts
User Settings
Users
Roles
Permissions
57. USER ROLES

Create role-based access.

Administrator

Full access.

Sales
Customers
Quotations
Orders
Invoices
Accounts
Invoices
Payments
GST
Ledgers
Accounting
Reports
Production
Production
Product specifications
Store
Inventory
Purchases
Stock

Permissions should be configurable.

58. IMPORTANT BUSINESS WORKFLOW

Implement the following workflow:

Customer
   ↓
Quotation
   ↓
Sales Order
   ↓
Production Order
   ↓
Production
   ↓
Quality Check
   ↓
Ready for Dispatch
   ↓
Delivery Challan
   ↓
Invoice
   ↓
Payment
   ↓
Customer Ledger
   ↓
Accounting Ledger
   ↓
GST / CA Reports

However, do not force every transaction to follow every step.

For example, a business owner should still be able to create an invoice directly when necessary.

Similarly, authorized users should be able to record accounting adjustments independently where required.

59. MASTER DATA RELATIONSHIPS

Use proper relational/database relationships.

At minimum:

Customer
→ Quotations
→ Sales Orders
→ Production Orders
→ Delivery Challans
→ Invoices
→ Payments
→ Customer Ledger
→ Credit/Debit Notes

Product
→ Product Specifications
→ Order Items
→ Production
→ Inventory
→ Invoice Items

Supplier
→ Purchase Orders
→ Purchase Invoices
→ Payments
→ Supplier Ledger

Invoice
→ Invoice Items
→ GST Details
→ Payments
→ Customer Ledger
→ Accounting Entries
→ Credit/Debit Notes

Accounting Account
→ Journal Entries
→ Ledger Entries
→ Trial Balance
→ Financial Reports

60. VALIDATION

Implement strong validation.

Examples:

Invoice number must be unique.
Customer GSTIN format should be validated where applicable.
Quantity cannot be negative.
Rate cannot be invalid.
Taxable value must calculate correctly.
Payment cannot exceed allowed amount unless explicitly supported.
Required customer information must be present.
HSN/SAC should be captured where required.
State and place-of-supply information should be validated.
Duplicate customer records should be detected/prevented where practical.
Journal entry debit must equal credit.
Ledger entries must have valid references.
Opening balances must be validated.
Financial-year dates must be validated.
61. PERFORMANCE

The system should remain usable when the database grows.

It should support:

Hundreds/thousands of customers
Thousands of invoices
Large invoice histories
Large product catalog
Multiple years of data
Large ledger transaction history

Use:

Pagination
Indexing
Efficient queries
Search optimization
Proper database relationships

where appropriate.

62. RESPONSIVE DESIGN

The primary use will be on a laptop/desktop.

However, make the UI responsive enough to work on tablets and mobile screens.

Prioritize desktop usability for:

Billing
Reports
GST exports
Customer management
Ledger
Accounting
63. BACKUP

Create a backup mechanism.

The administrator should be able to:

Settings → Backup → Export Database/Data

The backup should include:

Customers
Products
Orders
Invoices
Payments
Ledgers
Accounting transactions
GST data
Inventory
Production
Suppliers
Purchases
Settings

Also design the architecture so automated backups can be added.

A business-critical application must not depend on a single laptop copy.

64. QUICK ACTIONS

Dashboard should have buttons such as:

+ New Customer

+ New Quotation

+ New Order

+ New Invoice

+ Record Payment

+ Delivery Challan

+ Production Order

+ Purchase

+ Customer Ledger

+ Supplier Ledger

+ Journal Entry

+ GST / CA Export

65. INVOICE PDF DESIGN

The invoice PDF should be professional and print-ready.

Use the attached invoice as the visual inspiration.

Important characteristics:

Clean borders
Professional typography
Clearly separated sections
Company details at top
Invoice information
Buyer details
Product table
Tax summary
Amount in words
Bank details
Terms
Authorized signatory
GST information

The invoice should work correctly on:

A4 paper
PDF
Printer
Black-and-white printing
Digital sharing

Do not simply screenshot the UI.

Generate a proper print/PDF document.

66. COMPANY LOGO AND SIGNATURE

Allow the administrator to upload:

Company logo
Authorized signature/stamp

These should automatically appear on invoices.

67. QR CODE

Design the system so that a payment/UPI QR code can be displayed on the invoice if configured.

Do not hard-code payment information.

Use company settings.

68. DATA IMPORT

Allow Excel import for initial migration.

Import:

Customers
Products
Opening balances
Opening inventory
Suppliers
Account heads

Before importing:

Validate data
Show errors
Provide preview
Allow user to confirm import

Do not silently import invalid records.

69. USER EXPERIENCE

The application should be simple enough that a business owner can operate it without technical knowledge.

Use:

Clear navigation
Search
Filters
Dropdowns
Date pickers
Confirmation dialogs
Validation messages
Success messages
Error messages
Pagination where needed
Sorting
Export buttons

Avoid unnecessarily complicated screens.

70. DEVELOPMENT APPROACH

Before changing the code:

STEP 1 — INSPECT

Analyze the existing application.

Provide me with:

Current technology stack
Frontend architecture
Backend architecture
Database
Existing modules
Existing routes
Existing components
Existing APIs
Existing authentication
Existing invoice functionality
Existing accounting functionality
Existing ledger functionality
Existing shortcomings
STEP 2 — GAP ANALYSIS

Create a table:

Requirement	Already Exists	Partially Exists	Missing	Action

Map the existing software against this specification.

Pay particular attention to:

Billing
Customer management
GST
Accounting
Customer Ledger
Supplier Ledger
Cash Book
Bank Book
General Ledger
Inventory
Production
CA Export
STEP 3 — DATABASE ANALYSIS

Before changing the database, identify:

Existing tables
Existing relationships
Existing primary keys
Existing foreign keys
Existing indexes
Existing accounting tables
Existing invoice tables
Existing payment tables

Identify required migrations.

Do not duplicate existing tables unnecessarily.

STEP 4 — IMPLEMENT

Implement the missing functionality in logical phases.

Do not rewrite functioning code unnecessarily.

STEP 5 — DATABASE

Ensure the database properly supports:

Customers
Products
Product specifications
Orders
Invoices
Invoice items
Payments
Receipts
GST information
Inventory
Production
Suppliers
Purchases
Customer ledger
Supplier ledger
Cash ledger
Bank ledger
General ledger
Account heads
Journal entries
Opening balances
Financial years
Audit logs
71. TESTING

Test:

Customer
Customer creation
Customer search
Customer history
Customer ledger
Opening balance
Outstanding
Product
Product creation
Heater specifications
Dimension conversion
Custom specifications
Sales
Quotation
Order
Production
Delivery Challan
Invoice
GST calculation
Payment
Outstanding
Accounting
Customer ledger
Supplier ledger
Cash book
Bank book
General ledger
Journal entry
Opening balance
Trial balance
Profit & Loss
Balance Sheet
GST
GST calculation
HSN summary
GST summary
B2B
B2C
Credit notes
Debit notes
Cancelled invoices
Export
Excel
CSV
PDF
CA Data Dump
Security
User permissions
Financial record restrictions
Audit trail
72. DIMENSION CONVERSION TESTS

Verify:

10 mm = 1 cm

25.4 mm = 1 inch

100 mm ≈ 3.937 inch

Verify conversions in both directions:

mm → cm
cm → mm
mm → inch
inch → mm
cm → inch
inch → cm

Ensure appropriate display precision.

73. GST TESTING

Create test scenarios for:

Same-state sale

Company:

Maharashtra

Customer:

Maharashtra

Expected:

CGST + SGST

Interstate sale

Company:

Maharashtra

Customer:

Gujarat

Expected:

IGST

Also test:

GST registered customer
Non-GST customer
Discount
Multiple invoice items
Different GST rates
Round-off
Credit note
Debit note
Cancelled invoice

Do not assume a particular tax rate is permanently applicable.

Keep tax configuration editable.

74. LEDGER TESTING

Create test scenarios for:

Customer

Opening Balance:

₹10,000 Debit

Invoice:

₹25,000

Payment:

₹15,000

Expected closing balance:

₹20,000 Debit

Supplier

Opening Balance:

₹20,000 Credit

Purchase:

₹50,000

Payment:

₹30,000

Expected closing balance:

₹40,000 Credit

Cash

Opening:

₹50,000

Receipt:

₹10,000

Payment:

₹5,000

Expected closing cash:

₹55,000

Accounting

Verify that:

Total Debits = Total Credits

for every finalized accounting transaction and Trial Balance.

75. SAMPLE HEATER INVOICE

The invoice-entry workflow should support an example such as:

Customer:

ABC Industries

Product:

Tubular Heater

Wattage:

2000 W

Voltage:

230 V

Shape:

U-Type

Material:

SS304

Length:

250 mm

Diameter:

12 mm

Thread:

1/2" BSP

Quantity:

10 Nos.

Rate:

₹1,250

The invoice should automatically create an appropriate product description.

The invoice should automatically generate the corresponding accounting and customer-ledger impact once finalized.

76. DO NOT LIMIT THE SOFTWARE TO GENERIC PRODUCTS

This is very important.

The system is for a heater manufacturing company.

Therefore the product system must support highly customized technical specifications.

For example, two products may both be called:

Tubular Heater

but have completely different:

Wattage
Voltage
Dimensions
Material
Shape
Terminal
Thread
Resistance
Mounting configuration

The application must distinguish these configurations.

77. FUTURE EXPANSION

Design the architecture so the following can be added later:

Barcode/QR scanning
E-invoice integration
E-way bill integration
GST portal integration
WhatsApp invoice sharing
Email invoices
Customer portal
Supplier portal
Multi-branch
Multi-company
Multiple warehouses
Purchase planning
Bill of Materials
Manufacturing cost calculation
Employee access
Advanced accounting integration

Do not implement integrations unless required, but do not architect the system in a way that prevents them.

78. FINAL ACCEPTANCE CRITERIA

The software should ultimately allow the business owner to perform this complete scenario:

Create customer ABC Industries.
Enter GSTIN and address.
Enter opening customer balance if applicable.
Create Tubular Heater product.
Enter technical specifications.
Enter dimensions in mm.
Change display unit to inches if required.
Create quotation.
Convert quotation to sales order.
Create production order.
Complete production.
Create delivery challan.
Generate invoice.
Automatically calculate GST.
Generate professional PDF invoice.
Automatically create the appropriate customer receivable/ledger entry.
Record customer payment.
Automatically update customer ledger.
Automatically update cash/bank ledger.
View customer profile.
See complete order/invoice/payment history.
See outstanding balance.
Generate customer ledger.
Generate supplier ledger.
View cash book.
View bank book.
View general ledger.
Generate trial balance.
Generate monthly sales report.
Generate HSN summary.
Generate GST summary.
Generate CA/GST Excel dump.
Export all required records for the selected period.
Verify that accounting debit and credit entries remain balanced.
79. VERY IMPORTANT — BEFORE CODING

Do not immediately start writing large amounts of code.

First inspect my existing application and tell me:

What is already implemented?
What database is being used?
What modules already exist?
What can be reused?
What needs modification?
What is completely missing?
What database migrations are required?
What accounting/ledger functionality already exists?
What risks or architectural issues exist?
What implementation order do you recommend?

Then provide a phased implementation plan.

After I approve the plan, implement the changes phase by phase.

For each phase:

Explain what you changed.
Identify files/components changed.
Identify database changes.
Identify accounting/ledger changes.
Run/test the relevant functionality.
Fix errors before moving to the next phase.

Do not claim functionality is complete unless it is actually implemented and tested.

80. PRIORITY ORDER

Use this priority:

PRIORITY 1 — CORE BUSINESS
Customers
Customer history
Products
Heater specifications
Dimensions/unit conversion
Quotations
Sales Orders
Invoices
Payments
Outstanding
Customer Ledger
PDF invoice
PRIORITY 2 — GST / ACCOUNTING
GST data
GST calculations
HSN
GST reports
CA export
Excel/CSV export
Customer Ledger
Supplier Ledger
Cash Book
Bank Book
General Ledger
Account Heads
Opening Balances
Journal Entries
Trial Balance
Profit & Loss
Credit/Debit notes
Invoice cancellation
Audit trail
PRIORITY 3 — MANUFACTURING
Production
Raw materials
Finished goods
Inventory
Suppliers
Purchases
Delivery Challans
PRIORITY 4 — ADVANCED
Dashboard
Advanced analytics
Automated backups
Email
WhatsApp
E-invoice/e-way bill integration
Multi-user enhancements
Future integrations
81. SUCCESS CRITERIA

The final application should feel like a real business management system for a heater manufacturer, not a basic CRUD application or simple invoice generator.

The four most important characteristics are:

1. CUSTOMER HISTORY

If I search a customer name, I should be able to see everything related to that customer.

2. PROFESSIONAL BILLING

I should be able to generate a professional GST invoice similar in overall structure to the reference invoice I provided, customized for my company.

3. COMPLETE ACCOUNTING & LEDGER

All invoices, payments, credit notes, debit notes, purchases and adjustments should automatically flow into the appropriate ledgers.

I should be able to see:

Customer Ledger
Supplier Ledger
Cash Book
Bank Book
General Ledger
Trial Balance
Outstanding
Payables

without manually entering the same transaction multiple times.

4. COMPLETE DATA OWNERSHIP

All customer, product, order, invoice, payment, GST, inventory, accounting and transaction information must remain structured and exportable so that I can provide the required data to my CA.

The software should therefore be designed as a central database and business management system for my manufacturing business, with billing and accounting being major components rather than the entire application.



Start by inspecting the existing application.

Do not start rewriting the application immediately.

First provide:

A. Existing Architecture
Technology stack
Frontend
Backend
Database
Authentication
APIs
Existing modules
B. Existing Functionality

Identify what already works.

C. Gap Analysis

Compare the existing system against this complete specification.

D. Database Gap Analysis

Identify required tables, relationships, indexes and migrations.

E. Accounting/Ledger Gap Analysis

Specifically determine whether the current system already supports:

Customer Ledger
Supplier Ledger
Cash Book
Bank Book
General Ledger
Account Heads
Journal Entries
Opening Balances
Trial Balance
Profit & Loss
Balance Sheet
F. Implementation Plan

Recommend a phased development plan.

Do not make major code changes until the inspection, gap analysis and implementation plan have been presented.

After approval, implement phase-by-phase, test each phase, and fix errors before proceeding.



