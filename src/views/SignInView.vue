<template>

  <br>
  <div class="container">
    <h1>Sign in</h1>
     <p>Don't have an account? <a href="#" @click="newAccount()">Sign up here.</a></p> <br>
    <div class="form-group">
      
      <input type="text" id="email" v-model="email" placeholder="Enter e-mail" />
    </div>
    <div class="form-group">
     
      <input type="password" id="password" v-model="password" placeholder="Enter password"  />
    </div>
    <p v-if="errMsg" class="error-msg">{{ errMsg }}</p>
    <div class="form-group">
      <button @click="register">Submit</button>
    </div>
   
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

const newAccount = () => {
  router.push("/register");
};

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully signed in!");
      router.push("/home");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;

        case "auth/user-not-found":
          errMsg.value = "No account with that user was found";
          break;

        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;

        default:
          errMsg.value = "Email or password is incorrect";
          break;
      }
    });
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
  width: 100%;
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
    text-align: center;
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
     margin: 0 auto;
  display: block;
  }
  
  button {
    font-size: 14px;
    padding: 8px 16px;
  }


  


}

</style>