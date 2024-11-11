import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface UserRequest {
  mood: string;
}

export async function POST(request: NextRequest) {
  const body: UserRequest = await request.json();

  const myKv = getRequestContext().env.cf10minutes;
  const cached = await myKv.get(body.mood);

  if (!cached) {
    const messages = [
      {
        role: "system",
        content:
          "You only return responses in the form of emojis. You will be sent a mood and must create the equivalent of that mood with emojis",
      },
      {
        role: "user",
        content: body.mood,
      },
    ];

    const {response} = await getRequestContext().env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct-fast",
      { messages }
    );


    await myKv.put(body.mood, response)
    return Response.json(response);
  }
  
  return Response.json(cached);
}
