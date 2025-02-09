import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
  apiKey: "AIzaSyDu7aZbSfIrN6br5V9XMRSYtZbqhdzt0iY",
  authDomain: "crwn-ecom-8fb4f.firebaseapp.com",
  projectId: "crwn-ecom-8fb4f",
  storageBucket: "crwn-ecom-8fb4f.appspot.com",
  messagingSenderId: "636299632712",
  appId: "1:636299632712:web:89ceac1a93dd16d7fcf87d"
};

export const createUserProfileDocument = async (userAuth,additionalData)=>{
  if (!userAuth) return;

  const userRef =firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
