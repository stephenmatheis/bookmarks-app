import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';

import '@/styles/app.scss';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Bookmarks',
    description: 'Bookmarks: save stuff.',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
