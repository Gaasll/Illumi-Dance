<template>
  
 <br>
    <div>


    
      
      <button @click="handleToggleClick"> Firebase
     
      </button>
      <div>
        <div class="multi-button">
          <div class="led-container pattern1">
            <led-lamp v-for="i in 12" :key="i" />
          </div>
          <h1>PATTERN 1 </h1> <h2> Follow the sequence. </h2>
          <h3>
          <button class="button" @click="pattern1"><span>PREVIEW</span></button>
          <button class="button"><span>TRY NOW</span></button>
          </h3>
        </div>

        <br>

        <div class="multi-button">
          <div class="led-container pattern2">
            <led-lamp v-for="i in 12" :key="i" />
          </div>
          <h1>PATTERN 2 </h1>
          <h2> Meet up and mingle. </h2>
          <h3>
          <button class="button" @click="pattern2">PREVIEW</button>
          <button class="button"><span>TRY NOW</span></button> 
          </h3>
        </div>


            <br>

          <div class="multi-button">
            <div class="led-container pattern3">
              <led-lamp v-for="i in 12" :key="i" />
            </div>
            <h1>PATTERN 3 </h1>
            <h2> ............. </h2>
            <h3>
            <button class="button" @click="pattern3">PREVIEW</button>
            <button class="button"><span>TRY NOW</span></button> 
            </h3>
          </div>
        
      </div>
    </div>
</template>

<script>
import LedLamp from '../components/LedLamp.vue';
import { ref, set } from 'firebase/database';
import {db} from "../firebase"

export default {
  components: {
    LedLamp
  },
  methods: {
    pattern1() {
      var ledLamps = document.querySelectorAll('.pattern1 .led-lamp');
      var currentLamp = 0;
      var intervalId = setInterval(function () {
        if (currentLamp >= ledLamps.length) {
          clearInterval(intervalId);
          return;
        }
        ledLamps[currentLamp].classList.add('led-green');
        setTimeout(function () {
          ledLamps[currentLamp].classList.remove('led-green');
          currentLamp++;
        }, 50);
      }, 100);
    },

    pattern2() {
      var ledLamps = document.querySelectorAll('.pattern2 .led-lamp');
      var leftLamp = 0;
      var rightLamp = ledLamps.length - 1;
      var intervalId = setInterval(function () {
        if (leftLamp >= rightLamp) {
          clearInterval(intervalId);
          return;
        }
        ledLamps[leftLamp].classList.add('led-green');
        ledLamps[rightLamp].classList.add('led-green');
        setTimeout(function () {
          ledLamps[leftLamp].classList.remove('led-green');
          ledLamps[rightLamp].classList.remove('led-green');
          leftLamp++;
          rightLamp--;
        }, 50);
      }, 100);
    }, 

     pattern3() {
      var ledLamps = document.querySelectorAll('.pattern3 .led-lamp');
      var leftLamp = 0;
      var rightLamp = ledLamps.length - 1;
      var intervalId = setInterval(function () {
        if (leftLamp >= rightLamp) {
          clearInterval(intervalId);
          return;
        }
        ledLamps[leftLamp].classList.add('led-green');
        ledLamps[rightLamp].classList.add('led-green');
        setTimeout(function () {
          ledLamps[leftLamp].classList.remove('led-green');
          ledLamps[rightLamp].classList.remove('led-green');
          leftLamp++;
          rightLamp--;
        }, 50);
      }, 100);
    },

    //FIREBASE
    handleToggleClick() {
      const ledStateRef = ref(db, 'LED_STATUS');
      
      set(ledStateRef, 1)
        .then(() => {
          //this.ledState = newValue === 1;
        })
        .catch((error) => {
          console.error('Error writing to Firebase: ', error);
        });
    },

  }
};
</script>

<style>
.led-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
  /* set the height to the full viewport height */
}

.multi-button {
  background-color: var(--complement);
  border-radius: 10px;
  box-shadow: 0 5px 10px #11111150;
  padding: 10px
  
}

.multi-button *:not(.led-container) {
  font-size: 0.5rem;
  text-align: center;
  margin-bottom: 10px;
}

.button1 {
  display: block;
  height: 20px;
  width: 70px;
  background-color: rgba(8, 8, 8, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
</style>