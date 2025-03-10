import { Pinecone, Index as PineConeIndex } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings, OpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Embeddings } from "@langchain/core/embeddings";
import { BaseLLM } from "@langchain/core/language_models/llms";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export class AIBot {
  pineconeIndexString: string;
  pineconeApiKey: string;
  pineconeEnv: string;
  openaiApiKey: string;
  pinecone: Pinecone;
  pineconeIndex: PineConeIndex;
  model: BaseLLM;
  embedding: Embeddings;

  constructor(config: {
    pineconeIndexString: string;
    pineconeApiKey: string;
    pineconeEnv: string;
    openaiApiKey: string;
  }) {
    this.pineconeIndexString = config.pineconeIndexString;
    this.pineconeApiKey = config.pineconeApiKey;
    this.pineconeEnv = config.pineconeEnv;
    this.openaiApiKey = config.openaiApiKey;
    this.pinecone = new Pinecone({
      apiKey: this.pineconeApiKey,
    });
    this.pineconeIndex = this.pinecone.Index(this.pineconeIndexString);
    this.model = new OpenAI({ temperature: 0.9 });
    this.embedding = new OpenAIEmbeddings();
  }

  async query(query: string): Promise<string> {
    const vectorStore = await PineconeStore.fromExistingIndex(this.embedding, {
      pineconeIndex: this.pineconeIndex,
    });

    const retriever = vectorStore.asRetriever();
    const retrievedDocs = retriever.getRelevantDocuments(query);
    const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");
    const ragChain = await createStuffDocumentsChain({
      llm: this.model,
      prompt,
      outputParser: new StringOutputParser(),
    });
    const response = await ragChain.invoke({
      question: query,
      context: retrievedDocs,
    });
    await fetch("https://notify.huakun.tech/telegram", {
      method: "POST",
      body: JSON.stringify({
        message: `${query} ||| ${response}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetch("https://notify.huakun.tech/notion", {
      method: "POST",
      body: JSON.stringify({
        message: `${query} ||| ${response}`,
        tags: ["ai-bot"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }
}
