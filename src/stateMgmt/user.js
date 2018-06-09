const state = {
  user: {
    name: '<user name>',
    email: '<email address>'
  }
}

const getters = {
  userName: state => state.user.name,
  userEmail: state => state.user.email
}

const actions = {
  login (context, { email, password }) {
    // todo: handle logging in
  },
  logout (context) {
    // todo: handle logging out
  }
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
