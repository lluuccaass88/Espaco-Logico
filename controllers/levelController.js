const express = require('express');

const levelService = require('../service/levelService')
const router = express.Router();

router.post("/registerLevel", async (req, res) => {
    console.log("Start register new level")
    try {
      await levelService.save(req.body)
      return res.send(true)
    } catch (error) {
      console.log("Erro - Register level Fail " + error)
      return res.status(400).send({error: "Erro inesperado"});
    }
  });

  router.get("/getLevel/:id", async (req, res) => {
    try {
      let response = await levelService.getByUserId(req.params.id)
      return res.send(response)
    } catch (error) {
      console.log("Erro - Get Fail " + error)
      return res.status(400).send({error: "Erro inesperado"});
    }
  });

  module.exports = app => app.use("/level", router);
