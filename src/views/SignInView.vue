<template>
  
  <br>
  <br>
  <br>
  <br>
    <br>
    <br>
     <br>
    <br>
    <br>
    <br>
    <br>
      
      
  <div>
  <form @submit.prevent="onFormSubmit" class="register-form">
    <h2>Sign in</h2>
    <p>Don't have an account? <a href="#" @click="viewStateChange()">Sign up here.</a></p><br>
    <div class="form-fields">
      <span>E-mail: </span>
      <input type="email" class="inputField" placeholder="enter e-mail..." v-model="email">

      <span>Password: </span>
      <input type="password" class="inputField" placeholder="enter password..." v-model="password">
    </div>
    <div>
    <NextButton @click="onFormSubmit" />
  </div>
  </form>
  </div>
</template>

<script>
import NextButton from "../components/NextButton.vue"
export default {
  props: ['viewStateChange', 'signInUser'],
  components: {
    NextButton,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    onFormSubmit() {
      this.signInUser(this.email, this.password);
    }
  },
}
</script>

<style media="screen">


form {
  height: 400px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 40px 20px;
}

form * {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #313131;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}



form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(8, 8, 8, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}

::placeholder {
  color: #6e6d6d;
}

@media screen and (max-width: 600px) {
  form {
    height: auto;
    width: 90%;
    font-size: 10px;
  }

  input{
    height: 30px;
    font-size: 10px;
  }
}



</style>