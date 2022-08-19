import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  getAuth, onAuthStateChanged, signOut, signInWithPopup
} from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _fireAuth: Auth,
    private firestore: Firestore
  ) { }

  authState() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._fireAuth, user => {
        if (user) {
          resolve(true)
        } else {
          reject(false);
        }
      });
    });
  }

  async signUp(form: any) {
    try {
      const newUser = await createUserWithEmailAndPassword(this._fireAuth, form.email, form.password);
      debugger
      const uid = newUser.user.uid;
      const userRef = doc(this.firestore, `users/${uid}`);
      return setDoc(userRef, { name: form.name, email: form.email});
      // await this.storage.setStorage('user_key', uid);
    } catch (err) {
      throw (err);
    }
  }

  async login(form: any) {
    try {
      const response = await signInWithEmailAndPassword(this._fireAuth, form.email, form.password);

      if (response?.user) {
        const uid = response.user.uid;
        // await this.storage.setStorage('user_key', uid);
        return uid;
      } else {
        return null;
      }
    } catch (err) {
      throw (err);
    }
  }

  // Sign in with Google
  async googleAuthentication() {
    try {
      const credential = await signInWithPopup(this._fireAuth, new firebase.auth.GoogleAuthProvider());
      const user = credential.user;
      const userRef = doc(this.firestore, `users/${user.uid}`);
      setDoc(userRef, { name: user.displayName, email: user.email, photoURL: user.photoURL });
    } catch (err) {
      throw(err);
    }

  }

  async resetPassword(email: string) {
    try {
      const user = await sendPasswordResetEmail(this._fireAuth, email);
    }
    catch(err) {
      throw(err);
    };
  }


  async logout() {
    try {
      await signOut(this._fireAuth);
      // await this.storage.removeStorage('user_key');
      return true;
    }
    catch (e) {
      throw (e);
    }
  }

}
