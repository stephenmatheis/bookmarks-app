import { createClient } from '@/lib/supabase/server';
import { Bookmark } from '@/types/types';
import { Bookmarks } from '@/components/bookmarks';
import styles from './page.module.scss';

export default async function RootPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <main className={styles.main}>
                <h1>Please log in to view your bookmarks.</h1>
            </main>
        );
    }

    const { data } = await supabase.from('bookmarks').select().lte('id', 4);

    return (
        <main className={styles.main}>
            <h1>Bookmarks</h1>
            <Bookmarks bookmarks={data as Bookmark[]} />
        </main>
    );
}
