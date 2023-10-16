const dbMongoose = require('mongoose');

const mongoose = dbMongoose.mongoose;

const LevelSchema = new mongoose.Schema({
    seq_id:{ 
        type: Number,
        required: true,
        unique: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: [],
})

const Level = mongoose.model('Level', LevelSchema);

module.exports = Level