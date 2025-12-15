# GrabDocs Link Management – Cypress E2E Testing

This repository contains end-to-end automated tests written in **Cypress** to validate the core **upload link functionality** of the GrabDocs web application.

The tests simulate real user interactions and verify both frontend behavior and backend responses to ensure the system works as expected.

---

## 🔗 Features Tested

The following upload link features are covered:

- Create upload link  
- Share upload link via email  
- Edit upload link  
- Disable upload link  
- Delete upload link  

Each test follows a real user workflow and confirms success using reliable backend assertions.

---

## 🧪 Testing Approach

- **Testing Type:** End-to-End (E2E)
- **Tool Used:** Cypress
- **Language:** JavaScript
- **Application Tested:** https://app.grabdocs.com

Intentional wait times are included in the tests to slow execution for demonstration purposes, allowing viewers to clearly observe each action during test runs.

Backend API requests are intercepted and validated where applicable to provide strong end-to-end verification beyond temporary UI messages.

---

## 📁 Project Structure
cypress/
└── e2e/
└── links/
├── createLink.cy.js
├── shareLink.cy.js
├── editLink.cy.js
├── disableLink.cy.js
└── deleteLink.cy.js

Only relevant test files are included to keep the repository minimal and focused, as required.

---

## 🎥 Demo Video

A short demonstration video is included showing the automated tests running in the Cypress Test Runner.  
The video explains the testing logic while the tests execute.

---

## 👤 Author

**Donovan Faucette**

Computer Science Student  
End-to-End Testing & Software Quality Assurance

---

## 📌 Notes

- This repository intentionally excludes advanced Cypress binaries, `node_modules`, and environment configuration files.
- The focus is strictly on test logic and feature coverage, not tooling setup.
