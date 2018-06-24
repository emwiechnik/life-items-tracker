import PouchDB from 'pouchdb'
import axios from 'axios'
import securityService from './security.service'

const serverApi = axios.create({
  baseURL: process.env.SERVER_API_URL
})

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
    this.offline = true
  }

  initSession (userId) {
    // get the authentication details from the proxy authorization endpoint
    // 1. send the userId
    // 2. receive the cookie  to be sent in the subsequent requests to CouchDB
    console.log('Initializing session for user ' + userId)
    return new Promise((resolve, reject) => {
      serverApi.post('/access', null, {
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
        document.cookie = data.cookie
        this.remoteDb = new PouchDB(`${this.remoteUrl}/userdb-${hexEncodedUserName}`, {
          skipSetup: true, // todo: find out whether you really need this
          ajax: {
            withCredentials: false,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'X-Auth-R': '', // roles
              'X-Auth-U': userId, // user name
              'X-Auth-T': data.token // token
            }
          }
        })
        console.log('Created remote db connection')
        this.offline = false
        resolve()
      }, err => {
        console.log('Could not initialize session, error: ' + err.message)
        // reject(err)
        // in this case we just get into offline mode
        // in fact at this point we should see if there has been at least one connection for this user - just check a flag in localStorage or in IndexedDB
        resolve()
      })
    })
  }

  sync () {
    return new Promise((resolve, reject) => {
      if (this.offline) {
        console.log('Skipped synching - the app is in offline mode')
        resolve()
        return
      }
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

export default new DbContext(process.env.COUCHDB_URL, dbName)
