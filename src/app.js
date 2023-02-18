const express=require('express');
const app=express();
const path = require("path")
const hbs = require('hbs');
require("./db/conn")
const Register=require("./models/registers");
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended:false}));
 
//getting paths and adding static and views files**
const staticPAth = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partial_path);

//to load static files
app.use(express.static(staticPAth));

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/courses", (req, res) => {
    res.render("courses");
})
app.get("/services", (req, res) => {
    res.render("services");
})
app.get("/dsa", (req, res) => {
    res.render("dsa");
})
app.get("/fullmernpro", (req, res) => {
    res.render("fullmernpro");
})
app.get("/htmlCssJavascript", (req, res) => {
    res.render("htmlCssJavascript");
})
app.get("/nodejs", (req, res) => {
    res.render("nodejs");
})
app.get("/projectscript", (req, res) => {
    res.render("projectscript");
})
app.get("/projectshtml", (req, res) => {
    res.render("projectshtml");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/projectshome", (req, res) => {
    res.render("projectshome");
})
app.get("/quiz", (req, res) => {
    res.render("quiz");
})
app.get("/notes", (req, res) => {
    res.render("notes");
})

app.post("/register",async(req,res)=>{
    try{
        const password=req.body.psame;
        const cpassword=req.body.cpsame;
        if(password===cpassword){
           const logininformation=new Register({
            fullname:req.body.username,
            email:req.body.usermail,
            password:password,
            confirmpassword:cpassword
           })
           const registered= await logininformation.save();
           res.status(201).render(login);
        }else{
            res.send("Invalid credential")
        }
    }catch(error){
        res.status(400).send(error);
    }
})


app.post("/login",async(req,res)=>{
    try{
      const email=req.body.email;
      const password=req.body.password;
      
const useremail= await Register.findOne({email:email})
if(useremail.password===password){
    res.status(201).send("success")
}else{
    res.send("invalid user credentials :(")
}
    }catch(error){
        res.port(400).send("invalid email/password")
    }
})

app.listen(4500,()=>{
    console.log("app is listenig at 4500");
})