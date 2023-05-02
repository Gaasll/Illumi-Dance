<template>
    
   

    <div class="patternpage">
         <br>
         <h1>Choose patterns to display </h1>
           <p>Click on the "preview" button to take a look at these patterns. There are 7 different patterns for you to choose from. Enjoy! </p>
            <select class="option-select" @change="updateSelectedEffect($event)">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            <button class="button2" @click="playEffect">Play</button>
            <button class="button2" @click="stopEffect">Stop</button>


          <div class="containers">
            <div class="multi-button">
              <div class="led-container pattern1">
                <led-lamp v-for="i in 12" :key="i" />
              </div>
              <h1>PATTERN 1 </h1> <h2> Illuminated Ripple </h2>
              <h3>
              <button class="button" @click="pattern1"><span>PREVIEW</span></button>
              
              </h3>
            </div>

            <br>

            <div class="multi-button">
              <div class="led-container pattern2">
                <led-lamp v-for="i in 12" :key="i" />
              </div>
              <h1>PATTERN 2 </h1>
              <h2> Converging Runners </h2>
              <h3>
              <button class="button" @click="pattern2">PREVIEW</button>
               
              </h3>
            </div>


                <br>

              <div class="multi-button">
                <div class="led-container pattern3">
                  <led-lamp v-for="i in 12" :key="i" />
                </div>
                <h1>PATTERN 3 </h1>
                <h2> Triplet Streak </h2>
                <h3>
                <button class="button" @click="pattern3">PREVIEW</button>
                
                </h3>
              </div>

               <div class="multi-button">
                    <div class="led-container pattern3">
                      <led-lamp v-for="i in 12" :key="i" />
                    </div>
                    <h1>PATTERN 4 </h1>
                    <h2> Staggered Wave</h2>
                    <h3>
                    <button class="button" @click="pattern3">PREVIEW</button>
                
                    </h3>
                </div>

                 <div class="multi-button">
                    <div class="led-container pattern3">
                      <led-lamp v-for="i in 12" :key="i" />
                    </div>
                    <h1>PATTERN 5 </h1>
                    <h2> Stepwise Waterfall </h2>
                    <h3>
                    <button class="button" @click="pattern3">PREVIEW</button>
                
                    </h3>
                </div>

                 <div class="multi-button">
                        <div class="led-container pattern3">
                          <led-lamp v-for="i in 12" :key="i" />
                        </div>
                        <h1>PATTERN 6 </h1>
                        <h2> Pulsing Strobe </h2>
                        <h3>
                        <button class="button" @click="pattern3">PREVIEW</button>
                
                        </h3>
                </div>

                    <div class="multi-button">
                            <div class="led-container pattern3">
                              <led-lamp v-for="i in 12" :key="i" />
                            </div>
                            <h1>PATTERN 7 </h1>
                            <h2> Bouncing Alternating Lights </h2>
                            <h3>
                            <button class="button" @click="pattern3">PREVIEW</button>
                
                            </h3>
                    </div>
        
          </div>
        </div>
</template>
  
<script>
import { ref, set, get } from 'firebase/database';
import { db } from '../firebase';
import { reactive, computed, watch } from 'vue';
import { getUser } from '../firebaseModel'
import LedLamp from '../components/LedLamp.vue';





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

    },

    


    setup(props) {
        const state = reactive({
            user: null,
            delay: 1000,
            selectedEffect: 1,
            previousEffect: 1,
        });

        



        const init = async () => {
            state.user = await getUser();
            if (state.user) {
                //await fetchAllSequence();
            }
        };
        init();


        const updateSelectedEffect = (event) => {
            state.selectedEffect = parseInt(event.target.value);


        };

        const stopPrevEffect = async () => {
            const ledStateRef = ref(db, `EFFECT_${state.previousEffect}/`);
            const offValue = '0';
            await set(ledStateRef, offValue)
                .then(() => {
                    // setLedStatus(offValue);
                })
                .catch((error) => {
                    console.error('Error writing to Firebase: ', error);
                });
        };

        function timeout() {
            return new Promise((resolve) => {
                setTimeout(resolve, state.delay);
            });
        }


        const playEffect = async () => {
            stopPrevEffect();
            const ledStateRef = ref(db, `EFFECT_${state.selectedEffect}/`);
            const onValue = '1';
            await set(ledStateRef, onValue)
                .then(() => {
                    state.previousEffect = state.selectedEffect;
                })
                .catch((error) => {
                    console.error('Error writing to Firebase: ', error);
                });
        };

        const stopEffect = async () => {
            const ledStateRef = ref(db, `EFFECT_${state.selectedEffect}/`);
            const offValue = '0';
            await set(ledStateRef, offValue)
                .then(() => {
                    // setLedStatus(offValue);
                })
                .catch((error) => {
                    console.error('Error writing to Firebase: ', error);
                });
        };




        return {
            state,
            playEffect,
            stopEffect,
            updateSelectedEffect,
            stopPrevEffect,
        };
    },
};
</script>

<style>

.patternpage{
    position: relative;
    text-align: center;
     font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

    

}

.option-select{
    text-align: center;
     margin-bottom: 20px;
     height: 20px;
     background-color: transparent;
     border-radius: 3px;
}




.containers{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 4%;
  
  
}

.multi-button {
  background-color: #dee0de7c;
  border-radius: 10px;
  box-shadow: 0 5px 10px #11111150;
  padding: 20px;
 text-align: center;
 width: 200px;
 margin-right: 2%;
 height: 130px;
 



  
}

h1{
  font-weight: bold;
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

.button2{
  
  height: 20px;
  width: 70px;
  background-color: rgba(39, 38, 38, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  margin-bottom: 40px;
  
  color: black;

}

.button2:hover {
  background-color: #fbfcfb;
}

@media only screen and (max-width: 480px) {
  .multi-button {
    max-width: 50%;
    padding:  12px;
    text-align: center;
    margin-left: 70px;
    margin-bottom: 20px;
  }



}

@media only screen and (min-width: 480px) {
  .multi-button {
    margin-bottom: 50px;
    
  }

  .containers{
    margin-left: 20%;
    margin-right: 20%;


  }



}

</style>
