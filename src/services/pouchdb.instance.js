import PouchDB from 'pouchdb'
import axios from 'axios'
import securityService from './security.service'

// eslint-disable-next-line
axios.defaults.baseURL = 'http://localhost:3123' // SERVER_API_URL

const COUCHDB_URL = 'http://127.0.0.1:5984'
const dbName = 'itemsDb'

function toHex (s) {
  let u = unescape(encodeURIComponent(s))
  let h = ''
  for (var i = 0; i < u.length; i++) {
    h += u.charCodeAt(i).toString(16)
  }
  return h
}

class DbContext {
  constructor (remoteUrl, dbName) {
    this.remoteUrl = remoteUrl
    this.dbName = dbName
    this.db = null
    this.remoteDb = null
  }

  initSession (userId) {
    // get the authentication details from the proxy authorization endpoint
    // 1. send the userId
    // 2. receive userName, roles and authToken
    console.log('Initializing session for user ' + userId)
    return new Promise((resolve, reject) => {
      axios.post('/access', null, {
        headers: {
          'Content-Type': 'application/json',
          'Data': securityService.secureString(userId)
        }
      }).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
    })
  }

  connect (userId) {
    return new Promise((resolve, reject) => {
      let hexEncodedUserName = toHex(userId)
      let localDbName = `${this.dbName}${hexEncodedUserName}`
      this.db = new PouchDB(localDbName)
      console.log('Created local db connection')

      this.initSession(userId).then(data => {
        this.remoteUrl = data.url
        document.cookie = data.cookie
        this.remoteDb = new PouchDB(`${this.remoteUrl}/userdb-${hexEncodedUserName}`, {
          skipSetup: false, // todo: find out whether you really need this
          ajax: {
            withCredentials: false,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'X-Auth-CouchDB-Roles': '',
              'X-Auth-CouchDB-UserName': userId,
              'cookie': data.cookie
            }
          }
        })
        console.log('Created remote db connection')
        resolve()
      }, err => {
        console.log('Could not initialize session, error: ' + err.message)
        reject(err)
      })
    })
  }

  sync () {
    return new Promise((resolve, reject) => {
      console.log('Requested synching')
      PouchDB.sync(this.db, this.remoteDb, {
        live: false,
        heartbeat: false,
        timeout: false,
        retry: true
      }).then(() => {
        console.log('Sync finished')
        resolve()
      }, err => {
        console.log('Sync failed ' + err.message)
        reject(err)
      })
    })
  }
}

export default new DbContext(COUCHDB_URL, dbName)
