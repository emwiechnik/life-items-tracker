import PouchDB from 'pouchdb'

const dbName = 'itemsDb'

let db = new PouchDB(dbName)

export default db
