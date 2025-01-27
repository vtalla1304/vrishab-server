const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    team: { type: String, required: true },
    age: { type: Number, required: true },
    goals: { type: Number, required: true }
});

module.exports = mongoose.model('Player', PlayerSchema);
