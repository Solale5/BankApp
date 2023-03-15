
const { Pool , Client } = require("pg");

const credentials = {
  user: "Team1",
  host: "bankappdb.civbp2vs1lry.us-east-2.rds.amazonaws.com",
  database: "BankAppDB", // "BankTeam1"
  password: "BankTeam1",
  port: 5432,
};


async function poolDemo() {
  const pool = new Pool(credentials);
  await pool.connect()

  const insertion = await pool.query('INSERT INTO Source (sourceType,sourceLocation, id) VALUES ($1,$2, $3);', ['ATM', 'San Jose' , 5])
  const res = await pool.query('SELECT * FROM Source')

  console.log('Source Table', insertion, res )
  
  const now = await pool.query("SELECT NOW()");
  
  await pool.end();

  return now;
}



(async () => {
    const poolResult = await poolDemo();
    console.log("Time with pool: " + poolResult.rows[0]["now"]);
  
})();

