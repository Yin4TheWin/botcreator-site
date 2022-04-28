import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { firebase } from '../firebase';

const auth = getAuth(firebase)
const db = getDatabase(firebase)

module.exports={
    auth: auth,
    db: db,
    signUpUser: (email, password, name, location)=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          alert("Sign up successful")
          const user = userCredential.user;
          set(ref(db, 'users/'+user.uid), {
              name: name,
              location: location
            }
          )
        })
        .catch((error) => {
          alert(error.message)
        });
      },
      loginUser: (email, password)=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          alert("Login successful")
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      },
      signOutUser: ()=>{
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      }
}