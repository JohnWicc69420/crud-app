// Import necessary modules and dependencies
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

// Handle HTTP PUT requests to update a topic
export async function PUT(request, { params }) {
  // Extract the 'id' parameter from the URL params
  const { id } = params;

  // Extract the new title and description from the request body
  const { newTitle: title, newDescription: description } = await request.json();

  // Connect to MongoDB
  await connectMongoDB();

  // Find the topic by ID and update its title and description
  await Topic.findByIdAndUpdate(id, { title, description });

  // Return a JSON response indicating that the topic was updated with a status code of 200 (OK)
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

// Handle HTTP GET requests to retrieve a specific topic
export async function GET({ params }) {
  // Extract the 'id' parameter from the URL params
  const { id } = params;

  // Connect to MongoDB
  await connectMongoDB();

  // Find the topic by ID
  const topic = await Topic.findOne({ _id: id });

  // Return a JSON response containing the retrieved topic with a status code of 200 (OK)
  return NextResponse.json({ topic }, { status: 200 });
}
