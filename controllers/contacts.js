const mongodb = require('../models/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  
  const result = await mongodb.getDb().db("MarkContact").collection('Contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDb()
    .db("MarkContact")
    .collection('Contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res, next) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  // Create a Contact
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  
  // Save Contact in the database
  const result = await mongodb.getDb().db("MarkContact").collection('Contacts').insertOne(contact);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }

  /*
  contact
    .save(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });*/
};
  


const updateContact = async (req, res, next) => {
  //const userId = new ObjectId(req.params.id);
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  
  const id = req.params.id;
  
  Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
        });
      } else res.send({ message: "Contacct was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};
/*
  const result = await mongodb
    .getDb()
    .db("MarkContact")
    .collection('Contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};*/

const deleteContact = async (req, res, next) => {
  //const userId = new ObjectId(req.params.id);
  const id = req.params.id;
  
  Contact.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      } else {
        res.send({
          message: "Contact was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};

/*
  const result = await mongodb
    .getDb()
    .db("MarkContact")
    .collection('Contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};*/

module.exports = { 
  getAll, 
  getSingle, 
  createContact, 
  updateContact, 
  deleteContact 
};

