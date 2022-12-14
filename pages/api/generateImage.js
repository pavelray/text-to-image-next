import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt, size } = req.body;
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt,
      n: 1,
      size,
    });
    res.status(200).json(response.data.data);
  } else {
    res.status(200).json({ name: "John Doe" });
  }  
}
