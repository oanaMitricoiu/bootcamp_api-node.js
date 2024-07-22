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
        res.status(400).json({ success: false });
    }
};

const getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: bootcamp });
    } catch (err) {
        res.status(400).json({ success: false });
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
        res.status(400).json({ succes: false });
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
            return res.status(400).json({ success: false });
        }

        res.status(200).send({ success: true, data: bootcamp });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
};

const deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

module.exports = {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
};
