import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import { course } from "./Models/ins-course-schema.js"
import { module_data } from "./Models/ins-course-schema.js"
import { quiz_data } from "./Models/ins-course-schema.js"
import { learner_course } from "./Models/ins-course-schema.js"

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


//create module
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
app.get('/courses/course/module/:Course/:Module', async (req, res) => {
  try {
    const { Course, Module } = req.params
    const target_course = await course.findOne({ course_id: Course });

    if (!target_course) {
      return res.status(404).send({ success: false, message: 'Course not found' })
    }

    const target_module = target_course.course_details.find(module => module.module_id === Module)

    if (!target_module) {
      return res.status(404).send({ success: false, message: 'Module not found' })
    }

    res.json({ success: true, message: "Module fetched successfully", data: target_module })
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to fetch module', error: error.message });
  }
})

//post Module data(Theory) to db
app.post('/courses/course/setModule', async (req, res) => {
  try {
    console.log(req.body)
    const { moduleTitle, contentType, id } = req.body

    const new_module_data = new module_data({
      module_id: id,
      module_title: moduleTitle,
      content_type: contentType,
      module_theory: [],
      module_attachments: [],
    })

    console.log(new_module_data);
    await new_module_data.save()

    res.status(200).send({ message: "Default module values added successfully", data: new_module_data })

  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to post module data', error: error.message });
  }
})

//Modify module theory data
app.put('/courses/course/module/:Module', async (req, res) => {
  try {
    const { Module } = req.params;
    const target_module = await module_data.findOne({ module_id: Module });

    if (target_module) {
      target_module.module_theory = [];

      req.body.forEach(item => {
        const newTheory = {
          theory_heading: item.heading,
          theory_explanation: item.explanation
        };
        target_module.module_theory.push(newTheory);
      });

      await target_module.save();
      res.status(200).json({ message: 'Module theory updated successfully' });
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getparapagedata/:Module', async (req, res) => {
  try {
    const { Module } = req.params;
    console.log(Module);

    console.log(`Looking for module with ID: ${Module}`);
    const target_module = await module_data.findOne({ module_id: Module });
    console.log(target_module.module_theory)

    if (target_module) {
      res.status(200).send({ message: "Data required found", data: target_module.module_theory });
    } else {
      res.status(404).send({ success: false, message: "Module not found" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Post default data for quizes
app.post('/post_quiz_data', async (req, res) => {
  try {
    console.log(req.body)
    const { moduleTitle, contentType, id } = req.body
    const new_quiz = new quiz_data({
      module_id: id,
      module_title: moduleTitle,
      content_type: contentType,
      quiz: []
    })
    console.log(new_quiz)
    await new_quiz.save()
    res.status(200).send({ message: "Default quiz data uploaded", data: new_quiz })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Modify the quiz data on adding
app.put('/post_quiz_data/:Module', async (req, res) => {
  try {
    const { Module } = req.params;
    const target_module = await quiz_data.findOne({ module_id: Module });

    if (target_module) {
      target_module.quiz = [];

      req.body.forEach(ques => {
        const newQuestion = {
          correct_option: ques.correctAnswer,
          question_title: ques.question,
          options: ques.options
        };

        target_module.quiz.push(newQuestion);
      });

      await target_module.save();
      res.status(200).json({ message: 'Quiz updated successfully!' });
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/get_quiz_data/:Module', async (req, res) => {
  try {
    const { Module } = req.params
    const target_quiz_data = await quiz_data.findOne({ module_id: Module });
    if (target_quiz_data) {
      res.status(200).send({ message: "quiz data fetched successfully", data: target_quiz_data.quiz })
    } else {
      res.status(404).json({ message: 'quiz data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.put('/handle_delete_quiz/:Module', async (req, res) => {
  try {
    const { Module } = req.params
    const target_quiz_data = await quiz_data.findOne({ module_id: Module });
    if (target_quiz_data) {
      target_quiz_data.quiz = [];
      await target_quiz_data.save();
      res.status(200).json({ message: 'Quiz deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//Selected courses get into students courses inventory
app.post('/get_to_mycourses/:id', async(req, res) => {
  try {
    const  { id } = req.params
    const target_course = await course.findOne({ course_id: id });
    
    if (target_course) {
      const saved_course = new learner_course({
        course_id: target_course.course_id,
        course_title: target_course.course_title,
        course_description: target_course.course_description,
        course_category: target_course.course_category,
        course_duration: target_course.course_duration,
        course_details: target_course.course_details
      })
      await saved_course.save()
      res.status(200).send({message: "Course is saved"})
    }else {
      res.status(404).json({ message: 'target course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//get all courses for "My courses" in learner section
app.get('/getMyCourseList', async (req, res) =>{
  try {
    const  courses = await learner_course.find({})

    if (courses) {
      res.status(200).send({message: "Fetched all courses", data: courses})
    }else {
      res.status(404).json({ message: 'target course not found' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// delete course from "My courses" in learner section
app.delete('/delete_from_mycourses/:id', async (req, res) => {
  try {
    const { id } = req.params
    const course = await learner_course.findOneAndDelete({course_id: id})
    console.log(course)
    res.status(200).send({message:"Target course deleted"})
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//Fetch course for Learner
// app.get('/get_L_course_details/:Course', async (req, res) => {
//   try {
//     const target_course = await course.find({})
//   } catch (error) {
    
//   }
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
