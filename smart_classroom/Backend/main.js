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

//Fetch title for each course
app.get('/courses/course/get-title/:slug', async (req, res) => {
  try {
    const courses = await course.findOne({course_id: req.params.slug})
    res.send({ success: true, message: "Course title fetched successfully", data: courses })
  } catch (error) {
    res.send({ status: 'error', message: 'Failed to fetch course title', error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
