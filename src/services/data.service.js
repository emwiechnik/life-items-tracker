import db from './pouchdb.instance.js'

const dataService = {
  getItems () {
    // let items = [
    //   { type: 'Event', title: 'Lightning Talk: Let\'s do it offline', details: 'I need to be ready by this time, as I am giving a presentation!', date: '2018-06-06', time: '15:00' },
    //   { type: 'Event', title: 'Lightning Talk: Let\'s do it offline', details: 'I need to be ready by this time, as I am giving a presentation!', date: '2018-06-06', time: '15:00' },
    //   { type: 'Event', title: 'Lightning Talk: Let\'s do it offline', details: 'I need to be ready by this time, as I am giving a presentation!', date: '2018-06-06', time: '15:00' },
    //   { type: 'Event', title: 'Lightning Talk: Let\'s do it offline', details: 'I need to be ready by this time, as I am giving a presentation!', date: '2018-06-06', time: '15:00' },
    //   { type: 'Event', title: 'Lightning Talk: Let\'s do it offline', details: 'I need to be ready by this time, as I am giving a presentation!', date: '2018-06-06', time: '15:00' }
    // ]
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
          console.log('Successfully posted the item!')
        }
      })
      resolve()
    })
  }
}

export default dataService
