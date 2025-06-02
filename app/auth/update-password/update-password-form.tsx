'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.updateUser({ password });
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
                    <div className="text-2xl">Reset Your Password</div>
                    <div>Please enter your new password below.</div>
                </div>
                <div>
                    <form onSubmit={handleForgotPassword}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="password">New password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="New password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save new password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
