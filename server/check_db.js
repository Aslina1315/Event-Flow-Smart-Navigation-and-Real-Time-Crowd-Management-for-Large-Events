import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function checkDb() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  const events = await db.all('SELECT * FROM events_v2');
  console.log('--- DATABASE CHECK ---');
  console.log(`Found ${events.length} events in events_v2 table.`);
  events.forEach(e => console.log(`- ${e.title} (${e.location})`));
  
  await db.close();
}

checkDb().catch(console.error);
