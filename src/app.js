const express = require('express');
var nodemailer = require('nodemailer');
const path = require("path")
const hbs = require('hbs');


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
require("./db/conn")
const Register = require("./models/registers");
const BASE_URL = process.env.BASE_URL
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//getting paths and adding static and views files**
const staticPAth = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partial_path);
app.use(express.static(staticPAth));
// cookie 
app.use(cookieParser());
//to load static files

app.get("/", (req, res) => {
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
// app.get("/quiz", (req, res) => {
//     res.render("QuizFile/Html1Quiz");
// })
app.get("/Htmlquiz1", (req, res) => {
    res.render("QuizFile/Html1Quiz");
})
app.get("/Htmlquiz2", (req, res) => {
    res.render("QuizFile/Html2Quiz");
})
app.get("/Htmlquiz3", (req, res) => {
    res.render("QuizFile/Html3Quiz");
})
app.get("/notes", (req, res) => {
    res.render("notes");
})
app.get("/javascript", (req, res) => {
    res.render("javascript");
})
app.get("*", (req, res) => {
    res.render("pagenotfound");
})
app.post("/register", async (req, res) => {
    try {
        const psame = req.body.psame;
        const cpsame = req.body.cpsame;
        console.log(psame);
        if (psame === cpsame) {
            const logininformation = new Register({
                fullname: req.body.username,
                email: req.body.usermail,
                psame: psame,
                cpsame: cpsame
            })
            console.log(cpsame);

            // const token = await logininformation.generateAutoToken();
            // console.log(token);
        
            
          

            const registered = await logininformation.save();
            res.status(201).render("login");
        } else {
            res.send("Invalid credential")
        }
    } catch (error) {
        // console.log("hello");
        res.status(400).send(error);
    }
})


app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email })
        const isMatch =await bcrypt.compare(password , useremail.psame);

        // middle ware
        // const token = await userEmail.generateAutoToken();
        // console.log("token part"+ token);
        if(isMatch){
            res.status(201).render("index");
        }else {
            res.send("invalid user credentials :(")
        }
    } catch (error) {
        res.status(400).send("invalid email/password")
    }
})


app.get("/send", (req, res) => {
let email = req.query.mail;
let addtional = req.query.addtional;
const mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});
mail.sendMail({
    from: process.env.email,
    to: email,
    subject: 'Feedback',
    html: "Thanks for your feedback <br>" + addtional
}, (err) => {
    if (err) throw err;
    res.send('Thanks For your feed back')


})
})

app.listen(4500, () => {
    console.log("app is listenig at 4500");
})
