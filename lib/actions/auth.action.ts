'use server';
import { auth, db } from '@/firebase/admin';
import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
	const { uid, name, email } = params;

	try {
		const userRecord = await db.collection('users').doc(uid).get();

		if (userRecord.exists) {
			return {
				success: false,
				message: 'User already exists. Please sign in.',
			};
		}

		// creating a new user if one doesn't already exist
		await db.collection('users').doc(uid).set({
			name,
			email,
		});
	} catch (error: any) {
		console.error('Error creating a user', error);

		if (error.code === 'auth/email-already-exists') {
			return {
				success: false,
				message: 'This email is already in use.',
			};
		}

		return {
			success: false,
			message: 'Failed to create an account',
		};
	}
}

// creating a cookie session
export async function setSessionCookie(idToken: string) {
	const cookieStore = await cookies();

	const sessionCookie = await auth.createSessionCookie(idToken, {
		// expires in one week
		expiresIn: ONE_WEEK * 1000,
	});

	cookieStore.set('session', sessionCookie, {
		maxAge: ONE_WEEK,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		sameSite: 'lax',
	});
}
