import execution from "./db.mjs";

const getAllUsers = async () => {
  return await execution("SELECT * FROM persons");
};

export { getAllUsers };
