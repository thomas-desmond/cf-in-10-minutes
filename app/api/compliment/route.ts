
import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface UserRequest {
  name: string;
}

export async function POST(request: NextRequest) {
  const body: UserRequest = await request.json();

  const cachedCompliment = await getRequestContext().env.aws_demo72.get(body.name);
  if(cachedCompliment) {  
    return Response.json(cachedCompliment);
  }

  const messages = [
    {
      role: "system",
      content:
        "You are a friendly and supportive AI bot designed to give personalized, thoughtful compliments to conference attendees. When someone provides their name, respond with a unique compliment that resonates with their skills, enthusiasm, and presence at a tech event. Compliments should be creative, authentic, and tailored to a tech-savvy audience, making them feel recognized and appreciated for their contributions to the industry. Provide your response in a succinct sentence or two.",
    },
    {
      role: "user",
      content: body.name,
    },
  ];

  const { response } = await getRequestContext().env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", { messages });

  await getRequestContext().env.aws_demo72.put(body.name, response);

  return Response.json(response);
}
