import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { notice_data } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function DELETE(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const notice_id = searchParams.get('notice_id');
    const id = searchParams.get('id');

    try {
        const target_notice = await notice_data.findById(id);
        if (target_notice) {
            target_notice.notices = target_notice.notices.filter(notice => notice._id.toString() !== notice_id);
            await target_notice.save();
            return NextResponse.json({ message: "Notice deleted successfully", data: target_notice });
        } else {
            return NextResponse.json({ message: 'Target data not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}