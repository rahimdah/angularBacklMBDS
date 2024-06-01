const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const assignments = require('./routes/assignments'); // Assurez-vous que ce chemin est correct

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Remplacez par votre propre URI de connexion à MongoDB
const uri = 'mongodb+srv://ibrahimdah:ibrahim@cluster0.iwclpkv.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("Vérifiez with http://localhost:8010/api/assignments que cela fonctionne");
  },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8010;

// Les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignments.getAssignments)
  .post(assignments.postAssignment)
  .put(assignments.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignments.getAssignment)
  .delete(assignments.deleteAssignment);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;
