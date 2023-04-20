<template>
 <h1>Create an account</h1>
 <p><input type="text" placeholder="Email" v-model="email" /></p>
 <p><input type="password" placeholder="Password" v-model="password" /></p>

 <p><button @click="register">Submit</button></p>
 
</template>

<script setup>
import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) => {
    console.log("Successfully registered!");
    router.push("/home")
  })
  .catch((error) => {
    console.log(error.code);
    alert(error.message);
  });
  };

</script>

<style scoped>
.form-fields {
  display: grid;
  grid-template-columns: 9fr 11fr;
  grid-template-rows: repeat(30px);
  width: 55%;
  margin: auto;
  text-align: right;
  vertical-align: auto;
}

.form-fields>* {
  margin: 10px;
}

.inputField {
  border-radius: 25px;
  border: 2px solid #609;
  padding: 10px;
  width: 200px;
  height: 15px;
}

.submit-button {
  margin-top: 25px;
}

form.register-form {
  margin-bottom: 50px;
}</style>