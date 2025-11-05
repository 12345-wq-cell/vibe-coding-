import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedCode, WebsiteIdea, UploadedImage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateWebsiteCode(
  userPrompt: string,
  image?: UploadedImage | null
): Promise<GeneratedCode> {
  const model = "gemini-2.5-pro";

  const promptWithImageInstruction = `
    You are an expert web developer specializing in creating modern, structured, single-page websites.
    Based on the following user request, generate the complete code for a website that follows a specific structure.
    Provide the response as a single JSON object with three keys: "html", "css", and "javascript".

    **Critical Image Instruction:**
    - If the user provides an image, you MUST use it in the generated website. A great place for it is the main hero section background or a prominent feature image.
    - If no image is provided, you should find a suitable, high-quality placeholder image from a service like unsplash that matches the user's prompt.

    **Website Structure Requirements:**
    1.  **Main Banner/Hero Section:** Start with a prominent, full-width banner at the top. This should include a catchy headline and a brief introductory text related to the user's request.
    2.  **Services/Features Section:** Below the banner, include a section that details the services or features. Tailor this section to the user's request (e.g., product showcase, portfolio gallery, blog posts).
    3.  **Editable Content Section:** Include a flexible text section, like an "About Us" or "Our Story" area. Use placeholder text.
    4.  **Contact/Footer:** Conclude with a simple footer.

    **Code Generation Rules:**
    - "html" key should contain ONLY the content for the <body> tag.
    - "css" key should contain all necessary CSS. Do not wrap in <style> tags.
    - "javascript" key should contain all necessary JavaScript. Do not wrap in <script> tags.
    - Ensure the website is visually appealing, responsive, and functional.
    - Use high-quality placeholder content (text and images) that fits the theme.
    - The code should be self-contained.

    User request: "${userPrompt}"
  `;
  
  const contents = image 
    ? { 
        parts: [
          { text: promptWithImageInstruction },
          { inlineData: { mimeType: image.mimeType, data: image.base64 } }
        ] 
      }
    : promptWithImageInstruction;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            html: { type: Type.STRING },
            css: { type: Type.STRING },
            javascript: { type: Type.STRING },
          },
          required: ["html", "css", "javascript"],
        },
      },
    });

    const jsonString = response.text;
    const parsedResponse = JSON.parse(jsonString);

    if (
      typeof parsedResponse.html === 'string' &&
      typeof parsedResponse.css === 'string' &&
      typeof parsedResponse.javascript === 'string'
    ) {
      return parsedResponse;
    } else {
      throw new Error("Invalid response format from API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate website code. Please check your prompt or API key.");
  }
}

export async function generateWebsiteIdeas(topic: string): Promise<WebsiteIdea[]> {
  const model = "gemini-2.5-flash";
  const prompt = `
    You are a creative consultant and expert in web design trends.
    Generate 5 innovative and distinct website ideas based on the following topic: "${topic}".
    For each idea, provide a catchy 'title' and a brief 'description' (2-3 sentences) of the website's concept and key features.
    Return the result as a single JSON object with a key "ideas" which is an array of the 5 idea objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["title", "description"],
              },
            },
          },
          required: ["ideas"],
        },
      },
    });
    
    const jsonString = response.text;
    const parsedResponse = JSON.parse(jsonString);

    if (parsedResponse.ideas && Array.isArray(parsedResponse.ideas)) {
      return parsedResponse.ideas;
    } else {
      throw new Error("Invalid response format from API for ideas.");
    }
  } catch (error) {
    console.error("Error calling Gemini API for ideas:", error);
    throw new Error("Failed to generate website ideas. Please try again.");
  }
}
