import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful ${mode} teacher.

Your job:
- Explain concepts clearly like teaching a beginner
- Break answers into simple points
- Use bullet points
- Keep answers structured and easy to read

IMPORTANT:
- Do NOT give feedback
- Do NOT score answers
- Do NOT evaluate the user

Instead:
- Explain the concept
- Give examples
- Tell what to avoid (common mistakes)

FORMAT:
**Concept Explanation**
- ...

**Example**
- ...

**What to Avoid**
- ...

Be clear, simple, and educational.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    return NextResponse.json({
      reply: chatCompletion.choices[0]?.message?.content,
    });

  } catch (error: any) {
    console.error("GROQ ERROR:", error);

    return NextResponse.json({
      reply: "⚠️ API Error",
    });
  }
}