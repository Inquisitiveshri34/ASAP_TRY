import {User} from "../models/user.model.js"

const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        if (!name||!email||!password){
            return res.status(400).send("All fields are required")
        }
        const existedUser = await User.findOne({$or : [{name}, {email}]})
        if (existedUser){
            return res.status(400).send("User pre-exists")
        }
        const user = await User.create({
            name,email,password
        })
        const createdUser = await User.findOne({$or : [{name}, {email}]})
        res.status(200).send(createdUser)
    }catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

const loginUser = async(req,res)=>{
    try{
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}

export {registerUser}