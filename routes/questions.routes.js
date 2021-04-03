import { Router } from 'express';
import Question from '../models/question.model.js';
import Multer from 'multer';

const router = Router();
const multer = Multer();

// kalo mau pass error, pake ini dulu baru dijadiin response
function getErrorData(err) {
    let error = {};
    if (err.name === "MongoError" && err.code === 11000)
        error["slug"] = "Slug is not unique, please change it to another value";
    else {
        for (let errName in err.errors) {
            error[errName] = err.errors[errName].message;
        }
    }
    return error;
}

// CREATE (RANJABI)
// Create client interface
router.get("/manage/create", function(req, res, next) {
    res.render("create.ejs", { data: {} });
});
// Create server API
router.post("/manage/create", multer.none(), function(req, res, next) {
    const slug = req.params.slug;
    Question.create(req.body)
        .then(data => {
            res.status(204).json();
        })
        .catch(err => {
            res.status(400).json({ errors: getErrorData(err) });
        });
});

// READ (LIZA)
// List question
router.get("/manage", function(req, res, next) {
    Question.find()
        .then(datas => {
            res.render('manage.ejs', { datas: datas });
        })
        .catch(err => {
            console.error(err);
        });
});


// UPDATE (FIFI)
// Update client interface (tampilin form edit ke client)
router.get("/manage/edit/:slug", function(req, res, next) {
    const slug = req.params.slug;
    Question.findOne({ slug })
        .then(post => {
            if (post == null) {
                return res.sendStatus(404);
            }
            res.render("edit.ejs", { post: post });
        })
        .catch(err => {
            res.sendStatus(404);
        });

});
// Update API server (apply edit ke database via server)
router.put("/manage/edit/:slug", multer.none(), function(req, res, next) {
    const slug = req.params.slug;
    Question.updateOne({ slug }, {
            $set: {
                soal: req.body.soal,
                jawaban_benar: req.body.jawaban_benar,
                jawaban_salah_1: req.body.jawaban_salah_1,
                jawaban_salah_2: req.body.jawaban_salah_2,
                jawaban_salah_3: req.body.jawaban_salah_3

            }
        }, { runValidators: true })
        .then(data => {
            res.status(204).json();
        })
        .catch(err => {
            res.status(400).json({ errors: getErrorData(err) });
        });

});


// DELETE (FAZA)
// Delete API server
router.delete("/manage/delete/:slug", function(req, res, next) {
    const slug = req.params.slug;
    Question.deleteOne({ slug })
    .then(data => {
        res.status(204).json();
    })
    .catch(error => {res.sendStatus(500); console.error(error);})
});

export default router;
