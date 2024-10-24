import React, { useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";
import { saveToIndexedDB, loadFromIndexedDB } from "./indexeddb";

// Define the type for your rows
interface RowData {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [data, setData] = useState<RowData[]>([]);
  const [name, setName] = useState<string>(""); // Form input state

  // Initialize SQLite and load from IndexedDB on component mount
  useEffect(() => {
    const loadDb = async () => {
      const SQL = await initSqlJs({
        locateFile: (file) =>
          `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/${file}`,
      });

      // Try to load the database from IndexedDB
      const dbFile = await loadFromIndexedDB();

      if (dbFile) {
        console.log("Loaded database from IndexedDB");
        const loadedDb = new SQL.Database(dbFile);
        setDb(loadedDb);
        queryDatabase(loadedDb);
      } else {
        console.log("Creating a new database in memory");
        const newDb = new SQL.Database();
        newDb.run(
          "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)"
        );
        setDb(newDb);
        queryDatabase(newDb);
      }
    };

    loadDb();
  }, []);

  // Function to query the database and set the data state
  const queryDatabase = (database: Database) => {
    const result = database.exec("SELECT * FROM test");
    if (result.length > 0) {
      const rows = result[0].values.map((row) => ({
        id: row[0] as number,
        name: row[1] as string,
      }));
      setData(rows);
    }
  };

  // Function to insert new data into the database
  const insertData = () => {
    if (db && name.trim() !== "") {
      // Insert the name into the database
      db.run("INSERT INTO test (name) VALUES (?)", [name]);

      // Query the database again to update the displayed data
      queryDatabase(db);

      // Save the updated database to IndexedDB
      const dbFile = db.export();
      saveToIndexedDB(dbFile);

      // Clear the input field
      setName("");
    }
  };

  return (
    <div>
      <h1>SQLite + IndexedDB Example</h1>

      {/* Form to insert data */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a name"
      />
      <button onClick={insertData}>Add Name</button>

      {/* Display the data */}
      <h2>Data:</h2>
      <ul>
        {data.map((row) => (
          <li key={row.id}>
            ID: {row.id}, Name: {row.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
