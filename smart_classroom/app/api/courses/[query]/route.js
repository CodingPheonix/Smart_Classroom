import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course, module_data, quiz_data } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query

    if (query === 'get-title') {

        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const slug = searchParams.get('slug');

        try {
            const courses = await course.findOne({ course_id: slug })
            NextResponse.send({ success: true, message: "Course title fetched successfully", data: courses })
        } catch (error) {
            NextResponse.send({ status: 'error', message: 'Failed to fetch course title', error: error.message });
        }
    }
}

export async function POST(request, { params }) {
    const query = params.query

    if (query === 'setModule') {
        try {
            const { moduleTitle, contentType, id } = await request.json()

            const new_module_data = new module_data({
                module_id: id,
                module_title: moduleTitle,
                content_type: contentType,
                module_theory: [],
                module_attachments: [],
            })

            await new_module_data.save()

            NextResponse.status(200).send({ message: "Default module values added successfully", data: new_module_data })

        } catch (error) {
            NextResponse.status(500).send({ success: false, message: 'Failed to post module data', error: error.message });
        }
    }

    if (query === 'post_quiz_data') {
        try {
            const { moduleTitle, contentType, id } = await request.json()
            const new_quiz = new quiz_data({
                module_id: id,
                module_title: moduleTitle,
                content_type: contentType,
                quiz: []
            })
            await new_quiz.save()
            NextResponse.status(200).send({ message: "Default quiz data uploaded", data: new_quiz })
        } catch (error) {
            NextResponse.status(500).json({ message: 'Internal server error' });
        }
    }
}

export async function PUT(request, { params }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const slug = searchParams.get('slug');

    try {
        const courses = await course.findOne({ course_id: slug });
        if (!courses) {
            return NextResponse.status(404).send({ success: false, message: 'Course not found' });
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

        NextResponse.json({ success: true, message: 'Course updated successfully', data: courses });
    } catch (error) {
        NextResponse.status(500).send({ success: false, message: 'Failed to update course', error: error.message });
    }
}