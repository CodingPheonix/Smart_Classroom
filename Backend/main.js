import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

import { course, login, user } from "./Models/ins-course-schema.js"
import { module_data } from "./Models/ins-course-schema.js"
import { quiz_data } from "./Models/ins-course-schema.js"
import { learner_course } from "./Models/ins-course-schema.js"
import { student_dashboard } from "./Models/ins-course-schema.js"
import { notice_data } from "./Models/ins-course-schema.js"
import { addTimes, add_all_durations } from "./operations.js"
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('THIS IS MY BACKEND FOR SMART CLASSROOM')
})

// Fetch all instructor courses
app.get('/courses/getCourses/:Instructor', async (req, res) => {
  try {
    const { Instructor } = req.params
    const courses = await course.find({ instructor_id: Instructor })
    res.send({ success: true, message: "Courses fetched successfully", data: courses })
  } catch (error) {
    res.send({ status: 'error', message: 'Failed to fetch courses', error: error.message });
  }
})

// Fetch all courses
app.get('/courses/getCourses', async (req, res) => {
  try {
    // const { Instructor } = req.params
    const courses = await course.find({})
    res.send({ success: true, message: "Courses fetched successfully", data: courses })
  } catch (error) {
    res.send({ status: 'error', message: 'Failed to fetch courses', error: error.message });
  }
})

// Post a course
app.post('/courses/postCourses', async (req, res) => {
  try {

    const { id, instructor_id, courseTitle, courseDescription, courseCategory, courseDuration } = req.body

    if (!req.body || !req.body.id || !req.body.courseTitle) {
      return res.status(400).send({ success: false, message: "Missing required fields" });
    }
    const newcourse = new course({
      course_id: id,
      instructor_id: instructor_id,
      course_title: courseTitle,
      course_description: courseDescription,
      course_category: courseCategory,
      course_duration: courseDuration
    })
    await newcourse.save()

    const target_user = await login.findOne({ candidate_id: instructor_id })
    if (target_user) {
      target_user.candidate_courses.push(id)
      await target_user.save()
    } else {
    }

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
// app.put('/courses/course/deleteModule/:Course/:Module', async (req, res) => {
//   const { Course, Module } = req.params;
//   try {
//     const target_course = await course.findOne({ course_id: Course });
//     if (!target_course) {
//       return res.status(404).send({ success: false, message: 'Course not found' })
//     }
//     console.log("target course = "+target_course)
//     const target_module = target_course.course_details.filter(module => module.module_id === Module)
//     console.log("target module = "+target_module)
//     if (target_module.contentType === 'Content') {
//       console.log("content data found")
//       await module_data.findOneAndDelete({module_id: target_module.module_id})
//     }else{
//       console.log("quiz data found")
//       await quiz_data.findOneAndDelete({module_id: target_module.module_id})
//     }

//     target_course.course_details = target_course.course_details.filter(module => module.module_id !== Module);
//     console.log(target_course.course_details);
//     await target_course.save()

//     res.json({ success: true, message: "module deleted successfully" })
//   } catch (error) {
//     res.status(500).send({ success: false, message: 'Failed to delete module', error: error.message });
//   }
// })

app.put('/courses/course/deleteModule/:Course/:Module', async (req, res) => {
  const { Course, Module } = req.params;
  try {
    // Find the target course
    const target_course = await course.findOne({ course_id: Course });
    if (!target_course) {
      return res.status(404).send({ success: false, message: 'Course not found' });
    }

    // Find the specific module in course_details
    const target_module = target_course.course_details.find(module => module.module_id === Module);
    if (!target_module) {
      return res.status(404).send({ success: false, message: 'Module not found in the course' });
    }
    // Check the content type and delete accordingly
    if (target_module.content_type === 'Content') {
      await module_data.findOneAndDelete({ module_id: target_module.module_id });
    } else {
      await quiz_data.findOneAndDelete({ module_id: target_module.module_id });
    }

    // Remove the module from course_details array
    target_course.course_details = target_course.course_details.filter(module => module.module_id !== Module);
    await target_course.save();

    res.json({ success: true, message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Failed to delete module', error: error.message });
  }
});


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
    const { moduleTitle, contentType, id } = req.body

    const new_module_data = new module_data({
      module_id: id,
      module_title: moduleTitle,
      content_type: contentType,
      module_theory: [],
      module_attachments: [],
    })

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
    const target_module = await module_data.findOne({ module_id: Module });

    if (target_module) {
      res.status(200).send({ message: "Data required found", data: target_module.module_theory });
    } else {
      res.status(404).send({ success: false, message: "Module not found" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/get_files/:Module', async (req, res) => {
  try {
    const { Module } = req.params;

    const target_module = await module_data.findOne({ module_id: Module });

    if (target_module) {
      res.status(200).send({ message: "Attachments required found", data: target_module.module_attachments });
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
    const { moduleTitle, contentType, id } = req.body
    const new_quiz = new quiz_data({
      module_id: id,
      module_title: moduleTitle,
      content_type: contentType,
      quiz: []
    })
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
app.post('/get_to_mycourses/:id/:learner_id', async (req, res) => {
  try {
    const { id, learner_id } = req.params
    const target_candidate = await login.findOne({ candidate_id: learner_id });

    // Add target course to Mycourses inventory
    if (target_candidate) {
      target_candidate.candidate_courses.push(id)
      await target_candidate.save()
      res.status(200).send({ message: "Course is saved" })
    } else {
      res.status(404).json({ message: 'target course not found' });
    }

    // Set up the student dashboard default settings
    const target_course = await course.findOne({ course_id: id })
    if (target_course) {
      if (target_course.course_details) {
        target_course.course_details.map(async (modules, index) => {
          const new_module = new student_dashboard({
            student_id: learner_id,
            module_id: modules.module_id,
            course_id: id,
            content_type: modules.content_type,
            quiz_result: [],
            quiz_score: 0,
            total_score: 0,
            is_complete: false,
            most_recent: false,
          });
          await new_module.save();
        })
        res.status(200).send({ message: "Successfully created default dashboard" })
      } else {
        res.send({ message: "Target Course details not found" })
      }
    } else {
      res.send({ message: "Target Course not found" })
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//get all courses for "My courses" in learner section
app.get('/getMyCourseList/:learner_id', async (req, res) => {
  try {
    const { learner_id } = req.params
    const candidate = await login.findOne({ candidate_id: learner_id })

    const mycourses_id = candidate.candidate_courses

    const mycourses = await Promise.all(
      mycourses_id.map(async (courseId) => {
        return await course.findOne({ course_id: courseId });
      })
    );

    if (mycourses) {
      res.status(200).send({ message: "Fetched all courses", data: mycourses })
    } else {
      res.status(404).json({ message: 'target course not found' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// delete course from "My courses" in learner section
app.delete('/delete_from_mycourses/:id/:user', async (req, res) => {
  try {
    const { id, user } = req.params;

    const target_user = await login.findOne({ candidate_id: user });
    if (!target_user) {
      return res.status(404).send({ message: "User not found" });
    }
    target_user.candidate_courses = target_user.candidate_courses.filter(courseId => courseId !== id);
    await target_user.save();

    const result = await student_dashboard.deleteMany({ student_id: user, course_id: id });

    res.status(200).send({ message: "Target course deleted and data from dashboard deleted" });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


//post student marks
app.put('/post_student_marks/:Course/:Module', async (req, res) => {
  try {
    const { Course, Module } = req.params;
    const { result, score, id, total, content_type } = req.body;

    const existing_data = await student_dashboard.findOne({ student_id: id, module_id: Module, course_id: Course })

    if (existing_data) {
      existing_data.quiz_result = result
      existing_data.quiz_score = score
      existing_data.total_score = result.length
      existing_data.is_complete = true
      existing_data.most_recent = true
      await existing_data.save()

      // Modify other quiz's most recent
      const all_data = await student_dashboard.find({ student_id: id, content_type: "quiz", course_id: Course });

      if (all_data) {
        const filtered_data = all_data.filter(data => data.module_id !== Module);

        for (const data of filtered_data) {
          data.most_recent = false;
          await data.save();
        }
      }


      res.status(200).send({ message: "Student result updated", data: existing_data });
    } else {
      // Create a new instance of the model
      const new_data = new student_dashboard({
        student_id: id,
        module_id: Module,
        course_id: Course,
        content_type: content_type,
        quiz_result: result, // Should match the schema (array or object)
        quiz_score: score, // Ensure score is a number in the schema
        total_score: total,
        is_complete: false,
        most_recent: true,
      });

      // Save the new instance and await the operation
      const savedData = await new_data.save();

      // Send the response with the saved document
      res.status(200).send({ message: "Student result uploaded", data: savedData });
    }

  } catch (error) {
    console.error("Error saving student data:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//post content data
app.post('/handle_content_data/:user/:Course/:Module', async (req, res) => {
  try {
    const { content_type, time_diff } = req.body
    const { user, Course, Module } = req.params

    const existing_data = await student_dashboard.findOne({ student_id: user, module_id: Module, course_id: Course })

    if (existing_data) {
      existing_data.is_complete = true
      existing_data.time_taken = addTimes(existing_data.time_taken, time_diff)
      await existing_data.save()

      res.status(200).send({ message: "Student result updated", data: existing_data });
    } else {
      const new_data = new student_dashboard({
        student_id: user,
        module_id: Module,
        course_id: Course,
        content_type: content_type, // Should match the schema (array or object)
        quiz_result: [], // Should match the schema (array or object)
        quiz_score: 0, // Ensure score is a number in the schema
        total_score: 0,
        time_taken: `${time_diff.split(":")[0]}:${time_diff.split(":")[1]}:${time_diff.split(":")[2]}`,
        is_complete: false,
        most_recent: false,
      });

      const savedData = await new_data.save();

      res.status(200).send({ message: "Content data uploaded", data: savedData });
    }
  } catch (error) {

  }
})

// Upload signup details
app.post('/upload_login_details', async (req, res) => {
  try {
    const { name, email, id, password, position } = req.body

    // Fetch the account by email
    const target_account = await login.findOne({ candidate_email: email });

    if (target_account) {
      res.send({ message: "Account already exists" })
    } else {
      const new_login = new login({
        candidate_name: name,
        candidate_id: id,
        candidate_email: email,
        candidate_password: password,
        candidate_position: position,
        candidate_courses: [],

        candidate_ename: "",
        candidate_dob: "",
        candidate_age: 0,
        candidate_address: "",
        candidate_phone: "",

        candidate_title: "",
        candidate_department: "",
        candidate_about: "",
        candidate_certifications: [],
      })

      await new_login.save()

      res.status(200).send({ message: "login details uploaded", data: new_login, status: "200" })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Verify user authentivation
app.post('/verify_user_auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch the account by email
    const target_account = await login.findOne({ candidate_email: email });

    if (!target_account) {
      res.status(404).send({ message: "Account not found", status: "500" });
    } else {
      // Compare passwords
      if (target_account.candidate_password !== password) {
        res.status(401).send({ message: "Incorrect Password", status: "500" });
      } else {
        res.status(200).send({ message: "Login successful", data: target_account, status: "200" });
      }
    }
  } catch (error) {
    console.error("Error verifying user authentication:", error); // Log the actual error
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get user details
app.get('/get_user_details/:Id', async (req, res) => {
  try {
    const { Id } = req.params
    const target_user = await login.findOne({ candidate_id: Id })
    if (target_user) {
      res.status(200).send({ message: "Fetched user details", data: target_user })
    } else {
      res.send({ message: "Required user not found" })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//get data for student dashboard activities
app.get('/get_activities/:student_id', async (req, res) => {
  try {
    const { student_id } = req.params;
    const data = await student_dashboard.find({ student_id: student_id, content_type: "quiz" });

    if (data && data.length > 0) {
      const result = await Promise.all(
        data.map(async (item) => {
          const target_module = await quiz_data.findOne({ module_id: item.module_id });
          const target_module_name = target_module ? target_module.module_title : 'Unknown Module';
          const target_quiz_data = item.quiz_score;
          return { name: target_module_name, data: target_quiz_data };
        })
      );

      res.status(200).json({ message: "Fetched student data successfully", data: result });
    } else {
      res.status(404).json({ message: "No data found for the student" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

//delete isntructor courses
app.delete('/delete_I_courses/:course_id', async (req, res) => {
  try {
    const { course_id } = req.params

    const target = await course.findOneAndDelete({ course_id: course_id })
    res.send({ message: "target course deleted" })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
})

//mark if a module is completed
app.post('/set_is_done/:user/:Module/:Course', async (req, res) => {
  try {
    const { user, Module, Course } = req.params
    const { is_done } = req.body

    const target_module = await student_dashboard.findOne({ student_id: user, module_id: Module, course_id: Course })
    if (target_module) {
      target_module.is_complete = is_done
      await target_module.save()
      res.send({ message: "Module marked as done", data: target_module })
    } else {
      res.status(404).json({ message: "No data found for the student" })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
})

//Fetch module mark status
app.get('/get_mark/:user/:Module', async (req, res) => {
  try {
    const { user, Module } = req.params;
    const target_module = await student_dashboard.findOne({ student_id: user, module_id: Module })
    if (target_module) {
      res.send({ message: "Module mark status fetched", data: target_module.is_complete })
    } else {
      res.status(404).json({ message: "No data found for the student" })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
})

//fetch student dashboard data from db
app.get('/fetch_student_dashboard_data/:id', async (req, res) => {
  try {
    const { id } = req.params

    const target_data = await student_dashboard.find({ student_id: id })
    if (target_data) {
      res.status(200).send({ message: "Student quiz data fetched", data: target_data })
    } else {
      res.status(404).json({ message: 'target data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.post('/send_notice/:user', async (req, res) => {
  try {
    const { user } = req.params;
    const updatedList = req.body;

    if (!Array.isArray(updatedList) || !updatedList.every(notice => notice.heading && notice.description)) {
      return res.status(400).json({ message: "Invalid format for updatedList" });
    }

    const target_notice = await notice_data.findOne({ instructor_id: user })
    if (target_notice) {
      target_notice.notices = updatedList
      await target_notice.save()
      res.status(200).send({ message: "Notice updated successfully", data: target_notice })
    } else {
      const data = new notice_data({
        instructor_id: user,
        notices: updatedList
      })
      await data.save();
      res.status(200).send({ message: "Notice sent successfully", data: data })
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//get notice list according to instructor
app.get('/get_notices/:user', async (req, res) => {
  try {
    const { user } = req.params

    const target_notice = await notice_data.findOne({ instructor_id: user })
    if (target_notice) {
      res.status(200).send({ message: "Fetched notice data successfully", data: target_notice })
    } else {
      res.status(404).json({ message: 'target data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//delete notice by instructor
app.delete('/delete_notice', async (req, res) => {
  try {
    const { id, notice_id } = req.query;
    const target_notice = await notice_data.findById(id);
    if (target_notice) {
      target_notice.notices = target_notice.notices.filter(notice => notice._id.toString() !== notice_id);
      await target_notice.save();
      res.status(200).send({ message: "Notice deleted successfully", data: target_notice });
    } else {
      res.status(404).json({ message: 'Target data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


//get full notice list
app.get('/get_all_notices', async (req, res) => {
  try {
    const target_notice = await notice_data.find({})
    if (target_notice) {
      res.status(200).send({ message: "Fetched notice data successfully", data: target_notice })
    } else {
      res.status(404).json({ message: 'target data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//get instructor name
app.get('/get_instructor/:id', async (req, res) => {
  try {
    const { id } = req.params
    const instructor = await login.findOne({ candidate_id: id })
    if (instructor) {
      res.status(200).send({ message: "Fetched instructor name successfully", data: instructor.candidate_name })
    } else {
      res.status(404).json({ message: 'Instructor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//Upload files in modules
app.post('/post_files/:Module', async (req, res) => {
  try {
    const { Module } = req.params
    const files = req.body
    const target_module = await module_data.findOne({ module_id: Module })
    if (target_module) {
      target_module.module_attachments = files
      await target_module.save()
      res.status(200).send({ message: "Files uploaded successfully", data: target_module })
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//Delete paras in modules
app.delete('/handleParadelete', async (req, res) => {
  try {
    const { id, module_id } = req.query
    const target_module = await module_data.findOne({ module_id: module_id })
    if (target_module) {
      target_module.module_theory = target_module.module_theory.filter(para => para._id.toString() !== id);
      await target_module.save();
      res.status(200).send({ message: "Paragraph deleted successfully", data: target_module });
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//set current user
app.post('/set_current_user', async (req, res) => {
  try {
    const { id, position } = req.body;

    // Check if there is already an active user
    const currentUser = await user.findOne({});
    if (currentUser) {
      return res.json({ message: "Active user already set" });
    }

    // Create a new user entry
    const newUser = new user({
      user_id: id,
      position: position
    });
    await newUser.save();

    res.status(200).json({ message: "Current user set successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


//get current user
app.get('/get_current_user', async (req, res) => {
  try {
    const users = await user.find({})
    if (users) {
      res.status(200).json({ message: "Fetched current user successfully", data: users });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.delete('/delete_current_user', async (req, res) => {
  try {
    await user.deleteMany({});
    res.status(200).json({ message: "Current user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Update user profile
app.put('/upload_user_profile_data/:id', async (req, res) => {
  try {
    const { address, age, date_of_birth, name, phone, image } = req.body;
    const { id } = req.params;
    const user = await login.findOne({ candidate_id: id })
    if (user) {
      user.candidate_address = address;
      user.candidate_age = age;
      user.candidate_dob = date_of_birth;
      user.candidate_ename = name;
      user.candidate_phone = phone;
      user.candidate_imageURL = image;
      await user.save();
      res.status(200).json({ message: "Profile updated successfully", data: user });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/fetch_user_profile_data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const target_user = await login.findOne({ candidate_id: id })
    if (target_user) {
      const result = {
        user_address: target_user.candidate_address,
        user_name: target_user.candidate_ename,
        user_phone: target_user.candidate_phone,
        user_age: target_user.candidate_age,
        user_dob: target_user.candidate_dob,
        user_image: target_user.candidate_imageURL,
      }
      res.status(200).json({ message: "user details fetched", data: result })
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

// upload instructor profile
app.put('/upload_instructor_profile/:id', async (req, res) => {
  try {
    const { name, title, institution, contact, aboutMe, achievements, image } = req.body
    const { id } = req.params;

    const target_instructor = await login.findOne({ candidate_id: id })
    if (target_instructor) {
      target_instructor.candidate_ename = name;
      target_instructor.candidate_title = title;
      target_instructor.candidate_department = institution;
      target_instructor.candidate_phone = contact;
      target_instructor.candidate_about = aboutMe;
      target_instructor.candidate_certifications = achievements;
      target_instructor.candidate_imageURL = image;
      await target_instructor.save();
      res.status(200).json({ message: "Profile updated successfully", data: target_instructor });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//fetch instrctor profile
app.get('/fetch_instructor_data/:id', async (req, res) => {
  try {
    const { id } = req.params
    const target_user = await login.findOne({ candidate_id: id })
    if (target_user) {
      const result = {
        title: target_user.candidate_title,
        name: target_user.candidate_ename,
        contact: target_user.candidate_phone,
        institution: target_user.candidate_department,
        aboutMe: target_user.candidate_about,
        achievements: target_user.candidate_certifications,
        image: target_user.candidate_imageURL
      }
      res.status(200).json({ message: "user details fetched", data: result })
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

//get pending assignments
app.get('/get_pending_assignments/:id', async (req, res) => {
  try {
    const { id } = req.params
    let count = 0;
    const target_user = await student_dashboard.find({ student_id: id })
    if (target_user) {
      target_user.map((e, i) => {
        if (e.content_type === 'quiz' && e.is_complete === false) {
          count += 1;
        }
      })
      res.status(200).send({ message: "Pending assignments found", data: count });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/get_total_time/:User', async (req, res) => {
  try {
    const { User } = req.params
    const target_modules = await student_dashboard.find({ student_id: User, content_type: "Content" })

    if (target_modules) {
      const time_arr = target_modules.map((module) => module.time_taken);
      const total_time = add_all_durations(time_arr)
      res.send({message: "Total reading time fetched", data: total_time})
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
