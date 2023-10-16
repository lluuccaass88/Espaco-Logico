const Instruction = require("../models/instruction")

async function save(instructionList){
    try{
        console.log("iniciando a inclusão")
        const instruction = await Instruction.create(instructionList);
        return instruction
    }catch(error){
        console.log("Erro - Register Fail: " + error)
        return res.status(400).send({error: "Erro inesperado ao salvar no banco de dados"});
    }
}

async function deleteByUserId(userId) {
    try {
      console.log("Iniciando exclusão da instrução pelo id do usuário");

      const resultado = await Instruction.deleteMany({ userId: userId });
  
      if (resultado.deletedCount === 1) {
        console.log("Documento excluído com sucesso");
        return { message: "Documento excluído com sucesso" };
      } else {
        console.log("Nenhum documento foi excluído");
        return { error: "Nenhum documento foi excluído" };
      }
    } catch (error) {
      console.error("Erro - Falha ao excluir por userId: " + error);
      throw new Error("Erro inesperado ao excluir no banco de dados");
    }
  }
  
  async function getRegistrosByUserId(userId) {
    try {
      console.log("Iniciando busca de registros por userId:", userId);
      const registros = await Instruction.find({ userId: userId.user_id });
      return registros
    } catch (error) {
      console.error("Erro - Falha ao buscar registros por userId:", error);
      throw new Error("Erro inesperado ao buscar no banco de dados");
    }
  }
  

module.exports = {
    deleteByUserId,
    save,
    getRegistrosByUserId
  };