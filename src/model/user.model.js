import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    authId: {
      type: String,
      require: true,
      unique: true,
    },
    applyJob: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    saveJob: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
    },
    bio: {
      type: String,
      default: "No bio provide",
    },
    profession: {
      type: String,
      default: "Unemployed",
    },
  },
  { timestamps: true }
);


// password hash
userSchema.pre('save' ,async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 10);
    next()
})

// password check
userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password ,this.password)
}


const userModel = mongoose.model("User", userSchema);

export default userModel;
