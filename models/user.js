const { mongoose } = require("mongoose");
const { createHmac, randomBytes } = require("crypto"); //Bulit Package
const { createTokenForUser } = require("../services/auth");
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    profileImageURL: {
      type: String,
      default: "../Images/UserAvatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", function (next) {
  const user = this; // This is point to the current instance of the user

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  // const salt = "testingValue";
  // salt is a random string
  //sha256 is a hashing algorithm
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next();
});

//Mongo Virtual Function
UserSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const salt = user.salt;
    const hashPassword = user.password;

    const userProvidedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (hashPassword !== userProvidedPassword) {
      throw new Error("Incorrect password");
    }
    const token = createTokenForUser(user);
    return token;
  },
);
const User = mongoose.model("user", UserSchema);

module.exports = User;
