import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'

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
      var inArr = false;
      
      state.cart.forEach(element => {
        if(payload.itemName == element.itemName){
          inArr = true;
          element.quantity += 1;

        }else {
          inArr = false;
        }
      })
      if(!inArr){
        payload.quantity = 1;
        state.cart.push(payload)
        // cookies.set("user_cart", state.cart);

      }
    },
    updateQuantity: (state, payload) => {
      state.cart[payload.index].quantity = payload.itemQuantity;
      // cookies.set("user_cart", state.cart);

    },
    removeFromCart: (state, payload) => {
      state.cart[payload.index].quantity = 0;
      state.cart.splice(payload.index, 1);
      // cookies.set("user_cart", state.cart);

    },
    setCart: (state, payload) => {
      state.cart = payload;
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
    },
    itemsInCart: state => {
      var counter = 0;
      state.cart.forEach((element) => {
        counter = counter + (1 * element.quantity);
      })
      return counter;
    },
    getCartTotal: state => {
      var total = 0.00;
      state.cart.forEach(element => {
        // total = (element.quantity * element.itemPrice) + total;
        // total = ((element.quantity).toFixed(2)*element.itemPrice.toFixed(2)) + total;

        total = (element.quantity * element.itemPrice) + total;
      })
      return total;
    }
  }
})
