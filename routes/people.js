const express = require('express');

// instantiating express router
const router = express.Router();

// acquiring controllers
const PeopleControllers = require('../controllers/people')

// -------------- Endpoints ----------------
// router.get('/', PeopleControllers.getPeople)

// // javascript
// router.post('/', PeopleControllers.createPerson)

// // put request
// router.put('/:id', PeopleControllers.updatePerson)

// // Delete
// router.delete('/:id', PeopleControllers.deletePerson)

// Alternative way
router.route('/').get(PeopleControllers.getPeople).post(PeopleControllers.createPerson);
router.route('/:id').put(PeopleControllers.updatePerson).delete(PeopleControllers.deletePerson);

module.exports = router;