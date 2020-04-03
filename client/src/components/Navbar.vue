<template>
<div>

  <div class="nav-container">
    <router-link to="/">
    <div class="brand">
        {{ appName }}
    </div>
    </router-link>


    <!-- Main Navigation bar -->
    <div class="links"  v-if="this.windowWidth > this.menuCollapseWidth">
      <b-button :style="this.cartEmpty ? {'visibility': 'hidden'} : {'visibility': 'inherit'}" v-b-modal.modal-1 variant="primary">
        Cart ( {{ this.$store.getters.itemsInCart }} )
      </b-button>
      <CartModal/>
      <!-- <b-modal id="modal-1" title="Cart" ok-only ok-title="Checkout">
        <CartModalContent/>
      </b-modal> -->

      <!-- <router-link v-if="$store.getters.loginState==false" to="/login"><b-button class="mr-2" variant="primary">Login</b-button></router-link> -->
      <!-- <router-link v-if="$store.getters.loginState==false" to="/register"><b-button class="mr-2" variant="secondary">Register</b-button></router-link> -->
      <router-link v-if="$store.getters.loginState==true" to="/dashboard"><b-button class="mr-2" variant="primary">Dashboard</b-button></router-link>
      <router-link v-if="$store.getters.adminState==true" to="/admin"><b-button class="mr-2" variant="info">Admin</b-button></router-link>
      <b-button v-if="$store.getters.loginState==true" @click="signout" class="mr-2" variant="danger">Signout</b-button>
    </div>

    <!-- Menu Toggle For Dropdown -->
    <div id="menu-btn-container" v-if="this.windowWidth < this.menuCollapseWidth" v-click-outside="closeDropDown" >
      <div id="menu-btn" @click="toggleMenuDropDown()">
        <b-icon id="menu-btn-icon" class="h1" icon="grid-fill" variant="primary"></b-icon>
      </div>
    </div>
    <!-- <b-btn @click="toggleMenuDropDown"></b-btn> -->

    <!-- Drop down menu div -->
  </div>

  <transition name="fade" mode="out-in">
    <div v-if="showDropDown && (this.windowWidth < this.menuCollapseWidth)" id="dropdown-menu" class="menu-dropdown" >
      <router-link to="/"><h5>Home</h5></router-link>
      <router-link v-if="$store.getters.loginState==false" to="/login"><h5>Login</h5></router-link>
      <router-link v-if="$store.getters.loginState==false" to="/register"><h5>Register</h5></router-link>
      <router-link v-if="$store.getters.loginState==true" to="/dashboard"><h5>Dashboard</h5></router-link>
      <router-link v-if="$store.getters.adminState==true" to="/admin"><h5>Admin</h5></router-link>
      <b-button v-if="$store.getters.loginState==true" @click="signout" class="mr-2" variant="danger">Signout</b-button>
    </div>
  </transition>


</div>

</template>

<script>

import clickOutside from '../directives/clickOutside.js'
import {http} from '../util/axiosHttp.js'
import cookies from 'vue-cookies';
// import CartModalContent from '@/components/CartModalContent'
import CartModal from '@/components/CartModal'



export default {
  name: 'Navbar',
  components: {
    CartModal
  },
  data() {
    return {
      appName: process.env.VUE_APP_NAME,
      windowWidth: '',
      windowHeight: '',
      menuCollapseWidth: 768,
      showDropDown: false,
    }
  },
  methods: {
    signout: async function() {
      try {
        var signout = await http().post(`${process.env.VUE_APP_API_URL}/api/users/signout`, {
          token: this.$store.getters.showToken,
        })
        if(signout.data.success == false){
          throw signout.data.error
        }
        this.$store.commit("signout");
        this.$store.commit("admin", false);
        cookies.remove("user_token");

        this.$router.push('/');

      } catch(err){
        console.log(err)
      }
    },
    resizeHandler(){
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      if(this.windowWidth < this.menuCollapseWidth){
        this.showDropDown = false;
      }
    },
    toggleMenuDropDown(){
      this.showDropDown = !this.showDropDown;
      console.log(this.showDropDown);
    },
    closeDropDown(){
      this.showDropDown = false;
    }
  },
  created(){
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.resizeHandler);
  },
  computed: {
    cartEmpty(){
      if(this.$store.getters.getCartLength < 1){
        return true;
      }else {
        return false;

      }
    }
  }
}
</script>
<style>

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px 40px;
  z-index: 35;
  position:relative;
}

.nav-container button {
  padding: 10px 40px;
  text-transform: uppercase;
  font-size: 14px;
}

.brand {
  font-size: 24px;
  letter-spacing: 5px;
}



.nav-search {
  width: 500px;
  display: flex;

}
.nav-search input[type=text]{
  border: 1px solid rgba(0, 0, 0, 0.199);
  /* border-radius: 5px 0px 0px 5px; */
  border-radius: 5px;
  padding: 5px;
}
.nav-search button {
  margin-left: 5px;
}

.menu-dropdown {
  background-color: rgb(241, 241, 241);
  /* background-color: #d1ecf1; */
  padding: 30px;
  /* border-radius: 5px; */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.219);
  width: 200px;
  z-index: 20;
  position: absolute;
  right: 0;
  top: 50px;
  text-align: center;
  border-top: 1px solid rgba(48, 48, 48, 0.089);
}
.menu-dropdown h5 {
  padding: 8px;
}



#menu-btn-icon {
  /* color: #007bff; */
  transition: .1s ease-in-out;
  margin-bottom: -3px;
}
#menu-btn-icon:hover {
  transform: scale(1.4);
  border: none;
  /* transform: scale3d(5); */
}
</style>
