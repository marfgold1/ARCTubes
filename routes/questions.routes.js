import { Router } from 'express';
import Question from '../models/question.model.js';
import Multer from 'multer';

const router = Router();
const multer = Multer();

// kalo mau pass error, pake ini dulu baru dijadiin response
function getErrorData(err){
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
router.get("/manage/new", function(req, res, next){
    // res.render("create.ejs", { data: {} });
});
// Create server API
router.post("/manage/create", multer.none(), function(req, res, next){
    // buat response, pastiin utk sukses, return status 204 dan json kosong. kalo error, return status 400 dan json key "errors" yang isinya getErrorData(err)
    // sebagai referensi:
    /* Post.create(req.body)
    .then(data => {
        res.status(204).json();
    })
    .catch(err => {
        res.status(400).json({ errors:getErrorData(err) }); 
    });*/
});

// READ (LIZA)
// List question
router.get("/manage", function(req, res, next){
    /* UNTUK REFERENSI, JANGAN LANGSUNG COPAS!! ngertiin dulu kodenya hehe terus sesuaikan oke?
    Post.find()
    .then(posts => {
        res.render('index.ejs', {posts: posts});
    })
    .catch(err => {
        console.error(err);
    });
    */
});

// UPDATE (FIFI)
// Update client interface (tampilin form edit ke client)
router.get("/manage/edit/:slug", function(req, res, next){
    /* UNTUK REFERENSI, JANGAN LANGSUNG COPAS!! ngertiin dulu kodenya hehe terus sesuaikan oke?
    const slug = req.params.slug;
    Post.findOne({ slug })
    .then(post => {
        if (post == null) {
            return res.sendStatus(404);
        }
        res.render("edit.ejs", { post: post });
    })
    .catch(err => {
        res.sendStatus(404);
    });
    */
});
// Update API server (apply edit ke database via server)
router.put("/manage/edit/:slug", multer.none(), function(req, res, next){
    // buat response, pastiin utk sukses, return status 204 dan json kosong. kalo error, return status 400 dan json key "errors" yang isinya getErrorData(err)
    // sebagai referensi:
    /*
    const slug = req.params.slug;
    Post.updateOne({ slug },
        {
            $set: {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content
            }
        }, {runValidators: true})
    .then(data => {
        res.status(204).json();
    })
    .catch(err => {
        res.status(400).json({ errors:getErrorData(err) });
    });
    */
});


// DELETE (FAZA)
// Delete API server
router.delete("/manage/delete/:slug", function(req, res, next){
    /* UNTUK REFERENSI, JANGAN LANGSUNG COPAS!! ngertiin dulu kodenya hehe terus sesuaikan oke?
    const slug = req.params.slug;
    Post.deleteOne({ slug })
    .then(data => {
        res.status(204).json();
    })
    .catch(error => {res.sendStatus(500); console.error(error);})
    */
});

export default router;
