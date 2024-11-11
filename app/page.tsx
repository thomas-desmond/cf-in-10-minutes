"use client";
import { FormEvent, useState } from "react";

export default function Home() {
  const [moodResponse, setMoodResponse] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMoodResponse("")
    const formData = new FormData(event.target as HTMLFormElement);
    const moodInput = formData.get("mood") as string;

    try {
      const response = await fetch("/api/emoji-mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood: moodInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json() as string;
      setMoodResponse(data);
    } catch (error) {
      console.error("Error submitting mood:", error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <h1 className="text-4xl font-bold">Emoji Mooder</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="mood"
            placeholder="Enter your mood"
            aria-label="Mood"
            id="moodInput"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {moodResponse && (
        <div className="mt-4 text-2xl">
          Your mood emoji: {moodResponse}
        </div>
      )}
    </main>
  );
}
