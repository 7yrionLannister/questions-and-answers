const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    description: String,
    imageUrl: String,
    category: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answers"
    }]
});

module.exports = mongoose.model('Questions', QuestionSchema);