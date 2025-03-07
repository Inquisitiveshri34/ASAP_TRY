import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({   
        id: this._id,
        name: this.name,
        email:this.email,
    }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
  };

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({   
        id: this._id,
        name: this.name,
        email:this.email,
    }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };

const User = mongoose.model("User",userSchema)

export {User}
