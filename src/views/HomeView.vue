<template>
  <div>
     <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <form>
    <h1>Sunrise</h1>
    <p>Set time for Sunrise.</p>
    <div v-if="alarm">
      <p>Current alarm: {{ alarm.time }}</p>
      <button @click="deleteAlarm(alarm.id)">Edit</button>
    </div>
    <div v-else>
      <label>
       
        <input type="time" v-model="newAlarmTime" />
      </label>
      <button @click="addAlarm">Submit</button>
    </div>
    </form>
  </div>

  
</template>

<script>
import inspiring from '@/assets/inspiring.mp3';
import moment from 'moment';
export default {
  data() {
    return {
      alarm: null,
      newAlarmTime: moment().format('HH:mm'), // set initial value to current time in the format of 'HH:mm'
      audio: null,
    };
  },
  created() {
    setInterval(() => {
      this.checkAlarms();
    }, 1000);
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      // Retrieve the user's alarm data from localStorage
      const alarmData = localStorage.getItem("alarm");
      if (alarmData) {
        this.alarm = JSON.parse(alarmData);
      }
    },
    addAlarm() {
      // Create a new alarm and add it to the local state
      const newAlarm = { id: Date.now(), time: this.newAlarmTime };
      this.alarm = newAlarm;
      // Save the updated alarm to localStorage
      localStorage.setItem("alarm", JSON.stringify(this.alarm));
    },
    deleteAlarm(id) {
      // Remove the alarm with the given ID from the local state
      this.alarm = null;
      // Save the updated alarm to localStorage
      localStorage.removeItem("alarm");
    },
    checkAlarms() {
      const now = moment();
      const alarmTime = moment(this.alarm.time, 'HH:mm');
      if (now.isSame(alarmTime, 'minute')) {
        this.playAlarm();
      }
    },
    playAlarm() {
      this.audio = new Audio(inspiring);
      this.audio.play();
    },
  },
  beforeDestroy() {
    if (this.audio !== null) {
      this.audio.pause();
      this.audio = null;
    }
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
  padding: 10 10px;
 
  font-size: 14px;
  font-weight: 300;
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


::placeholder {
  color: #6e6d6d;
}

@media screen and (max-width: 600px) {
  form {
    height: auto;
    width: 90%;
    font-size: 10px;
     text-align: center;
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
    font-size: 20px;
  }

   p{
    font-size: 14px;
  }

   button {
    font-size: 14px;
    padding: 8px 16px;
    margin-top: 2%;
  }

}</style>