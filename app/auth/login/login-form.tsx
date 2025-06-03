'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            // Update this route to redirect to an authenticated route. The user already has an active session.
            router.push('/protected');
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={className} {...props}>
            <div>
                <div>
                    <div>Login</div>
                    <div>Enter your email below to login to your account</div>
                </div>
                <div>
                    <form onSubmit={handleLogin}>
                        <div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <Link href="/auth/forgot-password">Forgot your password?</Link>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <div>{error}</div>}
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                        <div>
                            Don&apos;t have an account? <Link href="/auth/sign-up">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
