import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course, module_data, quiz_data } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query

    if (query === "get_module_data") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Course = searchParams.get('course_id');
        const Module = searchParams.get('module_id');

        try {
            const target_course = await course.findOne({ course_id: Course });

            if (!target_course) {
                return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
            }

            const target_module = target_course.course_details.find(module => module.module_id === Module)

            if (!target_module) {
                return NextResponse.json({ success: false, message: 'Module not found' }, { status: 404 });
            }

            return NextResponse.json({ success: true, message: "Module fetched successfully", data: target_module });
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Failed to fetch module', error: error.message }, { status: 500 });
        }
    }
    else if (query === "getparapagedata") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
            const target_module = await module_data.findOne({ module_id: Module });

            if (target_module) {
                return NextResponse.json({ message: "Data required found", data: target_module.module_theory });
            } else {
                return NextResponse.json({ success: false, message: "Module not found" }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
        }
    }
    else if (query === "get_quiz_data") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
            const target_quiz_data = await quiz_data.findOne({ module_id: Module });
            if (target_quiz_data) {
                return NextResponse.json({ message: "quiz data fetched successfully", data: target_quiz_data.quiz });
            } else {
                return NextResponse.json({ success: false, message: 'quiz data not found' }, { status: 404 });
            }
        } catch (error) {
            console.error(error);
            return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
        }
    }
    else if (query === "get_files") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
            const target_module = await module_data.findOne({ module_id: Module });

            if (target_module) {
                return NextResponse.json({ message: "Attachments required found", data: target_module.module_attachments });
            } else {
                return NextResponse.json({ success: false, message: "Module not found" }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
        }
    }
}
export async function POST(request, { params }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const user = searchParams.get('user_id');
    const Module = searchParams.get('module_id');
    const Course = searchParams.get('course_id');

    try {
        const { content_type, time_diff } = req.body

        const existing_data = await student_dashboard.findOne({ student_id: user, module_id: Module, course_id: Course })

        if (existing_data) {
            existing_data.is_complete = true
            existing_data.time_taken = addTimes(existing_data.time_taken, time_diff)
            await existing_data.save()

            return NextResponse.json({ message: "Student result updated", data: existing_data });
        } else {
            const new_data = new student_dashboard({
                student_id: user,
                module_id: Module,
                course_id: Course,
                content_type: content_type, // Should match the schema (array or object)
                quiz_result: [], // Should match the schema (array or object)
                quiz_score: 0, // Ensure score is a number in the schema
                total_score: 0,
                time_taken: `${time_diff.split(":")[0]}:${time_diff.split(":")[1]}:${time_diff.split(":")[2]}` || "0:0:0",
                is_complete: false,
                most_recent: false,
            });

            const savedData = await new_data.save();

            return NextResponse.json({ message: "Content data uploaded", data: savedData });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
export async function PUT(request, { params }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const Module = searchParams.get('module_id');
    const Course = searchParams.get('course_id');

    try {
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


            return NextResponse.json({ message: "Student result updated", data: existing_data });
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
            return NextResponse.json({ message: "Student result uploaded", data: savedData });
        }

    } catch (error) {
        console.error("Error saving student data:", error);
        return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
    }
}