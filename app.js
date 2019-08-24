const http = require('http');
const express = require('express');
var dbModule = require('./database');

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser =  require('body-parser').urlencoded({
  extended: false,
});
const app = express();


app.post('/sms/receive', bodyParser, (req, res) => {

  const sender = req.body.From;
  const body = req.body.Body;
  console.log('Demande en provenance de: ' + sender);
  automobile = dbModule.getAutomobile(body).then((resolve)=>{
    const resp = new MessagingResponse();
    resp.message(`Immatriculation: ${resolve.immatriculation}\n` + 
    `Marque: ${resolve.marque}\n` +
    `Utilisation: ${resolve.utilisation}\n` +
    `Proprietaire: ${resolve.proprietaire.nom} ${resolve.proprietaire.postnom} ${resolve.proprietaire.prenom}` +
    `\n\nDIREMA SYSTEM`);
    
    res
    .status(200)
    .contentType('text/xml')
    .send(resp.toString());
    console.log('Reponse pour: ' + sender +
    `\nProprietaire: ${resolve.proprietaire.nom} ${resolve.proprietaire.postnom} ${resolve.proprietaire.prenom}`);

  }).catch((reject)=>{
    console.log('Error: ' + reject);
    console.log('Impossible de repondre: ' + sender);
  });
  
  // console.log(`Hello, ${sender}, you said: ${body}`);
  
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});