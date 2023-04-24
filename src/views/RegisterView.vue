<template>
  <div>
    <br>
    <h1>Create new account</h1>
    <p>Already have an account? <a href="#" @click="redirectToSignIn">Sign in here.</a></p>
    <div class="form-group">
      <p><input type="text" placeholder="Enter e-mail" v-model="email" /></p>
    </div>
    <div class="form-group">
      <p><input type="password" placeholder="Enter password" v-model="password" /></p>
    </div>
    <div class="form-group">
        <p><input type="password" placeholder="Confirm password" v-model="password" /></p>
      </div>
    <p><button @click="register">Submit</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      router.push("/home");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

const redirectToSignIn = () => {
  router.push("/");
};
</script>
<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  
}



.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width:70%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
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

.error-msg {
  color: red;
  margin-top: 10px;
}

@media only screen and (max-width: 480px) {
  .container {
    max-width: 100%;
    padding: 0 10px;
  }
  
  h1{
    font-size: 18px;
  }

 p{
    font-size: 10px;
  }

  input[type="text"],
  input[type="password"] {
    font-size: 10px;
    padding: 5px;
    width: 70%;
    height: 90%;
  }
  
  button {
    font-size: 14px;
    padding: 8px 16px;
  }


  


}
</style>