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
            return NextResponse.json({ success: true, message: "Course title fetched successfully", data: courses });
        } catch (error) {
            return NextResponse.json({ status: 'error', message: 'Failed to fetch course title', error: error.message }, { status: 500 });
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

            return NextResponse.json({ message: "Default module values added successfully", data: new_module_data }, { status: 200 })

        } catch (error) {
            return NextResponse.json({ success: false, message: 'Failed to post module data', error: error.message }, { status: 500 });
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
            return NextResponse.json({ message: "Default quiz data uploaded", data: new_quiz }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
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
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        const { id, moduleTitle, moduleDescription, contentType, videoUrl } = await request.json();

        const newModule = {
            module_id: id,
            module_title: moduleTitle,
            module_description: moduleDescription,
            content_type: contentType,
            module_data: contentType === 'video' ? [videoUrl] : []
        };

        courses.course_details.push(newModule); // Add new module to the array

        const updated_course = await courses.save();

        return NextResponse.json({ success: true, message: 'Course updated successfully', data: courses });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to update course', error: error.message }, { status: 500 });
    }
}