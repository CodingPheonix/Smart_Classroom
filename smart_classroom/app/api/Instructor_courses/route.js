import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { login, course } from "../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const Instructor = searchParams.get('user_id');

    try {
        const courses = await course.find({ instructor_id: Instructor })
        return NextResponse.json({ success: true, message: "Courses fetched successfully", data: courses })
    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Failed to fetch courses', error: error.message });
    }
}
export async function POST(request, { params }) {
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

        return NextResponse.json({ success: true, message: "Course added successfully", data: newcourse })
    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Failed to upload course', error: error.message });
    }
}