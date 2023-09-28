import express from "express";
import ejs from "ejs";
import emailjs from '@emailjs/nodejs';
import fs from "fs"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
let contactInfo;

app.use(express.static("public"));
app.use(express.json());

// EmailJS Init

emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC,
  privateKey: process.env.EMAILJS_PRIVATE
});

// Static JSON Files

const staticJSON = {
  councilMembers: JSON.parse(fs.readFileSync('public/json/council.json')),
  eventsList: JSON.parse(fs.readFileSync('public/json/events.json'))
}

// Navigation Links GET

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/hakkimizda", (req, res) => {
  res.render("hakkimizda.ejs", {
    titleClass: "bi-info-circle-fill",
    titleText: "Hakkımızda",
    council: staticJSON.councilMembers
  });
});

app.get("/ne-yapiyoruz", (req, res) => {
  res.render("ne-yapiyoruz.ejs", {
    titleClass: "bi-emoji-heart-eyes-fill",
    titleText: "Ne Yapıyoruz?",
    eventsList: staticJSON.eventsList
  });
});

app.get("/oyunlarimiz", (req, res) => {
  res.render("oyunlarimiz.ejs", {
    titleClass: "bi-joystick",
    titleText: "Oyunlarımız",
  });
});

app.get("/arsiv", (req, res) => {
  res.render("arsiv.ejs", {
    titleClass: "bi-archive-fill",
    titleText: "Arşiv",
  });
});

// Contact Form POST

app.post("/contactFetch", (req, res) => {
  contactInfo = req.body;
})

app.post("/contact", (req, res) => {
  emailjs.send("service_llmrj1b", "template_bqo382e", contactInfo).then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    res.redirect(req.originalUrl);
  }, function(err) {
    console.log('FAILED...', err);
  });
});


// Port Listen

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});