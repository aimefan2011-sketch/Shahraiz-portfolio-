import { NextRequest, NextResponse } from 'next/server';
import { buildKnowledgeBase, getOfflineResponse } from '@/lib/ai-knowledge';
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

       const systemPrompt = `${buildKnowledgeBase()}

When answering general knowledge questions (not about the portfolio), use your own knowledge to provide helpful, accurate answers. Always be professional and concise. Use markdown formatting where appropriate.`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Offline fallback
      const lastUserMessage = messages
        .filter((m: { role: string }) => m.role === 'user')
        .pop();

      if (!lastUserMessage) {
        return NextResponse.json({
          response: "Hello! I'm the AI assistant for Shahraiz Ahmad's portfolio. How can I help you today?",
          offline: true,
        });
      }

      const response = getOfflineResponse(lastUserMessage.content);
      return NextResponse.json({ response, offline: true });
    }

    // Format messages for Gemini
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Gemini API error:', errorText);

      // Fall back to offline
      const lastUserMessage = messages
        .filter((m: { role: string }) => m.role === 'user')
        .pop();
      const response = lastUserMessage
        ? getOfflineResponse(lastUserMessage.content)
        : "I'm having trouble connecting right now. Please try again.";
      return NextResponse.json({ response, offline: true });
    }

    const data = await res.json();
    const responseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response. Please try again.";

    return NextResponse.json({ response: responseText, offline: false });
  } catch (error) {
    console.error('AI route error:', error);

    // Fall back to offline
    const body = await req.json().catch(() => ({ messages: [] }));
    const lastUserMessage = body.messages
      ?.filter((m: { role: string }) => m.role === 'user')
      .pop();
    const response = lastUserMessage
      ? getOfflineResponse(lastUserMessage.content)
      : "Something went wrong. Please try again.";
    return NextResponse.json({ response, offline: true });
  }
}
