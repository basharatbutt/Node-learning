const express = require("express");
const multer = require("multer"); // 1. Import Multer
const path = require("path");
const app = express();                            

// 2. Setup where files should be saved
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Make sure this folder exists!
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid duplicates
    }
});

const upload = multer({
     storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    });

// Fixed typo: extended instead of extrended
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public")); // To serve uploaded files

app.get("/", (req, res) => {
    res.render("myform");
});

// 3. The Upload Route
// 'myMedia' must match the 'name' attribute in your ejs file
app.post("/upload", upload.single("myMedia"), (req, res) => {
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).send(error.message);
    } else {
        next();
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
    cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});