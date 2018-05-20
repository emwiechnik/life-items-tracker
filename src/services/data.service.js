const dataService = {
  getItems () {
    let items = [
      { title: 'Lightning Talk: Let\'s do it offline', notes: 'I need to be ready by this time, as I am giving a presentation!', type: 'Event', when: 'In 1 week 2 days 3 hours', dueDate: '2018-06-06' },
      { title: 'Party at John Doe\'s', notes: 'A lot of everything!', type: 'Event', when: 'In 1 week 3 days', dueDate: '2018-06-06' },
      { title: 'Buy lamp', notes: 'I need it for an upcoming event', type: 'Task', when: 'Due in 1 week 2 days 3 hours', dueDate: '2018-06-06' },
      { title: 'Lightning Talk: Let\'s do it offline', notes: 'I need to be ready by this time, as I am giving a presentation!', type: 'Event', when: 'In 1 week 2 days 3 hours', dueDate: '2018-06-06' },
      { title: 'Lightning Talk: Let\'s do it offline', notes: 'I need to be ready by this time, as I am giving a presentation!', type: 'Event', when: 'In 1 week 2 days 3 hours', dueDate: '2018-06-06' }
    ]

    return new Promise((resolve) => resolve(items))
  },
  addItem () {

  }
}

export default dataService
