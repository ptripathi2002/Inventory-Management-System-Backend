const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a Email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Enter a Valid Email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please Add a Password"],
      minLength: [6, "Password must be of atleast 6 Characters"],
      // maxLength: [23, "Passsword must be less than 23 Characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a Photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+91",
    },
    bio: {
      type: String,
      maxLength: [50, "Bio must not be of more than 50 Characters"],
      default: "Bio",
    },
  },
  {
    timestamps: true,
  }
);

//Encrypt Password before saving it to the Database

userSchema.pre("save", async function (next) {
  //Pre Means before it get saved in the database these changes will get executed
  if (!this.isModified("password")) {
    return next();
  }
  //Hash Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
