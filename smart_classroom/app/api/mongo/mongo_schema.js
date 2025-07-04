import mongoose from "mongoose";
import { type } from "os";

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

const attachments = new mongoose.Schema({
    name: String,
    url: String,
    type: String
})

const module_data_schema = new mongoose.Schema({
    module_id: String,
    module_title: String,
    content_type: String,
    completed: Boolean,
    module_theory: [theory],
    module_attachments: [attachments]
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
    completed: Boolean,
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
    content_type: {type: String, required: true},
    quiz_result: { type: [String], required: true }, 
    quiz_score: { type: Number, required: true },
    total_score: { type: Number, required: true },
    time_taken: {type: String, required: true},
    is_complete: { type: Boolean, required: true },
    most_recent: { type: Boolean, required: true},
});

const login_schema = new mongoose.Schema({
    candidate_position: String,
    candidate_name: String,
    candidate_id: String,

    candidate_ename: String,
    candidate_dob: String,
    candidate_age: Number,
    candidate_address: String,
    candidate_phone: String,

    candidate_title: String,
    candidate_department: String,
    candidate_about: String,
    candidate_certifications: [String],

    candidate_email: String,
    candidate_password: String,
    candidate_imageURL: String,
    candidate_courses: [String],
})

const notice = new mongoose.Schema({
    heading: String,
    description: String,
})

const notices = new mongoose.Schema({
    instructor_id: String,
    notices: [notice]
})

const current_user = new mongoose.Schema({
    user_id: String,
    position: String,
})

// ...existing schema definitions...

export const course = mongoose.models.course || mongoose.model('course', course_schema);
export const module_data = mongoose.models.module_data || mongoose.model('module_data', module_data_schema);
export const quiz_data = mongoose.models.quiz_data || mongoose.model('quiz_data', quiz_data_schema);
export const learner_course = mongoose.models.learner_course || mongoose.model('learner_course', learner_course_schema);
export const student_dashboard = mongoose.models.student_dashboard || mongoose.model('student_dashboard', dashboard);
export const login = mongoose.models.login || mongoose.model('login', login_schema);
export const notice_data = mongoose.models.notice_data || mongoose.model('notice_data', notices);
export const user = mongoose.models.user || mongoose.model('user', current_user);