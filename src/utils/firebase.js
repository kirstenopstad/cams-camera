import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

async function getDocById(database, collectionName, docId) {
  const docRef = doc(database, collectionName, docId);
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(error);
    return null;
  }
}

const collections = {
  mail: "mailing-list",
  res: "quotes",
};

export { app, db, getDocById, collections };
