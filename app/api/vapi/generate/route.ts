import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { readFileSync } from 'fs';

//* This function will create the routing for calling API requests to Vapi AI
export async function GET() {
	return Response.json({ success: true, data: 'THANK YOU' }, { status: 200 });
}

export async function POST(request: Request) {
	const PROMPT_TEMPLATE = readFileSync('./prompt/prompt.txt', 'utf8');
	const { type, role, level, techstack, amount, userid } = await request.json();

	// inject the dynamic variables into the prompt
	const PROMPT = PROMPT_TEMPLATE.replace(/\$\{role\}/g, role)
		.replace(/\$\{level\}/g, level)
		.replace(/\$\{techstack\}/g, techstack)
		.replace(/\$\{type\}/g, type)
		.replace(/\$\{amount\}/g, amount)
		.replace(/\$\{userid\}/g, userid || '');

	try {
		const { text } = await generateText({
			model: google('gemini-2.0-flash-001'),
			prompt: PROMPT,
		});
	} catch (error) {
		console.error(error);

		return Response.json({ success: false, error }, { status: 500 });
	}
}
