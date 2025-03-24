// import execution from "../config/db.mjs";

// // All Users Method
// const getAllSuppliers = async () => {
//   const query = "SELECT * FROM suppliers";
//   const users = await execution(query);
//   if (users.length > 0) {
//     return users;
//   } else {
//     return "false";
//   }
// };

// // Create new User Method
// const createSupplier = async (newuser) => {
//   const params = {
//     username: newuser.username,
//     user_password: newuser.user_password,
//     user_email: newuser.user_email,
//     user_role: newuser.user_role,
//   };

//   const query = `
//       INSERT INTO mainusers (username, user_password, user_email,user_role)
//       VALUES (:username, :user_password, :user_email, :user_role)
//     `;

//   await execution(query, params);
// };

// //  User by ID Method
// const getSupplierByID = async (id) => {
//   const query = "SELECT * FROM mainusers WHERE user_id = :id";
//   const user = await execution(query, [id]);
//   if (user.length < 1) {
//     return "false";
//   }
//   return user;
// };

// // Update User By ID
// const updateSupplier = async (id, updateFields) => {
//   const query = `
//       UPDATE mainusers
//       SET username = :username,
//           user_password = :user_password,
//           user_email = :user_email,
//           user_role = :user_role

//       WHERE user_id = :id
//     `;

//   const params = [
//     updateFields.username,
//     updateFields.user_password,
//     updateFields.user_email,
//     updateFields.user_role,
//     id,
//   ];

//   await execution(query, params);

//   return getUserByID(id);
// };

// // Delete User By ID Method
// const deleteSupplier = async (id) => {
//   const query = "DELETE FROM mainusers WHERE user_id = :id";
//   return await execution(query, [id]);
// };

// export {
//   getAllSuppliers,
//   createSupplier,
//   getSupplierByID,
//   updateSupplier,
//   deleteSupplier,
// };
