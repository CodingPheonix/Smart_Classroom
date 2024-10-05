import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import { course } from "./Models/ins-course-schema.js"

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/classroom')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Fetch all courses
app.get('/courses/getCourses', async (req, res) => {
  try {
    const courses = await course.find({})
    res.send({ success: true, message: "Courses fetched successfully", data: courses })
  } catch (error) {
    res.send({ status: 'error', message: 'Failed to fetch courses', error: error.message });
  }
})

// Post a course
app.post('/courses/postCourses', async (req, res) => {
  try {
    if (!req.body || !req.body.id || !req.body.courseTitle) {
      return res.status(400).send({ success: false, message: "Missing required fields" });
    }

    console.log(req.body)
    const newcourse = new course({
      course_id: req.body.id,
      course_title: req.body.courseTitle,
      course_description: req.body.courseDescription,
      course_category: req.body.courseCategory,
      course_duration: req.body.courseDuration
    })
    console.log(newcourse)
    await newcourse.save()
    res.send({ success: true, message: "Course added successfully", data: newcourse })
  } catch (error) {
    res.send({ status: 'error', message: 'Failed to upload course', error: error.message });
  }
})

//Fetch each course
app.get('/courses/course/get-title/:slug', async (req, res) => {
  try {
    const courses = await course.findOne({ course_id: req.params.slug })
    res.send({ success: true, message: "Course title fetched successfully", data: courses })
  } catch (error) {
    res.send({ status: 'error', message: 'Failed to fetch course title', error: error.message });
  }
})

app.put('/courses/course/createModule/:slug', async (req, res) => {
  try {
    const courses = await course.findOne({ course_id: req.params.slug });
    if (!courses) {
      return res.status(404).send({ success: false, message: 'Course not found' });
    }

    const { id, moduleTitle, moduleDescription, contentType, videoUrl } = req.body;

    const newModule = {
      module_id: id,
      module_title: moduleTitle,
      module_description: moduleDescription,
      content_type: contentType,
      module_data: contentType === 'video' ? [videoUrl] : []
    };

    courses.course_details.push(newModule); // Add new module to the array

    const updated_course = await courses.save();

    res.json({ success: true, message: 'Course updated successfully', data: courses });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to update course', error: error.message });
  }
});

//Delete each course
app.put('/courses/course/deleteModule/:Course/:Module', async (req, res) => {
  const { Course, Module } = req.params;
  try {
    const target_course = await course.findOne({ course_id: Course });
    if (!target_course) {
      return res.status(404).send({ success: false, message: 'Course not found' })
    }
    target_course.course_details = target_course.course_details.filter(module => module.module_id !== Module);
    console.log(target_course.course_details);
    await target_course.save()
    res.json({ success: true, message: "module deleted successfully" })
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to delete module', error: error.message });
  }
})

//Get the details for indivisual module
app.get('/courses/course/module/:Course/:Module', async(req, res) => {
  try {
    const {Course, Module} = req.params
    const target_course = await course.findOne({ course_id: Course });

    if (!target_course) {
      return res.status(404).send({ success: false, message: 'Course not found' })
    }

    const target_module = target_course.course_details.find(module => module.module_id === Module)

    if (!target_module) {
      return res.status(404).send({ success: false, message: 'Module not found' })
    }

    res.json({success: true, message: "Module fetched successfully", data: target_module})
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to fetch module', error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
