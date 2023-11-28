// Import necessary modules and dependencies
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

// Handle HTTP POST requests
export async function POST(request) {
  // Extract title and description from the request body
  const { title, description } = await request.json();

  // Connect to MongoDB
  await connectMongoDB();

  // Create a new topic in the MongoDB database using the Topic model
  await Topic.create({ title, description });

  // Return a JSON response indicating that the topic was created with a status code of 201 (Created)
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

// Handle HTTP GET requests
export async function GET() {
  // Connect to MongoDB
  await connectMongoDB();

  // Retrieve all topics from the MongoDB database using the Topic model
  const topics = await Topic.find();

  // Return a JSON response containing the retrieved topics
  return NextResponse.json({ topics });
}

// Handle HTTP DELETE requests
export async function DELETE(request) {
  // Extract the 'id' parameter from the query string of the URL
  const id = request.nextUrl.searchParams.get("id");

  // Connect to MongoDB
  await connectMongoDB();

  // Find and delete the topic with the specified 'id' from the MongoDB database
  await Topic.findByIdAndDelete(id);

  // Return a JSON response indicating that the topic was deleted with a status code of 200 (OK)
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
