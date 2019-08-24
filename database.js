var firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyAg0gTkHbZlCUnf3yp5AV09Ck0wRGSoyxw",
    authDomain: "cityverse-c32ce.firebaseapp.com",
    databaseURL: "https://cityverse-c32ce.firebaseio.com",
    projectId: "cityverse-c32ce",
    storageBucket: "cityverse-c32ce.appspot.com",
    messagingSenderId: "741885815534",
    appId: "1:741885815534:web:6cd0c10d5028c3e9"
  };

 const project =  firebase.initializeApp(firebaseConfig);
 const db = project.database();

exports.getAutomobile = function(immatriculation) {
     return new Promise((resolve, reject) => {
        db.ref('direma-beta/automobiles')
            .once('value')
            .then((snapshot) => {
                      if(snapshot.val()){
                          snapshot.val().forEach(element => {
                              if(element.immatriculation === immatriculation){
                                  getProprietaire(element.proprietaire).then((proprietaire) => {
                                      element.proprietaire = proprietaire;
                                      resolve(element);
                                  }).catch((error) => {
                                      console.log('Error: ' + error);
                                  })
                              }
                          });
                      }else{
                          reject('Error');
                      }
            }).catch(error => {
                reject(error)
            }); 
        });
 }

 function getProprietaire(idProprietaire) {
    return new Promise((resolve, reject) => {
       db.ref('direma-beta/proprietaires')
           .once('value')
           .then((snapshot) => {
                     if(snapshot.val()){
                         snapshot.val().forEach(element => {
                             if(element.id === idProprietaire){
                                 resolve(element);
                             }
                         });
                     }else{
                         reject('Error');
                     }
           }).catch(error => {
               reject(error)
           }); 
       });
}