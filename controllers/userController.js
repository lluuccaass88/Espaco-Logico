const express = require('express');
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json")
const User = require("../models/User");

const userService = require("../service/userService")


const router = express.Router();

//npetodo que retorna um JWT
function tokenGeneration(params = {}){
  //Cria o JWT  
  return jwt.sign(
        params, 
        authConfig.secret, 
      {
        expiresIn: 86400,
      }
    )
}


//router register
router.post("/register", async (req, res) => {
  const { user_email } = req.body;

  console.log("Start Register")

  try {
    if (await User.findOne({ user_email })){
      console.log("Error - User already registered")
      return res.status(400).send({ error: "Este email já esta registrado" });
    }
      //lucaspalkhves8@gmail.com
    const user = await User.create(req.body);

    user.user_secret_key = undefined;

    console.log("Register Success")

    return res.send({ user, token: tokenGeneration({ id: user.id }) });
  } catch (error) {
    console.log("Erro - Register Fail " + error)
    return res.status(400).send({error: "Erro inesperado"});
  }

});

//router autenticate
router.post("/authenticate", async (req, res) => {
    console.log("Autentication start")

    const { user_email, user_secret_key } = req.body

    const user = await User.findOne({ user_email }).select("+user_secret_key");
  
    if (!user){
      console.log("Email não encontrado")
      return res.status(400).send({ Error: "Email não encontrado" }); 
    }
      
    //Verifica se a senha digitada pelo o usuário esta correta
    if (!(await bcrypt.compare(user_secret_key, user.user_secret_key))){
      //Retorna erro caso não esteja
      return res.status(400).send({ error: 'Senha não encontrada' });
   }
    user.user_secret_key = undefined; 

   console.log("deu certo")
    res.status(201).send({ user, token: tokenGeneration({ id: user.id, role: user.user_role }) });
});

router.post("/nextLevel", async (req, res) => {
  console.log("nextLevel")
  try{
    const { user_id } = req.body
    let userId = jwt.decode(user_id).id
    const response = await userService.nextLevel(userId)

    res.status(201).send(response);
  }catch(error){
    console.log("Erro - update level fail " + error)
    return res.status(400).send({error: "Erro ao atualizar level do usuário."});
  }


});

module.exports = app => app.use("/user", router);