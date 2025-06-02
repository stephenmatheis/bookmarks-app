import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <div>Hello world!</div>
            <Link href="/protected">Protected route</Link>
        </main>
    );
}
