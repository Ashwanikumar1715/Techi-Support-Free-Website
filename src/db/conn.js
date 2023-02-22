const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://brijesh122004:TechiSupport@cluster0.lu1818j.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log("connection successful!!");
}).catch((e)=>{
    console.log("no connection");
})