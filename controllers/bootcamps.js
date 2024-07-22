const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

const getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps,
        });
    } catch (err) {
        next(err);
    }
};

const getBootcamp = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
};

const createBootcamp = async (req, res, next) => {
    try {
        console.log(req.body);
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            succes: true,
            data: bootcamp,
        });
    } catch (err) {
        next(err);
    }
};

const updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!bootcamp) {
            return next(
                new ErrorResponse(
                    `Bootcamp not found with id ${req.params.id}`,
                    404
                )
            );
        }

        res.status(200).send({ success: true, data: bootcamp });
    } catch (err) {
        next(err);
    }
};

const deleteBootcamp = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
};
