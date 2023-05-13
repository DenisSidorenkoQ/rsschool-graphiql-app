import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBviA7umOkrZN59n_EiyhUsuBX9DF6_aiE',
  authDomain: 'rsschool-graphiql-app.firebaseapp.com',
  projectId: 'rsschool-graphiql-app',
  storageBucket: 'rsschool-graphiql-app.appspot.com',
  messagingSenderId: '724356906952',
  appId: '1:724356906952:web:8d34fd027d9a029f188afd',
  measurementId: 'G-PMB9S755F5',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(
        collection(db, 'users'),
        {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email,
        } | null
      );
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password): Promise<number> => {
  return await signInWithEmailAndPassword(auth, email, password).then(userCredential => {
    localStorage.setItem("token", userCredential.user.uid);
    return 1;
  }).catch(err => {
    return -1;
  });
};

const registerWithEmailAndPassword = async (name, email, password) : Promise<number> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return 1;
  } catch (e) {
    return -1;
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
};
