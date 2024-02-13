require("dotenv").config();

const path = require("path");
const { DB_CONNECTION } = require("./Connection");
const cookieParser = require("cookie-parser");
const express = require("express");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const Blog = require("./models/blog");
const app = express();
const { checkForAuthenticationCookie } = require("./Middleware/authentication");
const URL =process.env.MONGO_URL;

const PORT = process.env.PORT || 8000;

DB_CONNECTION(URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("MongoDB ERROR ", error);
  });

//SSR
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

//Routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({})
  // .sort({ createdAt: -1 });
  res.render("Home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
