import OpenAI from "openai";
import openai from "@/utils/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const prompt = request.nextUrl.searchParams.get("prompt");
    if (!prompt) {
      return NextResponse.json({
        success: false,
        message: "Prompt not found",
      });
    }
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);
    const responseObj = chatCompletion.choices[0].message.content;
    if (!responseObj) {
      return NextResponse.json({
        success: false,
        message: "None content found",
      });
    }
    return NextResponse.json({
      success: true,
      message: "AI response  successfully",
      resources: JSON.parse(responseObj),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status || 500 }
    );
  }
}
