class IllumiModel {
  constructor(notify, uid, alarms) {
    this.observers = [notify];

    this.uid = uid || "";
    this.alarms = alarms || [];
  }

  setUsername(name) {
    this.username = name;
    this.notifyObservers({ username: this.username });
  }

  setAlarms(alarms) {
    this.alarms = alarms;
    this.notifyObservers({ alarms: this.alarms });
  }

  notifyObservers(payload) {
    function callObserverCallback(obs) {
      try {
        obs(payload);
      } catch (err) {
        console.error(err);
      }
    }

    this.observers.forEach(callObserverCallback);
  }

  addObserver(toAdd) {
    this.observers = [...this.observers, toAdd];
  }

  addAlarm(newAlarm) {
    this.alarms.push(newAlarm);
    this.notifyObservers({ alarms: this.alarms });
  }
}

export default IllumiModel;
