'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });
            if (error) throw error;
            setSuccess(true);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={className} {...props}>
            {success ? (
                <div>
                    <div>
                        <div className="text-2xl">Check Your Email</div>
                        <div>Password reset instructions sent</div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            If you registered using your email and password, you will receive a password reset email.
                        </p>
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <div className="text-2xl">Reset Your Password</div>
                        <div>Type in your email and we&apos;ll send you a link to reset your password</div>
                    </div>
                    <div>
                        <form onSubmit={handleForgotPassword}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
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
                                {error && <p className="text-sm text-red-500">{error}</p>}
                                <button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Send reset email'}
                                </button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
