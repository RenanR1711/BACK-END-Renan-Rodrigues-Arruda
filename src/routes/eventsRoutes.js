const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = `./upload/${req.params.id}`;
    req.photoId = uuidv4();
    fs.mkdirSync(directory, { recursive: true }); // Cria a pasta recursivamente se não existir
    cb(null, `./upload/${req.params.id}`);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    // let filename = path.basename(file.originalname, ext);
    // filename = filename.replace(/[^a-z0-9]+/gi, "-");
    cb(null, `${req.photoId}${ext}`);
  },
});
const upload = multer({ storage: storage });

router.post("/", eventsController.createEvent);
router.post("/search", eventsController.readEventByName);
router.get("/", eventsController.readAllEvent);
router.put("/:id", eventsController.updateEvent);
router.delete("/:id", eventsController.deleteEvent);
router.post(
  "/upload-cover/:id",
  upload.single("cover"),
  eventsController.uploadCover
);

module.exports = router;
