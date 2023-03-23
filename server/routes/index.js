const express = require('express');
const router = express.Router();

const questionRoutes = require('./QuestionRoutes');
const answerRoutes = require('./AnswerRoutes');

router.get('/', (req, res) => {
    res.send('Wellcome to the server');
});

router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);

module.exports = router;