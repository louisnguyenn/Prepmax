import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
	const isUserAuthenticated = await isAuthenticated(); // call function located in auth.actions

	// if they arae authenticated then we redirect them to the home page
	if (!isUserAuthenticated) redirect('/');
	return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
