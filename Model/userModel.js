const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchedPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
