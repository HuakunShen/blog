import { NextResponse } from "next/server";
import { AIBot } from "./aibot";
import { z } from "zod";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not configured in environment variables");
}
const requiredEnvVars = {
  PINECONE_INDEX: process.env.PINECONE_INDEX,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

const aibotConfig = z
  .object({
    pineconeIndexString: z.string(),
    pineconeApiKey: z.string(),
    pineconeEnv: z.string(),
    openaiApiKey: z.string(),
  })
  .parse({
    pineconeIndexString: requiredEnvVars.PINECONE_INDEX,
    pineconeApiKey: requiredEnvVars.PINECONE_API_KEY,
    pineconeEnv: requiredEnvVars.PINECONE_ENVIRONMENT,
    openaiApiKey: requiredEnvVars.OPENAI_API_KEY,
  });

const aibot = new AIBot(aibotConfig);

export async function POST(request: Request) {
  try {
    // Get the query from request body
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const response = await aibot.query(question);
    return NextResponse.json({ answer: response });
  } catch (error) {
    console.error("Error processing AI request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
