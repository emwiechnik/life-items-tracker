import db from './pouchdb.instance.js'

const dataService = {
  getItems () {
    return new Promise((resolve) => {
      let items = []

      db.allDocs({include_docs: true, descending: true}, function (err, doc) {
        items = doc.rows

        if (err) {
          console.log(err)
        } else {
          console.log('Loaded ' + items.length + ' items')
        }
        resolve(items.map(i => i.doc))
      })
    })
  },
  addItem (item) {
    item._id = new Date().toISOString()

    return new Promise((resolve) => {
      db.put(item, function callback (err, result) {
        if (!err) {
          console.log('Successfully added the item!')
        }
      })
      resolve()
    })
  },
  updateItem (item) {
    return new Promise((resolve) => {
      db.put(item, function callback (err, result) {
        if (!err) {
          console.log('Successfully updated the item!')
        }
      })
      resolve()
    })
  }
}

export default dataService
