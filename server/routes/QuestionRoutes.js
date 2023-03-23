const express = require('express');
const router = express.Router();

const questionDB = require('../models/QuestionModel');

router.route("/")
    .post(async (req, res) => {
        try {
            await questionDB.create({
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                user: req.body.user
            }).then(() => {
                res.status(201).send({
                    status: true,
                    message: 'Question added successfully'
                });
            }).catch(err => {
                res.status(500).send({
                    status: false,
                    message: 'Question could not be added'
                });
            });
        } catch(err) {
            res.status(500).send({
                status: false,
                message: 'Server error while adding question'
            });
        }
    })
    .get(async (req, res) => {
        try {
            let agg = questionDB.aggregate();
            let category = req.query.category;
            if(category) {
                agg.match({
                    category
                });
            }
            await agg.lookup({
                    from: 'Answers',
                    localField: '_id',
                    foreignField: 'questionId',
                    as: 'allAnswers'
                })
                .exec()
                .then((doc) => {
                    res.status(200).send(doc);
                })
                .catch(err => {
                    res.status(500).send({
                        status: false,
                        message: 'Unable to get the questions'
                    });
                });
        } catch(err) {
            res.status(500).send({
                status: false,
                message: 'Server error while getting the questions'
            });
        }
    });

module.exports = router;