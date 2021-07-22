const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealSchema = new Schema({
    value: {
        type: Number,
    },
    wonTime: {
        type: Date
    }
});


const Deal = mongoose.model('deal',DealSchema);

module.exports = Deal;