import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { module_data } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function DELETE(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const module_id = searchParams.get('module_id');
    const id = searchParams.get('id');

    try {
        const target_module = await module_data.findOne({ module_id: module_id })
        if (target_module) {
            target_module.module_theory = target_module.module_theory.filter(para => para._id.toString() !== id);
            await target_module.save();
            NextResponse.status(200).send({ message: "Paragraph deleted successfully", data: target_module });
        } else {
            NextResponse.status(404).json({ message: 'Module not found' });
        }
    } catch (error) {
        NextResponse.status(500).json({ message: 'Internal server error' });
    }
}