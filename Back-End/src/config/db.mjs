import oracledb from "oracledb";

const dbconfig = {
  user: "urban_food",
  password: "702150",
  connectString: "localhost:1521/FREEPDB1",
};

const execution = async (query, params = {}) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbconfig);

    const result = await connection.execute(query, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true,
    });

    return result.rows || result;
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
};

export default execution;
