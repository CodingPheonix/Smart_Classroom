import { NextResponse } from "next/server";
import { connect_to_mongo } from "../../mongo/connect_to_mongo";
import { course, module_data, quiz_data } from "../../mongo/mongo_schema";

await connect_to_mongo()

export async function PUT(request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const Course = searchParams.get('course');
  const Module = searchParams.get('id');

  try {
    // Find the target course
    const target_course = await course.findOne({ course_id: Course });
    if (!target_course) {
      return NextResponse.json({ success: false, message: 'Course not found' });
    }

    // Find the specific module in course_details
    const target_module = target_course.course_details.find(module => module.module_id === Module);
    if (!target_module) {
      return NextResponse.json({ success: false, message: 'Module not found in the course' });
    }
    // Check the content type and delete accordingly
    if (target_module.content_type === 'Content') {
      await module_data.findOneAndDelete({ module_id: target_module.module_id });
    } else {
      await quiz_data.findOneAndDelete({ module_id: target_module.module_id });
    }

    // Remove the module from course_details array
    target_course.course_details = target_course.course_details.filter(module => module.module_id !== Module);
    await target_course.save();

    return NextResponse.json({ success: true, message: "Module deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete module', error: error.message });
  }
}