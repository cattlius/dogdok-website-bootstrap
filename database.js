import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();
  
export async function getPostTable(postNum) {
  const [postsTable] =  await pool.query(`
  SELECT *
  FROM posts
  ORDER BY post_created DESC
  LIMIT ?
  `, [postNum]);
  return postsTable;
}

export async function getGalleryImages(){
  const [galleryTable] =  await pool.query(`
  SELECT *
  FROM gallery
  ORDER BY image_added DESC
  `);
  return galleryTable;
}