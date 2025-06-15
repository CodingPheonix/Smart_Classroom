import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { login, notice_data } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const query = params.query;

    if (query === "get_all_notices") {
        try {
            const target_notice = await notice_data.find({})
            if (target_notice) {
                return NextResponse.json({ message: "Fetched notice data successfully", data: target_notice }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'target data not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    else if (query === "get_instructor") {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const id = searchParams.get('user_id');

        try {
            const { id } = req.params
            const instructor = await login.findOne({ candidate_id: id })
            if (instructor) {
                return NextResponse.json({ message: "Fetched instructor name successfully", data: instructor.candidate_name }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Instructor not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
}