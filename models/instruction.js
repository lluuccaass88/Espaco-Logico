const dbMongoose = require('mongoose');

const mongoose = dbMongoose.mongoose;

const InstructionSchema = new mongoose.Schema({
    type:{ 
        type: String,
        required: true,
        unique: false,
    },
    positionX: Number,
    positionY: Number,
    idInstruction: Number,
    previous: Number,
    userId: String,
    idInstruction: String,
    newVariable: {
        name: String, 
        value: String,
        required: false,
    },
    variableHandler: {
        name: String,
        manipulation: Number,
        value: Number,
        linkedInstructionId: Number
    },
    paint:{
        valX: Number,
        valY: Number
    },
    ifC:{
        valX: String,
        valY: String,
        condition: String,
        quantityInstructions: Number,
        instructions: [mongoose.Schema.Types.Mixed]
    },
    forC:{
        valX: String,
        valY: String,
        condition: String,
        quantityInstructions: Number,
        instructions: [mongoose.Schema.Types.Mixed]
    }
})


const Instruction = mongoose.model('Instruction', InstructionSchema);

module.exports = Instruction