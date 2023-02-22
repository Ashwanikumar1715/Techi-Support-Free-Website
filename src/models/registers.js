const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginSchema=new mongoose.Schema({
    fullname: {
     type:String,
     required:true
    },
    email: {
        type:String,
        required:true,
        unique:true 
    },
    psame: {
        type:String,
        required:true,
    },
    cpsame: {
        type:String,
        required:true,
    }
})

// generating token 

// loginSchema.methods.generateAutoToken = async function(){
//     try{
//      const token = jwt.sign({_id:this._id.toString()},"mynameisbrijeshsinghiamalsoayoutuber");
//      this.tokens = this.tokens.concat({token:token});
//      await this.save();
//         console.log("token is"+token)
//      return token;

 
//     }catch(error){
//       res.send("this is the error part" + error);
//       console.log("this is the error part" + error);
//     }
// }



// hashing the password
loginSchema.pre("save", async function(next){
    if(this.isModified("psame")){
        // const passwordHash = await bcrypt.hash(password , 10); 
        // console.log(`the current password is ${this.password}`);
        this.psame = await bcrypt.hash(this.psame , 10);
        this.cpsame = await bcrypt.hash(this.cpsame , 10);
        // console.log(`the current password is ${this.password}`);
        // this.confirmpassword = undefined;
    }
     console.log("hello");
    next();
})

// now we need to create a collection

const Register = new mongoose.model("Register",loginSchema)

module.exports=Register;