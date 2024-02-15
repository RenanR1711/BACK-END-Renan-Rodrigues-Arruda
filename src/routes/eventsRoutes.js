const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.post("/", eventsController.createEvent);
router.post("/search", eventsController.readEventByName);
router.get("/", eventsController.readAllEvent);
router.put("/:id", eventsController.updateEvent);
router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
