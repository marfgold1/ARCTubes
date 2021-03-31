import mongoose from 'mongoose';
const { model, Schema } = mongoose;

export default model("Questions", new Schema({
    slug: { type: String, unique: true, index: true, required: true,
        validate: {
            validator: function(v) {
                const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
                return regex.test(v)
            },
            message: "Invalid slug."
        } },
    soal: { type: String, required: true },
    jawaban_benar: { type: String, required: true },
    jawaban_salah_1: { type: String, required: true },
    jawaban_salah_2: { type: String, required: true },
    jawaban_salah_3: { type: String, required: true }
}, { timestamps: true }));
