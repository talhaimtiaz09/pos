const { pool } = require("./db");
const fs = require("fs");
const path = require("path");

// Function to execute SQL file
const executeSQLFile = async (filePath) => {
  const fullPath = path.join(__dirname, filePath);
  const sql = fs.readFileSync(fullPath, "utf-8");
  try {
    await pool.query(sql);
    console.log("SQL file executed successfully.");
  } catch (err) {
    console.error("Error executing SQL file:", err);
  }
};

// Function to create tables (reads from SQL file)
const createTablesFromSQLFile = async () => {
  await executeSQLFile("setup.sql");
};

// Example of how to delete tables (manually specified)
const deleteTables = async (tableNames) => {
  for (const tableName of tableNames) {
    const query = `DROP TABLE IF EXISTS ${tableName} CASCADE;`;
    try {
      await pool.query(query);
      console.log(`Table ${tableName} deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting table ${tableName}:`, err);
    }
  }
};

// Run the functions
(async () => {
  await createTablesFromSQLFile();
  // To delete tables, uncomment the line below and specify the table names
  // await deleteTables(['users', 'customers']);
  await pool.end(); // Close the pool connection
})();
