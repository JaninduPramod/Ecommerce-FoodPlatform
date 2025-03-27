import execution from "../config/db.mjs";

// All Users Method
const getAllUsers = async () => {
  const query = "SELECT * FROM USERS";
  const response = await execution(query);

  if (response.length > 0) {
    return response;
  } else {
    return "No users Available !!!";
  }
};

// Create new User Method
const createUser = async (newuser) => {
  const params = {
    USER_ROLE: newuser.USER_ROLE,
    USER_NAME: newuser.USER_NAME,
    USER_EMAIL: newuser.USER_EMAIL,
    USER_PASSWORD: newuser.USER_PASSWORD,
  };

  const query = `
      INSERT INTO USERS (USER_ROLE, USER_NAME, USER_EMAIL,USER_PASSWORD) 
      VALUES (:USER_ROLE, :USER_NAME, :USER_EMAIL, :USER_PASSWORD)
    `;

  try {
    await execution(query, params);
    return "User Created Successfully ...";
  } catch (error) {
    if (error.errorNum === 1) {
      return "Email Already Exists !!!";
    } else if (error.errorNum === 2290) {
      return "Invalid User Role !!!";
    } else if (error.errorNum === 1400) {
      return "Null values are Not accepted !!!";
    }
  }
};

//  User by ID Method
const getUserByID = async (USER_ID) => {
  const query = "SELECT * FROM USERS WHERE USER_ID = :USER_ID";
  const response = await execution(query, [USER_ID]);
  if (response.length <= 0) {
    return "Invalid User ID !!!";
  } else {
    return response;
  }
};

// Update User By ID
const updateUser = async (USER_ID, updateFields) => {
  const query = `
      UPDATE USERS
      SET USER_ROLE = :USER_ROLE,
          USER_NAME = :USER_NAME,
          USER_EMAIL = :USER_EMAIL,
          USER_PASSWORD = :USER_PASSWORD
          
      WHERE USER_ID = :USER_ID
    `;

  const params = [
    updateFields.USER_ROLE,
    updateFields.USER_NAME,
    updateFields.USER_EMAIL,
    updateFields.USER_PASSWORD,
    USER_ID,
  ];

  try {
    await execution(query, params);

    return "User Updated Successfully ...";
  } catch (error) {
    if (error.errorNum === 2290) {
      return "Invalid User Role !!!";
    } else if (error.errorNum === 1407) {
      return "Null values are Not accepted !!!";
    }
  }
};

// Delete User By ID Method
const deleteUser = async (USER_ID) => {
  const query = "DELETE FROM USERS WHERE USER_ID = :USER_ID";

  try {
    const userAvailablity = await getUserByID(USER_ID);
    if (!userAvailablity || userAvailablity == "Invalid User ID !!!") {
      return "Invalid User ID !!!";
    } else {
      await execution(query, [USER_ID]);
      return "User Deleted Successfully ...";
    }
  } catch (error) {
    if (error.errorNum === 2292) {
      return "User is already assigned to some other table ...";
    } else if (error.errorNum === 1403) {
      return "Null values are Not accepted !!!";
    }
  }
};

export { getAllUsers, createUser, getUserByID, updateUser, deleteUser };
