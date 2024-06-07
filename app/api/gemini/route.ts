import genAI from "@/utils/gemini";
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

    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const parseText = text.trim().replaceAll("`", "").replaceAll("json", "");

    if (!response) {
      return NextResponse.json({
        success: false,
        message: "None content found",
      });
    }
    return NextResponse.json({
      success: true,
      message: "AI response  successfully",
      resources: JSON.parse(parseText),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status || 500 }
    );
  }
}
