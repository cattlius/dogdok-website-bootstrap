import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Landing Page Posts Database Function
  
export async function getPostTable(postNum) {
  const [postsTable] =  await pool.query(`
  SELECT *
  FROM posts
  ORDER BY post_created DESC
  LIMIT ?
  `, [postNum]);
  return postsTable;
}

// Archive Gallery Database Function

export async function getGalleryImages(){
  const [galleryTable] =  await pool.query(`
  SELECT *
  FROM gallery
  ORDER BY image_added DESC
  `);
  return galleryTable;
}

// Lonca Database (TBA)

// export async function getLounge(lounge){
//   switch (lounge) {
//     case 'all':
//       const [tableAll] =  await pool.query(`
//       SELECT *
//       FROM loncalar
//       ORDER BY member_point DESC
//       `);
//       return tableAll;
//     case 'lonca1':
//       const [table1] =  await pool.query(`
//       SELECT *
//       FROM loncalar
//       WHERE member_lounge = ?
//       ORDER BY member_point DESC
//       `, [lonca]);
//       return table1;
//     case 'lonca2':
//       const [table2] =  await pool.query(`
//       SELECT *
//       FROM loncalar
//       WHERE member_lounge = ?
//       ORDER BY member_point DESC
//       `, [lonca]);
//       return table2;
//     case 'lonca3':
//       const [table3] =  await pool.query(`
//       SELECT *
//       FROM loncalar
//       WHERE member_lounge = ?
//       ORDER BY member_point DESC
//       `, [lonca]);
//       return table3;
//     case 'lonca4':
//       const [table4] =  await pool.query(`
//       SELECT *
//       FROM loncalar
//       WHERE member_lounge = ?
//       ORDER BY member_point DESC
//       `, [lonca]);
//       return table4;
//   }
// }