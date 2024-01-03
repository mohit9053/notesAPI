const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./db/connection");

dotenv.config();
const app = express();

const errorMiddleware = require("./middlewares/error")

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());

connectDB();

app.use('/api/auth', require('./routes/user'));
app.use('/api/notes', require('./routes/notes'));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});