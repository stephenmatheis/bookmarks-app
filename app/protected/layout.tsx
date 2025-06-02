export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1>Supabase</h1>
            {children}
        </div>
    );
}
