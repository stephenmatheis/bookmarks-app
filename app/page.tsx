import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
    const startIndex = 0;
    const endIndex = 10;
    const supabase = await createClient();
    const { data } = await supabase.from('bookmarks').select().lte('id', endIndex);

    return (
        <main className={styles.main}>
            <h1>Bookmarks</h1>
            <div className={styles.bookmarks}>
                {data?.slice(startIndex, endIndex).map((bookmark, index) => {
                    return (
                        <div key={index} className={styles.bookmark}>
                            <h2>{bookmark.title}</h2>
                            <Link href={bookmark.url} target="_blank" rel="noopener noreferrer">
                                {bookmark.url}
                            </Link>
                            <div className={styles.image}>
                                <Image
                                    src={`/screenshots/${index}-desktop.png`}
                                    alt={bookmark.title}
                                    width={800}
                                    height={800}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
