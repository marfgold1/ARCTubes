import { Router } from 'express';
import Question from '../models/question.model.js';

const router = Router();

const mode = [
    {
        label: "Santuy (5 Pertanyaan, 1 Menit)",
        question: 5,
        time: 1,
        value: 0
    },
    {
        label: "Manusia (10 Pertanyaan, 3 Menit)",
        question: 10,
        time: 3,
        value: 1
    },
    {
        label: "Big bren (15 Pertanyaan, 5 menit)",
        question: 15,
        time: 5,
        value: 2
    },
    {
        label: "Keos (20 Pertanyaan, 5 menit)",
        question: 20,
        time: 5,
        value: 3
    },
    {
        label: "SPEEDORUNN (20 Pertanyaan, 2 menit)",
        question: 20,
        time: 2,
        value: 3
    }
]

router.get("/", function(req, res, next){
    res.render("home.ejs", {mode: mode});
});

router.get("/play", async(req, res, next) => {
    if (req.query.hasOwnProperty("mode")){
        const playmode = mode.find(e => e.value == req.query.mode);
        if (playmode == undefined)
            res.redirect("/");
        const data = await Question.aggregate().sample(5).exec();
        res.render("play.ejs", {data: data, mode: playmode});
    } else
        res.redirect("/");
});

export default router;
