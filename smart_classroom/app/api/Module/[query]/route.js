import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course, module_data, quiz_data } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query;

    if (query === "getparapagedata") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
            const target_module = await module_data.findOne({ module_id: Module });

            if (target_module) {
                return NextResponse.json({ message: "Data required found", data: target_module.module_theory }, { status: 200 });
            } else {
                return NextResponse.json({ success: false, message: "Module not found" }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    else if (query === "get_files") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
            const target_module = await module_data.findOne({ module_id: Module });

            if (target_module) {
                return NextResponse.json({ message: "Attachments required found", data: target_module.module_attachments }, { status: 200 });
            } else {
                return NextResponse.json({ success: false, message: "Module not found" }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    else if (query === "get_quiz_data") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
            const target_quiz_data = await quiz_data.findOne({ module_id: Module });
            if (target_quiz_data) {
                return NextResponse.json({ message: "quiz data fetched successfully", data: target_quiz_data.quiz }, { status: 200 });
            } else {
                return NextResponse.json({ success: false, message: 'quiz data not found' }, { status: 404 });
            }
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    } else if (query === "get_module_data") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');
        const Course = searchParams.get('course_id');

        try {
            const target_course = await course.findOne({ course_id: Course });

            if (!target_course) {
                return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
            }

            const target_module = target_course.course_details.find(module => module.module_id === Module)

            if (!target_module) {
                return NextResponse.json({ success: false, message: 'Module not found' }, { status: 404 });
            }

            return NextResponse.json({ success: true, message: "Module fetched successfully", data: target_module }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Failed to fetch module', error: error.message }, { status: 500 });
        }
    }
}
export async function PUT(request, { params }) {
    const query = params.query;

    if (query === "submit_module") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
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
                return NextResponse.json({ message: 'Module theory updated successfully' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Module not found' }, { status: 404 });
            }
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    else if (query === "handle_delete_quiz") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
            const target_quiz_data = await quiz_data.findOne({ module_id: Module });
            if (target_quiz_data) {
                target_quiz_data.quiz = [];
                await target_quiz_data.save();
                return NextResponse.json({ message: 'Quiz deleted successfully!' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    else if (query === "post_quiz_data") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
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
                return NextResponse.json({ message: 'Quiz updated successfully!' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Module not found' }, { status: 404 });
            }
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}
export async function POST(request, { params }) {
    const query = params.query;

    if (query === "post_files") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const Module = searchParams.get('module_id');

        try {
            const files = request.body
            const target_module = await module_data.findOne({ module_id: Module })
            if (target_module) {
                target_module.module_attachments = files
                await target_module.save()
                return NextResponse.json({ message: "Files uploaded successfully", data: target_module }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Module not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}