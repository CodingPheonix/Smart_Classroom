import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course, login } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function POST(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get('id');
    const learner_id = searchParams.get('learner_id');

    try {
        const target_candidate = await login.findOne({ candidate_id: learner_id });

        // Add target course to Mycourses inventory
        if (target_candidate) {
            target_candidate.candidate_courses.push(id)
            await target_candidate.save()
            NextResponse.status(200).send({ message: "Course is saved" })
        } else {
            NextResponse.status(404).json({ message: 'target course not found' });
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
                        time_taken: "0:0:0",
                        is_complete: false,
                        most_recent: false,
                    });
                    await new_module.save();
                })
                NextResponse.status(200).send({ message: "Successfully created default dashboard" })
            } else {
                NextResponse.send({ message: "Target Course details not found" })
            }
        } else {
            NextResponse.send({ message: "Target Course not found" })
        }

    } catch (error) {
        NextResponse.status(500).json({ message: 'Internal server error' });
    }
}