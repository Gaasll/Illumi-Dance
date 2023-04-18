<script >
import TheWelcome from '../components/TheWelcome.vue'
import SignInView from './SignInView.vue';
import RegisterView from './RegisterView.vue';
import Alarm from "../components/Alarm.vue";
export default {
  components: {
    Alarm,
  },
};
</script>

<template>
  <main>
    <TheWelcome />
 
     <Alarm/>
     
  </main>
</template>
