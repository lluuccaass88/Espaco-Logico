const dbMongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const mongoose = dbMongoose.mongoose;


const UserSchema = new mongoose.Schema({
    user_email:{ //email
        type: String,
        required: true,
        unique: true,
    },
    user_secret_key: {//password
        type: String,
        required: true,
        select: false
    },
    user_role: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    current_level: {
        type: Number,
        required: false,
        default: 1
    },
})

//Cria moddleware
UserSchema.pre("save", async function(next) {
    //Geração do hash com o bcrypt
    const hash = await bcrypt.hash(this.user_secret_key, 10);
    //Atribui o valor do hash para a vriável da senha
    this.user_secret_key = hash;
    //Permite que a execução continue
    next();
  });

const User = mongoose.model('User', UserSchema);

module.exports = User