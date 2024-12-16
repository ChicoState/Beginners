import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDB() {
    return open({
        filename: './backend/beginners/db.sqlite3', // Adjust based on your database path
        driver: sqlite3.Database,
    });
}

export default async function handler(req, res) {
    const db = await openDB();

    if (req.method === 'GET') {
        try {
            // Fetch expert information
            const expert = await db.get(
                'SELECT name, email, phone, bio, expertise FROM expert WHERE id = ?',
                [1] // Assuming id=1 is the expert
            );

            if (!expert) {
                return res.status(404).json({ error: 'Expert not found' });
            }

            // Fetch posts associated with the expert
            const posts = await db.all('SELECT id, title, content FROM search_post');

            res.status(200).json({ expert, posts });
        } catch (error) {
            console.error('Error fetching expert and posts:', error);
            res.status(500).json({ error: 'Failed to fetch expert data and posts' });
        }
    }
}

