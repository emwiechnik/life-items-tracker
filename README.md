# Life Items Tracker
An app implemented as a _proof-of-concept_ where I wanted to try out Vuetify library, Firebase auth and CouchDB on the server side to see how they can be used together.

Uses:
- Vuetify
- CouchDB on the server-side
- PouchDB on the client-side
- Firebase authentication

----
[Live demo](https://lifetracker-d91c8.firebaseapp.com)
----

### Steps to run the app locally
1. Clone
2. Update the file cloud-service.js with your own config generated in Firebase console
3. In command line:

    npm install
    
    npm run dev

**Note:** even if the back-end is unavailable, the app will work and store all the data within the browser's IndexedDB through PouchDB api.
