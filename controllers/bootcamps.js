const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

const getBootcamps = asyncHandler(async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query };

    const removeFields = ["select", "sort"];

    removeFields.forEach((param) => delete reqQuery[param]);

    let queryString = JSON.stringify(reqQuery);

    queryString = queryString.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    query = Bootcamp.find(JSON.parse(queryString));

    //Select
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }

    //Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }

    const bootcamps = await query;

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
    });
});

const getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id ${req.params.id}`,
                404
            )
        );
    }
    res.status(200).json({ success: true, data: bootcamp });
});

const createBootcamp = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        succes: true,
        data: bootcamp,
    });
});

const updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).send({ success: true, data: bootcamp });
});

const deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp not found with id ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).json({ success: true, data: bootcamp });
});

module.exports = {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
};
