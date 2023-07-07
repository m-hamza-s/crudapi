const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "content cannot be empty!",
    });
    return;
  }

  //create a new tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    publishes: req.body.published ? req.body.published : false,
  };
  res.status(200).json({"message":"done"})
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occured while creating the tutorial",
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [op.like]: `${title}` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occure",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "error occured while retrieving by id",
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "tutorial updated successfully",
        });
      } else {
        res.send({
          message: `cannot update tutorial with id=${id}. maybe tutorial was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error updating tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "deleted successfully",
        });
      } else {
        res.send({
          message: `cannot delete with id=${id}. maybe not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  const id = req.params.id;

  Tutorial.destrou({
    where: {},
    truncate: false,
  })

    .then((nums) => {
      res.send({ message: `${nums} Tutorial were deleted` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occurred",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occuresd",
      });
    });
};
