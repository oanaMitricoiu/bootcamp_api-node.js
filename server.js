const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
let bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");

//Load env variables

dotenv.config({ path: "./config/config.env" });

//Connect to mongoDb
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode, on port ${PORT}`
    )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
    console.log(`Error: ${error.message}`);
    server.close(() => process.exit(1));
});
