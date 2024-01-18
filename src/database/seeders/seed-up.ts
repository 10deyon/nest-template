import roleData from './data/_categories.json';
import dbConn from '../db.config';

const seedUp = async () => {
  try {
    await dbConn.query('TRUNCATE TABLE categories');

    for (const [index, datum] of roleData.entries()) {
      await dbConn.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [datum.name, datum.description],
      );
    }

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === 'seed-up') {
  seedUp().then((r) => console.log('SUCCESSFUL'));
}
