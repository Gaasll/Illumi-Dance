<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from './router';
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }

  });

});


const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");

  });

};

</script>

<template>
  <header>
    <div class="wrapper">
      <div>
      <img alt="Vue logo" class="logo" src="@/assets/final.png" width="125" height="125" /></div>
      <HelloWorld msg="ILLUMI Dance" />


      
    </div>
    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/try">Try it!</RouterLink>
      <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
 
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

button {
  padding: 5px 13px;
  opacity: 50%;
  background-color: #818181;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #121312;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    margin-right: 2rem;
  }

  nav {
    margin-top: 0;
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    width: 100%;
  }
}
</style>