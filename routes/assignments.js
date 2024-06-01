const express = require('express');
const router = express.Router();
const Assignment = require('../model/assignment'); // Vérifiez que le chemin est correct
const ObjectId = require('mongodb').ObjectID;
const { verifyToken, isAdmin, isSuperAdmin } = require('../middleware/auth.middleware');

// Récupérer tous les assignments (GET)
router.get('/', verifyToken, getAssignments);

// Récupérer un assignment par son id (GET)
router.get('/:id', verifyToken, getAssignment);

// Ajout d'un assignment (POST) - réservé aux admins
router.post('/', verifyToken, isAdmin, postAssignment);

// Update d'un assignment (PUT) - réservé aux admins
router.put('/:id', verifyToken, isAdmin, updateAssignment);

// Suppression d'un assignment (DELETE) - réservé aux superadmins
router.delete('/:id', verifyToken, isSuperAdmin, deleteAssignment);

function getAssignments(req, res) {
    let aggregateQuery = Assignment.aggregate();

    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            res.send(assignments);
        });
}

function getAssignment(req, res) {
    let assignmentId = new ObjectId(req.params.id);
    console.log("GET assignment by id : " + assignmentId)
    Assignment.findById(assignmentId, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json(assignment);
    });
}

function postAssignment(req, res) {
    let assignment = new Assignment({
        _id: new ObjectId(),
        nom: req.body.nom,
        dateDeRendu: req.body.dateDeRendu,
        rendu: req.body.rendu,
        auteur: {
            nom: req.body.auteur.nom,
            photo: req.body.auteur.photo
        },
        professeur: {
            nom: req.body.professeur.nom,
            photo: req.body.professeur.photo
        },
        matiere: {
            nom: req.body.matiere.nom,
            image: req.body.matiere.image
        },
        note: req.body.note,
        remarques: req.body.remarques
    });

    console.log("POST assignment reçu :");
    console.log(assignment);

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!` });
    });
}

function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({ message: 'updated' });
        }
    });
}

function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${assignment.nom} deleted` });
    });
}

module.exports = {
    getAssignments,
    getAssignment,
    postAssignment,
    updateAssignment,
    deleteAssignment
};
