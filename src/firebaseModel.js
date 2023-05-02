import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "/src/firebaseConfig.js";
//import IllumiModel from "./IllumiModel";

const app= firebase.initializeApp(firebaseConfig)
const db = getDatabase(app);
const auth = firebase.auth();

const REF = "illumi-dance-db";

async function firebaseModelPromise(notify) {
  const user = getUser();
  const uid = user ? user.uid : "";
  const ref = firebase.database().ref(REF + "/" + uid);

  const snapshot = await ref.once("value");
  const data = snapshot.val();
  const alarms = data && data.alarms ? data.alarms : [];
  const model = new IllumiModel(notify, uid, alarms);
  const fireBaseObsACB = (payload_1) => {
    if (payload_1 && payload_1.username) {
      ref.update({ username: model.username });
    }
    if (payload_1 && payload_1.alarms) {
      ref.update({ alarms: model.alarms });
    }
  };
  model.addObserver(fireBaseObsACB);
  return model;
}

function getUser() {
  const user = firebase.auth().currentUser;
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    return user;
  } else {
    return null;
  }
}

function updateFirebaseFromModel(model) {
  function fireBaseObsACB(payload) {
    const user = getUser();
    if (!user) {
      return;
    }

    if (payload && payload.username)
      firebase
        .database()
        .ref(REF + "/" + user.uid + "/username")
        .set(model.username);

    if (payload && payload.alarms)
      firebase
        .database()
        .ref(REF + "/" + user.uid + "/alarms")
        .set(payload.alarms);
  }
  model.addObserver(fireBaseObsACB);
}

function updateModelFromFirebase(model) {
  const user = getUser();
  if (!user) {
    return;
  }

  firebase
    .database()
    .ref(REF + "/" + user.uid + "/username")
    .on("value", function usernameChangedInFirebaseACB(firebaseData) {
      model.setUsername(firebaseData.val());
    });

  firebase
    .database()
    .ref(REF + "/" + user.uid + "/alarms")
    .on("value", function alarmsChangedInFirebaseACB(firebaseData) {
      model.setAlarms(firebaseData.val());
    });
}


export {
  firebaseModelPromise,
  updateFirebaseFromModel,
  updateModelFromFirebase,
  getUser,
};
