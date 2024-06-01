let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = require('mongodb').ObjectID;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
    _id: ObjectId,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    auteur: {
        nom: { type: String },
        photo: String
    },
    matiere: {
        nom: { type: String },
        image: String
    },
    professeur: {
        nom: { type: String },
        photo: String
    },
    note: { type: Number, min: 0, max: 20 },
    remarques: String
});


AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);
