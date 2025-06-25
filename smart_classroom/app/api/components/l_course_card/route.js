import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course, login, student_dashboard } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function POST(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get('id');
    const learner_id = searchParams.get('learner_id');

    try {
        const target_candidate = await login.findOne({ candidate_id: learner_id });

        if (!target_candidate) {
            return NextResponse.json({ message: 'target course not found' }, { status: 404 });
        }

        // Add target course to Mycourses inventory
        target_candidate.candidate_courses.push(id)
        await target_candidate.save()

        // Set up the student dashboard default settings
        const target_course = await course.findOne({ course_id: id })
        if (!target_course) {
            return NextResponse.json({ message: "Target Course not found" }, { status: 404 });
        }

        if (!target_course.course_details) {
            return NextResponse.json({ message: "Target Course details not found" }, { status: 404 });
        }

        console.log("Target Course Details:", target_course.course_details);

        // Save modules to dashboard
        for (const modules of target_course.course_details) {
            const new_module = new student_dashboard({
                student_id: learner_id,
                module_id: modules.module_id,
                course_id: id,
                content_type: modules.content_type,
                quiz_result: [],
                quiz_score: 0,
                total_score: 0,
                time_taken: "0:0:0",
                is_complete: false,
                most_recent: false,
            });
            await new_module.save();
        }

        return NextResponse.json({ message: "Course is saved and dashboard created" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}