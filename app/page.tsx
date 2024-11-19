"use client";
import { FormEvent, useState } from "react";

export default function Home() {
  const [compliment, setCompliment] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const nameInput = formData.get("name") as string;

    setCompliment(`${nameInput} is the best!`)
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <h1 className="text-4xl font-bold">Compliment Creator</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="name"
            placeholder="Enter name to compliment"
            aria-label="compliment"
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
      {compliment && (
        <div className="mt-4 text-2xl">
          {compliment}
        </div>
      )}
    </main>
  );
}