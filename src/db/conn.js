const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://ashwanik:ashwanik@cluster0.bv4iv1x.mongodb.net/TechiSupport?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log("connection successful!!");
}).catch((e)=>{
    console.log("no connection");
})
