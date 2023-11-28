"use client"; // Indicates that this code runs on the client side

import { useState } from "react"; // Import the useState hook for managing state
import { useRouter } from "next/navigation"; // Import the useRouter hook for navigation in Next.js

// Define the AddTopic component
export default function AddTopic() {
  // State variables for managing the form input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Access the Next.js router for navigation
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate that title and description are not empty
    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      // Make a POST request to the server at "http://localhost:3000/api/topics"
      const res = await fetch("http://localhost:3000/api/topics", {
        // Specify the HTTP method as POST
        method: "POST",

        // Provide headers for the request, including the content type as JSON
        headers: {
          "Content-type": "application/json",
        },

        // Convert the data (title and description) to JSON format and include it in the request body
        body: JSON.stringify({ title, description }),
      });

      // Check if the request was successful (status code 2xx)
      if (res.ok) {
        // If successful, navigate to the home page
        router.push("/");
      } else {
        // If unsuccessful, throw an error
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
    }
  };

  // Render the form with input fields and a submit button
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
