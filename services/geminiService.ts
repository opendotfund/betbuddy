
import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";
import { GEMINI_MODEL_NAME, GEMINI_API_KEY } from '../constants';

let ai: GoogleGenAI | null = null;
let initializationError: string | null = null;

// Check if the API key is the placeholder
if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
  initializationError = "API Key not configured. Please replace 'YOUR_GEMINI_API_KEY_HERE' in constants.ts with your actual Gemini API key.";
  console.error(initializationError);
} else {
  try {
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    let specificMessage = "An unknown error occurred during AI Service initialization.";
    if (error instanceof Error) {
      if (error.message.toLowerCase().includes("api key") ||
          error.message.toLowerCase().includes("credential") ||
          error.message.toLowerCase().includes("missing api key")) {
          specificMessage = `Failed to initialize AI Service: There might be an issue with the API Key in constants.ts (e.g., invalid). Please ensure it's correctly set. Original error: ${error.message}`;
      } else {
          specificMessage = `Failed to initialize AI Service: ${error.message}. This could be related to API key configuration or other setup issues.`;
      }
    }
    initializationError = specificMessage;
    console.error(initializationError);
  }
}

export const analyzeBetWithGemini = async (userBetDescription: string): Promise<string> => {
  if (initializationError) {
    throw new Error(initializationError);
  }
  if (!ai) {
    // This case should ideally be covered by the placeholder check or initialization catch block
    throw new Error("Gemini AI Service is not available. This might be due to an unconfigured API key in constants.ts or an internal error during startup.");
  }

  const systemInstructionForTextAnalysis = `
You are "Betting Buddy", an expert AI sports betting analyst.
Your task is to analyze the sports bet described by the user.

**Analysis Guidelines (based on user's text description):**

1.  **Understand the Bet:** From the user's text, identify:
    *   The sport, league, teams/players.
    *   The type of bet (moneyline, spread, total, prop).
    *   The specific selection and odds (if provided).

2.  **Provide Analysis:** Based on the information given and your general sports knowledge:
    *   Discuss relevant factors: team/player form, head-to-head (if generally known), injuries (if major and public), situational factors.
    *   If odds are given, comment briefly on perceived value.

3.  **Offer Opinion:**
    *   Conclude with whether the bet seems promising, risky, or has mixed aspects.
    *   Explain your reasoning clearly and concisely.

4.  **Interaction:**
    *   If the description is vague, ask clarifying questions to get more details (e.g., "What are the odds?", "Which player are you referring to for the prop bet?").
    *   Maintain a helpful, analytical, and slightly engaging tone.

**Output Format:**
*   Respond conversationally.
*   Use paragraphs for explanations and bullet points for lists if it helps clarity.
*   Address the user directly.

Do not invent data or odds not provided by the user. Be objective.
  `;

  try {
    const contents: Content[] = [
      {
        role: "user",
        parts: [{ text: userBetDescription }],
      },
    ];

    const requestPayload = {
      model: GEMINI_MODEL_NAME,
      contents: contents,
      config: {
        systemInstruction: systemInstructionForTextAnalysis,
      }
    };
    
    const response: GenerateContentResponse = await ai.models.generateContent(requestPayload);
    
    if (response && typeof response.text === 'string') {
      return response.text;
    } else {
      console.error("Unexpected response structure from Gemini API:", response);
      throw new Error("Received an unexpected response format from the AI. Please try again.");
    }

  } catch (error: any) {
    console.error("Error calling Gemini API:", error); 
    let errorMessage = "An unknown error occurred while analyzing the bet with AI.";
    
    if (typeof error === 'string' && error.includes("Proxying failed")) {
      errorMessage = error;
    } else if (error instanceof Error) {
        const lowerCaseMessage = error.message.toLowerCase();
        if (error.message.includes("Proxying failed") && error.message.includes("ReadableStream uploading is not supported")) {
            errorMessage = `AI Analysis Error: The API proxy reported an issue: "${error.message}". This often indicates a problem with how the proxy handles the request structure or size.`;
        } else if (lowerCaseMessage.includes("api key") ||
            lowerCaseMessage.includes("permission denied") ||
            lowerCaseMessage.includes("authentication failed") ||
            lowerCaseMessage.includes("credential")) {
            errorMessage = "AI Service Error: There seems to be an issue with the API key in constants.ts (e.g., invalid, expired, or incorrect permissions). Please check its value.";
        } else if (lowerCaseMessage.includes("quota") || lowerCaseMessage.includes("limit exceeded")) {
            errorMessage = "AI Service Error: The API quota has been exceeded. Please try again later.";
        } else if (lowerCaseMessage.includes("network error") || lowerCaseMessage.includes("fetch failed") || lowerCaseMessage.includes("timeout")) {
            errorMessage = "AI Service Error: Could not connect to the AI service. Please check your network connection.";
        } else if (error.message.startsWith("Received an unexpected response format") || error.message.startsWith("API Key not configured")) { 
            errorMessage = error.message;
        }
        else {
            const unknownError = error as any; 
            if (unknownError.status && unknownError.details) {
                 errorMessage = `AI Analysis Error: got status: ${unknownError.status} . ${JSON.stringify(unknownError.details)}`;
            } else {
                 errorMessage = `AI Analysis Error: ${error.message}`;
            }
        }
    } else if (typeof error === 'object' && error !== null && 'error' in error && 'details' in error) {
        const errObj = error as { error: string; details: any; status?: number };
        const status = errObj.status || 502;
        errorMessage = `AI Analysis Error: got status: ${status} . ${JSON.stringify(errObj)}`;
    } else if (error?.response?.data?.error?.message) { 
        errorMessage = `AI API Error: ${error.response.data.error.message}`;
    }
    
    if (error && error.error === "Proxying failed" && error.details === "ReadableStream uploading is not supported") {
      const proxyError = new Error(`AI Analysis Error: got status: 502 . ${JSON.stringify(error)}`);
      (proxyError as any).originalErrorDetails = error;
      throw proxyError;
    }

    throw new Error(errorMessage);
  }
};
