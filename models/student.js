const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const StudentSchema = new Schema({
    value: {
        type: Number,
    },
    wonTime: {
        type: Date
    }
});


const Student = mongoose.model('student',StudentSchema);

module.exports = Student;