import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { student_dashboard } from "../../mongo/mongo_schema";
import { add_all_durations, get_student_rank } from "@/app/operations.js";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query;

    if (query === "get_activities") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const student_id = searchParams.get('user_id');

        try {
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

                return NextResponse.json({ message: "Fetched student data successfully", data: result }, { status: 200 });
            } else {
                return NextResponse.json({ message: "No data found for the student" }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
        }
    } else if (query === "fetch_student_dashboard_data") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('user_id');

        try {
            const target_data = await student_dashboard.find({ student_id: id })
            if (target_data) {
                return NextResponse.json({ message: "Student quiz data fetched", data: target_data }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'target data not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    else if (query === "get_pending_assignments") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('user_id');

        try {
            let count = 0;
            const target_user = await student_dashboard.find({ student_id: id })
            if (target_user) {
                target_user.map((e, i) => {
                    if (e.content_type === 'quiz' && e.is_complete === false) {
                        count += 1;
                    }
                })
                return NextResponse.json({ message: "Pending assignments found", data: count }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    else if (query === "get_total_time") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const User = searchParams.get('user_id');

        try {
            const target_modules = await student_dashboard.find({ student_id: User, content_type: "Content" })

            if (target_modules) {
                const time_arr = target_modules.map((module) => module.time_taken);
                const total_time = add_all_durations(time_arr)
                return NextResponse.json({ message: "Total reading time fetched", data: total_time }, { status: 200 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    else if (query === "get_rank") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const User = searchParams.get('user_id');

        try {
            const target_modules = await student_dashboard.find({ content_type: "quiz" })

            if (target_modules) {
                const rank = get_student_rank(target_modules, User)
                return NextResponse.json({ message: "Rank for individual achieved", data: rank }, { status: 200 });
            } else {
                return NextResponse.json({ message: "target modules not found" }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}