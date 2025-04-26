import express from "express";
import ejs from "ejs";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { uploadFile } from "./middlewares/multer.middleware.js";
import { json } from "stream/consumers";


dotenv.config();

const app = express();
const port = process.env.PORT;

// configrations
app.set("view engine", "ejs");
app.set(path.resolve("/views"));
app.use("/public", express.static("public"));

// middle wares
app.use(express.json());

// routes
app.route("/").get((req, res) => {
  res.render("frontend");
});
app.route("/create").get((req, res) => {
  res.render("create");
});

app.route("/create").post(uploadFile.single("logo"), (req, res) => {
  try {
    if (!req.body.data) {
      const err = new Error("data required");
      err.status = 400;
      throw err;
    }
    console.log("test 1 passed");

    // ✅ req.body.data is a string like '{"website":"dff",...}'
    console.log(req.body.data)
    let parsedData = JSON.parse(req.body.data) // 🔥 Important
    parsedData['Image']  =   req.file.originalname
    console.log('test 2 passed');
    const db_file = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));

    const randomString = Math.random().toString(36).substring(2, 10);
    console.log('test 3 passed');
    // ✅ Store as real object, not string
    const newEntry = {
      [randomString]: parsedData
    };

    db_file.push(newEntry);
    console.log('test 4 passed');
    fs.writeFileSync("db/db.json", JSON.stringify(db_file, null, 3));

    console.log("✅ Saved Entry:", newEntry);

    res.json({ message: "ho gya bhaaiiiiii!!!!!!!" });

  } catch (error) {
    console.log("❌ Error:", error.message);
    console.log(error)
    res.status(error.status || 500).json({
      data: false,
      error: error.message
    });
  }
});


app.route("/getData").get((req , res)=>{
  const db_file = fs.readFileSync("db/db.json", "utf-8");
  res.status(200).json({
    error:false,
    data:db_file
  })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});