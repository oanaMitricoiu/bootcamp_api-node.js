const express = require("express");
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

//Include other resource router
const courseRouter = require("./courses");

const router = express.Router();

router.use("/:bootcampId/courses", courseRouter);

router
    .route("/")
    .get(advancedResults(Bootcamp), getBootcamps)
    .post(createBootcamp);
router
    .route("/:id")
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

router.route("/:id/photo").put(bootcampPhotoUpload);

module.exports = router;
