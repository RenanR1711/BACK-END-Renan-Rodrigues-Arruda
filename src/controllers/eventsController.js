const Event = require("../models/eventsModels");

async function createEvent(req, res) {
  const eventBody = req.body;
  const { eventName, dateEvent, location } = req.body;
  try {
    const newEvent = new Event({
      eventName: eventName,
      dateEvent: dateEvent,
      location: location,
    });
    await newEvent.save();
    res.status(400).send({ menssage: "eventos criado com sucesso!" });
  } catch (error) {
    res.send({ menssage: "deu pau no evento!" });
  }
}
async function readAllEvent(req, res) {
  try {
    const listEvents = await Event.find();
    res.send({ date: listEvents });
  } catch (error) {
    console.log(error);
    res.send({ menssage: "deu pau na lista dos eventos!" });
  }
}
async function readEventByName(req, res) {
  try {
    if (!req.body.eventName) {
      res.status(400).send({ message: "body obrigatorio" });
      return;
    }
    const listEvents = await Event.find();
    res.send({ date: listEvents });
  } catch (error) {
    console.log(error);
    res.send({ menssage: "deu pau na lista dos eventos!" });
  }
}
async function updateEvent(req, res) {
  try {
    console.log(req.params.id);
    const mongoPayload = {
      eventName: req.body.eventName,
      dateEvent: req.body.dateEvent,
      location: req.body.location,
    };
    const eventUpdated = await Event.findByIdAndUpdate(
      req.params.id,
      mongoPayload,
      { new: true }
    );
    console.log(eventUpdated);
    res.send({ message: "Evento atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Evento não encontrado!" });
  }
}
async function deleteEvent(req, res) {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {}
  res.send({ menssage: "eventos deletado com sucesso!" });
}

async function uploadCover(req, res, photoId) {
  try {
    console.log(req.photoId);

    const mongoPayload = {
      cover: req.photoId + ".jpg",
    };
    const coverUpload = await Event.findByIdAndUpdate(
      req.params.id,
      mongoPayload,
      { new: true }
    );
    console.log(coverUpload);
    res.status(200).send({ menssage: "upload efetuado!" });
  } catch (error) {}
}

module.exports = {
  createEvent,
  readAllEvent,
  updateEvent,
  deleteEvent,
  readEventByName,
  uploadCover,
};
