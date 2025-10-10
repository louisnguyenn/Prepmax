import { db } from '@/firebase/admin';
import { getRandomInterviewCover } from '@/lib/utils';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { readFileSync } from 'fs';
import { join } from 'path';

//* This function will create the routing for calling API requests to Vapi AI
export async function GET() {
	return Response.json({ success: true, data: 'THANK YOU' }, { status: 200 });
}

export async function POST(request: Request) {
	// reading the prompt
	const PROMPT_TEMPLATE = readFileSync(
		join(process.cwd(), 'app', 'api', 'prompt', 'prompt.txt'),
		'utf8'
	);
	const { type, role, level, techstack, amount, userid } = await request.json();

	// inject the dynamic variables into the prompt
	const PROMPT = PROMPT_TEMPLATE.replace(/\$\{role\}/g, role)
		.replace(/\$\{level\}/g, level)
		.replace(/\$\{techstack\}/g, techstack)
		.replace(/\$\{type\}/g, type)
		.replace(/\$\{amount\}/g, amount)
		.replace(/\$\{userid\}/g, userid || '');

	try {
		const { text: questions } = await generateText({
			model: google('gemini-2.0-flash-001'),
			prompt: PROMPT,
		});

		const interview = {
			role,
			type,
			level,
			techstack: techstack.split(','),
			questions: JSON.parse(questions),
			userId: userid,
			finalized: true,
			coverImage: getRandomInterviewCover(),
			createdAt: new Date().toISOString(),
		};

		await db.collection('interviews').add(interview);

		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error(error);

		return Response.json({ success: false, error }, { status: 500 });
	}
}
