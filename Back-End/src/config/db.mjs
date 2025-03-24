import oracledb from "oracledb";

const dbconfig = {
  user: "urban_food",
  password: "702150",
  connectString: "localhost:1521/FREEPDB1",
};

const execution = async (query, bodyParam = []) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    const result = await connection.execute(query, bodyParam, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true,
    });

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

export default execution;
