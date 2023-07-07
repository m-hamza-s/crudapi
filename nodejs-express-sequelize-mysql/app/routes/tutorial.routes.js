module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    //create a new tutorial
    router.post("/add", tutorials.create);

    //retrieve all tutorials
    router.get("/", tutorials.findAll);

    //retrieve all publishes tutorials
    router.get("/published",tutorials.findAllPublished);

    //retrieve a single tutorial with id
    router.get("/:id", tutorials.findOne);

    //update with id
    router.put("/:id", tutorials.update);

    //delete with id
    router.delete("/:id",tutorials.delete);

    router.delete("/",tutorials.deleteAll);

    app.use('api/tutorials', router);

}