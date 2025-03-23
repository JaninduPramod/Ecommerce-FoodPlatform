import oracledb from "oracledb";

const dbconfig = {
  user: "urban_food",
  password: "702150",
  connectString: "localhost:1521/FREEPDB1",
};

const execution = async (query, bodyParam = []) => {
  const connection = await oracledb.getConnection(dbconfig);
  if (connection) {
    console.log("database connected");

    const result = await connection.execute(query, bodyParam, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true,
    });
    return result.rows;
  } else {
    console.log("Something went wrong");
  }

  connection.close();
};

export default execution;
