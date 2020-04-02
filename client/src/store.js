import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: '',
    isAdmin: false,
    currentUser: '',
    isLoading: false,
    loadingPercent: 0,
    cart: []
  },
  mutations: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    token: (state, payload) => {
      state.token = payload;
    },
    signout: (state) => {
      state.isLoggedIn = false;
    },
    admin: (state, payload) => {
      state.isAdmin = payload;
    },
    setUser: (state, payload) => {
      state.currentUser = payload;
    },
    setLoading: (state, payload) => {
      state.isLoading = payload;
    },
    setLoadingPercent: (state, payload) => {
      state.loadingPercent = payload;
    },
    pushToCart: (state, payload) => {
      state.cart.push(payload);
    },
    removeFromCart: (state, index) => {
      state.cart.splice(index, 1);
    }
  },
  actions: {

  },
  getters: {
    loginState: state => {
      return state.isLoggedIn;
    },
    showToken: state => {
      return state.token;
    },
    adminState: state => {
      return state.isAdmin;
    },
    getUser: state => {
      return state.currentUser;
    },
    isLoading: state => {
      return state.isLoading;
    },
    getLoadingPercent: state => {
      return state.loadingPercent;
    },
    getCart: state => {
      return state.cart;
    },
    getCartLength: state => {
      return state.cart.length;
    }
  }
})
