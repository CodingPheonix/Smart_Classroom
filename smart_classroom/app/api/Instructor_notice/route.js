import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { notice_data } from "../mongo/mongo_schema";

await connect_to_mongo()

export async function GET(request, { params }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const user = searchParams.get('user_id');

    try {
        const target_notice = await notice_data.findOne({ instructor_id: user })
        if (target_notice) {
            return NextResponse.json({ message: "Fetched notice data successfully", data: target_notice }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'target data not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
export async function POST(request, { params }) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const user = searchParams.get('user_id');

    try {
        const updatedList = req.body;

        if (!Array.isArray(updatedList) || !updatedList.every(notice => notice.heading && notice.description)) {
            return NextResponse.json({ message: "Invalid format for updatedList" }, { status: 400 });
        }

        const target_notice = await notice_data.findOne({ instructor_id: user })
        if (target_notice) {
            target_notice.notices = updatedList
            await target_notice.save()
            return NextResponse.json({ message: "Notice updated successfully", data: target_notice }, { status: 200 });
        } else {
            const data = new notice_data({
                instructor_id: user,
                notices: updatedList
            })
            await data.save();
            return NextResponse.json({ message: "Notice sent successfully", data: data }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}