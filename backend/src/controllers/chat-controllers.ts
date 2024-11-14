import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../configs/openai-config.js";
import { OpenAI } from "openai";

type ChatCompletionRequestMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    // Grab chats of user
    const chats: ChatCompletionRequestMessage[] = user.chats.map(({ role, content }) => ({
      role: role as "user" | "assistant" | "system",
      content,
    }));

    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Send all chats with a new one to API
    const openai = configureOpenAI();
    
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    
    // Assuming choices can be accessed directly
    user.chats.push(chatResponse.choices[0].message);
    
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
