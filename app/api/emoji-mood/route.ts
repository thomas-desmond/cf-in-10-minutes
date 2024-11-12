import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface UserRequest {
  mood: string;
}

export async function POST(request: NextRequest) {
  const body: UserRequest = await request.json();

  const cached = await getRequestContext().env.cf10minutes.get(body.mood.toLocaleLowerCase());
  if (cached) {
    return Response.json(cached);
  }

  const messages = [
    { role: "system", content: "Respond only with emojis that best represent the mood provided as input. Use a variety of emojis to convey the mood effectively, but do not include any text or other characters." },
    {
      role: "user",
      content: body.mood,
    },
  ];

  const { response } = await getRequestContext().env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
    messages,
  });

  await getRequestContext().env.cf10minutes.put(body.mood.toLocaleLowerCase(), response);


  return Response.json(response);
}
