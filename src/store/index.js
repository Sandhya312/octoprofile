import { createStore } from 'vuex'

export default createStore({
  state: {
    user:'',
  },
  getters: {
  },
  mutations: {
    FETCH_USER(state,user){
      state.user= user;
    }
  },
  actions: {
    async fetch_user({commit}){
    const res = await axios.get(`https://api.github.com/users/${this.$route.params.user_name}`);
    console.log(res.data);
   commit('FETCH_USER',res.data);
   }
  },
  modules: {
  }
})
