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

const goToInfo = () => {
 
    router.push("/info");


};

</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
   <span class="material-symbols-outlined" @click="goToInfo">
  info
  </span>
    <header>
      
      
      <div class="logo-container">
        <img alt="Vue logo" class="logo" src="@/assets/final.png" width="90" height="90" />
        <HelloWorld msg="ILLUMI Dance" />
      </div>
      
    
    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/pattern">Try it!</RouterLink>
      <RouterLink to="/custom">Customize</RouterLink>
      <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
    </nav>
    <br>
    <div class="line"></div>
  </header>

  <RouterView />
</template>

<style scoped>
.my-button {
  border-radius: 50%;
  width: 8px;
  height: 26px;
  margin-left: 3px;
  margin-top: 3px;
  
  color: white;
  font-size: 10px;
  border: none;
  cursor: pointer;
  
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.material-symbols-outlined{
  font-size: 14px;
  margin-left: 3px;
  background: linear-gradient(90deg, #fff, #121312, #d5d5d5);
  background-size: 200% 200%;
  -webkit-animation: rotating-shine 4s linear infinite;
  -moz-animation: rotating-shine 4s linear infinite;
  animation: rotating-shine 4s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@-webkit-keyframes rotating-shine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@-moz-keyframes rotating-shine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes rotating-shine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.logo {
  margin-bottom: 2rem;
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
  height: 20px;
  font-size: 10px;
}

button:hover {
  background-color: #121312;
}
.line {
  border-top: 1px solid rgb(119, 117, 117);
  opacity: 18%;
   width: 85%;
  display: block;
  margin: auto;

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

  .line {

   width: 60%;

}

img{
  height: 125px;
  width: 125px;
}

  button {
  padding: 5px 13px;
  opacity: 50%;
  background-color: #818181;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 23px;
  font-size: 13px;
}




 

  nav {
    margin-top: 0;
    text-align: center;
    font-size: 1rem;
    padding: 1rem 0;
    width: 100%;
  }
}
</style>