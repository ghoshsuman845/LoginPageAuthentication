import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import {User} from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(public firestore: AngularFirestore) { }
  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   logoutUser() {
     return new Promise((resolve, reject) => {
       if(firebase.auth().currentUser){
         firebase.auth().signOut()
         .then(() => {
           console.log("Log Out");
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     });
     
   }
  
   userDetails(){
     return firebase.auth().currentUser;
   }
   getUsers() {
    return this.firestore.collection('users').snapshotChanges();
} 
createUser(user: User){
  return this.firestore.collection('users').add(user);
}
updateUser(user: User) {
  delete user.id;
  this.firestore.doc('users/' + user.id).update(user);
}
}
