export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
    const params = await searchParams;

    return (
        <div>
            <div>Sorry, something went wrong.</div>
            <div>Code error: {params.error}</div>
            <div>An unspecified error occurred.</div>
        </div>
    );
}
