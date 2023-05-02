<template>
  <br>
  <h1>Design Your Own Customized Sequence</h1>
   <p>To customize your pattern, simply click on the lamps you want to use. As you click on each lamp, it will be added to your sequence.</p>
   <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  
  <form>

    <div>
     
      <div>
        <div>
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" > 
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage1" @click="addToSeq(1)" > 
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage2" @click="addToSeq(2)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" >
          <img src="../assets/led_off.svg" alt="Clickable image" id="myImage0" @click="addToSeq(0)" > <br>
          <button @click="playSequence">Preview</button>
          <button @click="resetSeq">Reset</button>
        </div>
      </div>
    <div class="custom-sequence-container">
      <label>Custom Sequence:</label>
      <select class="option-select" @change="updateSelectedSequence($event)">
        <option value="1" class="option-test">1</option>
        <option value="2" class="option-test">2</option>
        <option value="3" class="option-test">3</option>
      </select>
      <button @click="saveSequence">Save</button>

      <button @click="playSelectedSequence">Play</button>

      <button @click="fetchSequence">Fetch Sequence</button>
    </div>

    <div class="custom-sequence-container">
      <label>Current Sequence:</label>
      <div>{{ currentSequence }}</div>
    </div>

    <div class="custom-sequence-container">
      <label>Saved Sequence:</label>
      <div>{{ formattedSequence }}</div>
    </div>

  </div>
  <br>
   <router-link to="/Home">Go back</router-link>
  </form>
</template>
  
<script>
import { ref, set, get } from 'firebase/database';
import { db } from '../firebase';
import { reactive, computed } from 'vue';
import { getUser } from '../firebaseModel'
import ledOnImage from '../assets/led.svg';
import ledOffImage from "../assets/led_off.svg"


export default {
  setup() {
    const state = reactive({
      user: null,
      sequence: [],
      delay: 1000,
      customSeq1: [],
      customSeq2: [],
      customSeq3: [],
      selectedSequence: 1,
    });

    const init = async () => {
      state.user = await getUser();
    };

    init();


    const currentSequence = computed(() => {
      const ledNames = ["LED 11", "LED 12", "LED 13"];
      return state.sequence.map((index) => ledNames[index]).join(" -> ");
    });

    const formattedSequence = computed(() => {
      const ledNames = ["LED 11", "LED 12", "LED 13"];
      const seqKey = `customSeq${state.selectedSequence}`;
      const customSequence = state[seqKey];
      return customSequence.map((index) => ledNames[index]).join(" -> ");
    });

    const updateSelectedSequence = (event) => {
      state.selectedSequence = parseInt(event.target.value);
      resetSeq();
      fetchSequence();
    };

    function timeout() {
      return new Promise((resolve) => {
        setTimeout(resolve, state.delay);
      });
    }

    const resetSeq = () => {
      state.sequence = [];

       for (let i = 0; i <= 3; i++) {
        var image = document.getElementById(`myImage${i}`);
        image.src = ledOffImage;
      }
    };

    const addToSeq = (index) => {
      state.sequence.push(index);
      
      var image = document.getElementById(`myImage${index}`);
      image.src = ledOnImage;
    };

    const playSequence = async () => {
      for (const index of state.sequence) {
        const path = ['LED_STATUS11', 'LED_STATUS12', 'LED_STATUS13'][index];

        await turnOnLed(path);
        await timeout();
        await turnOffLed(path);
      }
    };

    const turnOffLed = async (path) => {
      const user = state.user;
      if (user) {
        const ledStateRef = ref(db, path);
        //const ledStateRef = ref(db, `users/${user.uid}/arduino/` + path);
        const offValue = '1';
        await set(ledStateRef, offValue)
          .then(() => {
            // setLedStatus(offValue);
          })
          .catch((error) => {
            console.error('Error writing to Firebase: ', error);
          });
      }

    };

    const turnOnLed = async (path) => {
      const user = state.user;
      if (user) {
        const ledStateRef = ref(db, path);
        //const ledStateRef = ref(db, `users/${user.uid}/arduino/` + path);
        const onValue = '0';
        await set(ledStateRef, onValue)
          .then(() => {
            //setLedStatus(onValue);
          })
          .catch((error) => {
            console.error('Error writing to Firebase: ', error);
          });

      }


    };


    const saveSequence = async () => {
      const user = state.user;
      if (user) {
        const sequenceRef = ref(
          db,
          `users/${user.uid}/sequence${state.selectedSequence}`
        );
        await set(sequenceRef, state.sequence)
          .then(() => {
            fetchSequence();
          })

      } else {
        console.error("User not found");
      }
    };

    const fetchSequence = async () => {
      const user = state.user;
      if (user) {
        const sequenceRef = ref(
          db,
          `users/${user.uid}/sequence${state.selectedSequence}`
        );
        await get(sequenceRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const seqKey = `customSeq${state.selectedSequence}`;
              state[seqKey] = snapshot.val();
              console.log(
                "Sequence fetched from Firebase for user:",
                user.uid + state[seqKey]
              );
            } else {
              console.log(
                "No sequence data found in Firebase for user:",
                user.uid
              );
              const seqKey = `customSeq${state.selectedSequence}`;
              state[seqKey] = [];
            }
          })
      } else {
        console.error("User not found");
      }
    };

    const playSelectedSequence = async () => {
      const seqKey = `customSeq${state.selectedSequence}`;
      const customSequence = state[seqKey];

      for (const index of customSequence) {
        const path = ["LED_STATUS11", "LED_STATUS12", "LED_STATUS13"][index];

        await turnOnLed(path);
        await timeout();
        await turnOffLed(path);
      }
    };

    return {
      state,
      resetSeq,
      addToSeq,
      playSequence,
      saveSequence,
      fetchSequence,
      updateSelectedSequence,
      playSelectedSequence,
      formattedSequence,
      currentSequence,
    };
  },
};
</script>

  
<style scoped>
.custom-sequence-container {
  color: black;
}

.option-select {
  font-size: 16px;
  color: #333;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
}

.option-test {
  font-size: 14px;
  color: #333;
}


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
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #313131;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
  text-align: center;
}

img{
  display: inline-block;
vertical-align: middle;
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

 h6{
    
    text-align: center;
  }

   p{
    
    text-align: center;
  }

@media screen and (max-width: 600px) {
  form {
    height: auto;
    width: 90%;
    font-size: 10px;
     text-align: center;
  }

 img {
    width: 20px;
    height: 20px;
  }

  
  input {
    font-size: 14px;
    text-align: center;
    padding:  10px;
    width: 70%;
    height: 100%;
     margin: 0 auto;
  display: block;
  }

  h1{
    font-size: 17px;
    text-align: center;
  }

   p{
    font-size: 12px;
    text-align: center;
  }

   button {
    font-size: 14px;
    padding: 8px 16px;
    margin-top: 2%;
  }

}
</style>
  