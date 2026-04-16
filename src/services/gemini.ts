import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateTripItinerary = async (destination: string, budget: number, duration: number, interests: string[]) => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Plan a ${duration}-day trip to ${destination} with a budget of $${budget}. 
  Interests: ${interests.join(", ")}. 
  Provide a day-wise itinerary with activities, estimated costs, and locations.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      activity: { type: Type.STRING },
                      location: { type: Type.STRING },
                      cost: { type: Type.NUMBER },
                      category: { 
                        type: Type.STRING,
                        enum: ['sightseeing', 'food', 'transport', 'accommodation', 'other']
                      }
                    },
                    required: ['time', 'activity', 'category']
                  }
                }
              },
              required: ['day', 'activities']
            }
          },
          totalEstimatedCost: { type: Type.NUMBER }
        },
        required: ['itinerary', 'totalEstimatedCost']
      }
    }
  });

  return JSON.parse(response.text);
};

export const chatWithAssistant = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const model = "gemini-3-flash-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: "You are a helpful travel assistant named VoyageAI. You help users plan trips, find hotels, restaurants, and tourist spots. Be concise and friendly.",
    },
    history: history as any,
  });

  const result = await chat.sendMessage({ message });
  return result.text;
};
