import express from "express";
import ejs from "ejs";

const app = express();
const port = 3000;
app.use(express.static("public"));

// NAVIGATION LINKS

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/hakkimizda", (req, res) => {
  res.render("hakkimizda.ejs", {
    titleClass: "bi-info-circle-fill",
    titleText: "Hakkımızda",
  });
});

app.get("/ne-yapiyoruz", (req, res) => {
  res.render("ne-yapiyoruz.ejs", {
    titleClass: "bi-emoji-heart-eyes-fill",
    titleText: "Ne Yapıyoruz?",
  });
});

app.get("/oyunlarimiz", (req, res) => {
  res.render("oyunlarimiz.ejs", {
    titleClass: "bi-joystick",
    titleText: "Oyunlarımız",
  });
});

// app.get("/loncalar", (req, res) => {
//   res.render("loncalar.ejs", {
//     titleClass: "bi-lightning-charge-fill",
//     titleText: "Loncalar",
//   });
// });

// app.get("/makalelerimiz", (req, res) => {
//   res.render("makalelerimiz.ejs", {
//     titleClass: "bi-newspaper",
//     titleText: "Makalelerimiz",
//   });
// });

app.get("/arsiv", (req, res) => {
  res.render("arsiv.ejs", {
    titleClass: "bi-archive-fill",
    titleText: "Arşiv",
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});