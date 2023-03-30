const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    description: String,
    imageUrl: String,
    category: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: Object
});

module.exports = mongoose.model('questions', QuestionSchema);
