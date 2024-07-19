const getBootcamps = (req, res, next) => {
    res.status(200).json({ succes: true, msg: "Show all bootcamps" });
};

const getBootcamp = (req, res, next) => {
    res.status(200).json({
        succes: true,
        msg: `Show bootcamp ${req.params.id}`,
    });
};

const createBootcamp = (req, res, next) => {
    res.status(201).json({
        succes: true,
        msg: "Create new bootcamp",
    });
};

const updateBootcamp = (req, res, next) => {
    res.status(200).json({
        succes: true,
        msg: `Update bootcamp ${req.params.id}`,
    });
};

const deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Deleted bootcamp with id ${req.params.id}`,
    });
};

module.exports = {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
};
