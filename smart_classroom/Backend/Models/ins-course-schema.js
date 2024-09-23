import mongoose from "mongoose";

const module_schema = new mongoose.Schema({
    module_id: String,
    module_title: String,
    module_description: String,
    content_type: String,
    module_data:[String]
})

const course_schema = new mongoose.Schema({
    course_id: String,
    course_title: String,
    course_description: String,
    course_category: String,
    course_duration: Number,
    course_details: [module_schema]
})

export const course = mongoose.model('course', course_schema)