import mongoose from "mongoose";

const module_schema = new mongoose.Schema({
    module_id: String,
    module_title: String,
    module_description: String,
    content_type: String,
    module_data: [String]
})

const course_schema = new mongoose.Schema({
    course_id: String,
    instructor_id: String,
    course_title: String,
    course_description: String,
    course_category: String,
    course_duration: Number,
    course_details: [module_schema]
})

const theory = new mongoose.Schema({
    theory_heading: String,
    theory_explanation: String,
})

const module_data_schema = new mongoose.Schema({
    module_id: String,
    module_title: String,
    content_type: String,
    module_theory: [theory],
    module_attachments: [String]
})

const questions = new mongoose.Schema({
    question_title: String,
    options: [String],
    correct_option: String
})

const quiz_data_schema = new mongoose.Schema({
    module_id: String,
    module_title: String,
    content_type: String,
    quiz: [questions]
})

const learner_module_schema = new mongoose.Schema({
    module_id: String,
    module_title: String,
    module_description: String,
    content_type: String,
    module_data: [String]
})

const learner_course_schema = new mongoose.Schema({
    course_id: String,
    course_title: String,
    course_description: String,
    course_category: String,
    course_duration: Number,
    course_details: [learner_module_schema]
})

const dashboard = new mongoose.Schema({
    student_id: { type: String, required: true },
    module_id: { type: String, required: true },
    course_id: { type: String, required: true },
    quiz_result: { type: [String], required: true }, // Assuming quiz_result is stored as a Map
    quiz_score: { type: Number, required: true }
});

const login_schema = new mongoose.Schema({
    candidate_position: String,
    candidate_name: String,
    candidate_id: String,
    candidate_email: String,
    candidate_password: String,
})

export const course = mongoose.model('course', course_schema)
export const module_data = mongoose.model('module_data', module_data_schema)
export const quiz_data = mongoose.model('quiz_data', quiz_data_schema)
export const learner_course = mongoose.model('learner_course', learner_course_schema)
export const student_dashboard = mongoose.model('student_dashboard', dashboard)
export const login = mongoose.model('login', login_schema)