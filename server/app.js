const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
// const chalk = require('chalk')


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(
//   {
//   origin: "localhost:3000",
//   optionsSuccessStatus: 200
// }
));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"))
// })


const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;
  // console.log(chalk.blueBright.bold(`Express is working on port ${port}`));
});


// Routes
const usersRouter = require('./routes/usersSystem');
const usersDetailsRouter = require("./routes/userDetailsSystem");
const categoryRouter = require('./routes/categoriesSystem');
const productRouter = require("./routes/productsSystem");

app.use('/users', usersRouter);
app.use("/users_details", usersDetailsRouter);
app.use('/categories', categoryRouter)
app.use("/products", productRouter);



module.exports = app;
