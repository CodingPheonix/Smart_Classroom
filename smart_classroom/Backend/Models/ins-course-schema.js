import mongoose from "mongoose";

const course_schema = new mongoose.Schema({
    course_id: String,
    course_title: String,
    course_description: String,
    course_category: String,
    course_duration: Number,
})

export const course = mongoose.model('course', course_schema)