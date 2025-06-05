'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark } from '@/types/types';
import styles from './bookmarks.module.scss';

type BookmarksProps = {
    bookmarks: Bookmark[];
};

export function Bookmarks({ bookmarks }: BookmarksProps) {
    const ref = useRef(null);

    return (
        <div ref={ref} className={styles.bookmarks}>
            {bookmarks.map((bookmark) => {
                console.log(bookmark);

                return (
                    <div key={bookmark.id} className={styles.bookmark}>
                        <div className={styles.info}>
                            <div className={styles.avatar}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0" />
                                </svg>
                            </div>
                            <div className={styles.source}>iPhone</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            </svg>
                            <div className={styles.date}>{new Date(bookmark.created_at).toLocaleString()}</div>
                        </div>
                        {bookmark.image_url ? (
                            <Link href={bookmark.image_url} target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={bookmark.image_url}
                                    alt={bookmark.title}
                                    width={1920}
                                    height={1080}
                                    priority
                                />
                            </Link>
                        ) : (
                            <div className={styles.placeholder}>Image missing</div>
                        )}
                        <div className={styles.text}>
                            <div className={styles.title}>{bookmark.title}</div>
                            <Link href={bookmark.url} target="_blank" rel="noopener noreferrer">
                                {bookmark.url}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
