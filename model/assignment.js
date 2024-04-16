let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = require('mongodb').ObjectID;

let AssignmentSchema = Schema({
    _id: ObjectId,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);
