const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({ name, email, password, role });

    //Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
});

module.exports = { register };
