import express from "express";
import ejs from "ejs";
import emailjs from '@emailjs/nodejs';
import fs from "fs"
import dotenv from 'dotenv';
import { getPostTable, getGalleryImages } from "./database.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.static("public"));
app.use(express.json());
let contactInfo;

// EmailJS Init

emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC,
  privateKey: process.env.EMAILJS_PRIVATE
});

// MySQL Database and JSON Data Fetch 

const JSONData = {
  councilMembers: JSON.parse(fs.readFileSync('public/json/hakkimizda.json')),
  eventsList: JSON.parse(fs.readFileSync('public/json/ne_yapiyoruz.json'))
}

const dbData = { 
  postTable: await getPostTable(7),
  galleryTable: await getGalleryImages()
}

// Navigation Links GET

app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: dbData.postTable
  });
});

app.get("/hakkimizda", (req, res) => {
  res.render("hakkimizda.ejs", {
    titleClass: "bi-info-circle-fill",
    titleText: "Hakkımızda",
    council: JSONData.councilMembers
  });
});

app.get("/ne-yapiyoruz", (req, res) => {
  res.render("ne-yapiyoruz.ejs", {
    titleClass: "bi-emoji-heart-eyes-fill",
    titleText: "Ne Yapıyoruz?",
    eventsList: JSONData.eventsList
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
    images: dbData.galleryTable
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