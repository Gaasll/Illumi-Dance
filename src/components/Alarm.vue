<template>
  <div>
    <div v-if="!alarmSet">
      <br><br><br><br><br><br><br><br><br><br>
      <form @submit.prevent="submitForm">
        <h1> Sunrise</h1>
        <p> Set time for Sunrise.</p>
        <br> 
        <span for="time">Time:</span>
        <input type="time" id="time" name="time" v-model="time">
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-else>
      <p>Alarm set for {{ dateTime.toLocaleString() }}.</p>
      <button @click="snooze" v-show="alarmActive">Snooze</button>
      <button @click="stop" v-show="alarmActive">Stop</button>
    </div>
  </div>
</template>
<script>
import inspiring from '@/assets/inspiring.mp3';

export default {
  data() {
    return {
      time: '',
      alarmSet: false,
      alarmActive: false,
      dateTime: null,
      timeoutId: null,
    };
  },


  methods: {
    submitForm() {
      const now = new Date();
      let dateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), this.time.split(':')[0], this.time.split(':')[1]);

      if (dateTime <= now) {
        dateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, this.time.split(':')[0], this.time.split(':')[1]);
      }

      const millisUntilPlay = dateTime - now;

      this.timeoutId = setTimeout(() => {
        this.alarmActive = true;
        const audio = new Audio(inspiring);
        audio.play();
      }, millisUntilPlay);

      this.alarmSet = true;
      this.dateTime = dateTime;
      //stored alarm for each user.
      localStorage.setItem('alarm', JSON.stringify({ dateTime: this.dateTime }));
    },
    snooze() {
      this.alarmActive = false;
      clearTimeout(this.timeoutId);
      const snoozeTime = new Date(Date.now() + 300000); // 5 minutes from now
      this.submitForm(snoozeTime);
    },
    stop() {
      console.log('Stop button clicked!');
      this.alarmActive = false;
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    },
  },

};
</script>

<style>
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