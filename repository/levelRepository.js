const Level = require("../models/level")

async function save(instructionList){
    try{
        const level = await Level.create(instructionList);
        return level
    }catch(error){
        console.log("Erro - Register Fail: " + error)
        return res.status(400).send({error: "Erro inesperado ao salvar no banco de dados"});
    }
}
  
  async function getById(userId) {
    try {
      const registros = await Level.find({ seq_id: userId });
      return registros
    } catch (error) {
      console.error("Erro - Falha ao buscar: ", error);
      throw new Error("Erro inesperado ao buscar no banco de dados");
    }
  }

module.exports = {
    getById,
    save
  };