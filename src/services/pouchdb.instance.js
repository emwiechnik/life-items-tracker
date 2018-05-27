import PouchDB from 'pouchdb'

const COUCHDB_URL = 'http://127.0.0.1:5984'
const dbName = 'itemsDb'
const userName = 'user1'
const pwd = 'user1pass' // temporarily hardcoded

const db = new PouchDB(dbName)
console.log('Created local db connection')

const creds = { name: userName, password: pwd }

function toHex (s) {
  let u = unescape(encodeURIComponent(s))
  let h = ''
  for (var i = 0; i < u.length; i++) {
    h += u.charCodeAt(i).toString(16)
  }
  return h
}

const hexEncodedUserName = toHex(userName)

// connect to the remote db
fetch(`${COUCHDB_URL}/_session`, {
  method: 'POST',
  body: JSON.stringify(creds),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response))

const remoteDatabase = new PouchDB(`${COUCHDB_URL}/userdb-${hexEncodedUserName}`, {
  skipSetup: true,
  ajax: {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
})
console.log('Created remote db connection')

console.log('Requested synching')
PouchDB.sync(db, remoteDatabase, {
  live: false,
  heartbeat: false,
  timeout: false,
  retry: true
})

export default db
