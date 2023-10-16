const express = require('express');

const instructionService = require('../service/instructionService')
const router = express.Router();

router.post("/registerInstruction", async (req, res) => {
    console.log("Start RegisregisterInstructionter")
    try {
      await instructionService.save(req.body)
      return res.send(true)
    } catch (error) {
      console.log("Erro - Register Fail " + error)
      return res.status(400).send({error: "Erro inesperado"});
    }
  });

  router.post("/processInstruction", async (req, res) => {
    console.log("Start of instruction processing")
    try {
      let response = await instructionService.processingInstruction(req.body)
      return res.send(response)
    } catch (error) {
      console.log("Erro - Register Fail " + error)
      return res.status(400).send({error: "Erro inesperado"});
    }
  });

  router.post("/checkAlgorithm", async (req, res) => {
    console.log("Start of chack Algorithm")
    try {
      let response = await instructionService.checkAlgorithm(req.body.user_id, req.body.algorithm)
      return res.send(response)
    } catch (error) {
      console.log("Erro - Register Fail " + error)
      return res.status(400).send({error: "Erro inesperado"});
    }
  });

  router.get("/getInstructionByUserId", async (req, res) => {
    console.log("Start RegisregisterInstructionter")
    try {
      let response = await instructionService.getInstructionsByUserId(req.body)
      return res.send(response)
    } catch (error) {
      console.log("Erro - Get Fail " + error)
      return res.status(400).send({error: "Erro inesperado"});
    }
  });



  module.exports = app => app.use("/instruction", router);
