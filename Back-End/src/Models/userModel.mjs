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
    p_CRUD_TYPE: newuser.p_CRUD_TYPE,
    p_USER_ROLE: newuser.p_USER_ROLE,
    p_USER_NAME: newuser.p_USER_NAME,
    p_USER_EMAIL: newuser.p_USER_EMAIL,
    p_USER_PASSWORD: newuser.p_USER_PASSWORD,
  };

  const query = `
  
    BEGIN
    UsersControllerProcedure(
        p_CRUD_TYPE     => :p_CRUD_TYPE,
        p_USER_ROLE     => :p_USER_ROLE, 
        p_USER_NAME     => :p_USER_NAME,
        p_USER_EMAIL    => :p_USER_EMAIL,
        p_USER_PASSWORD => :p_USER_PASSWORD
      );
    END;
  `;

  try {
    await execution(query, params);
    return "User Created Successfully ...";
  } catch (error) {
    if (error.errorNum === 20002) {
      return "User Email Already Exists!";
    } else if (error.errorNum === 20000) {
      return "Invalid User Role !!!";
    } else if (error.errorNum === 20007) {
      return "Null Values are not Accepted!";
    }
  }
};

//  User Login Method
const userLogin = async (loginCredentials) => {
  const query =
    "SELECT * FROM USERS WHERE USER_EMAIL = :USER_EMAIL AND USER_PASSWORD=:USER_PASSWORD";
  const response = await execution(query, loginCredentials);
  if (response.length <= 0) {
    return "No user Available !!!";
  } else {
    return response;
  }
};

// Update User By ID
const updateUser = async (updateFields) => {
  const params = {
    p_USER_ID: updateFields.p_USER_ID,
    p_CRUD_TYPE: updateFields.p_CRUD_TYPE,
    p_USER_ROLE: updateFields.p_USER_ROLE,
    p_USER_NAME: updateFields.p_USER_NAME,
    p_USER_EMAIL: updateFields.p_USER_EMAIL,
    p_USER_PASSWORD: updateFields.p_USER_PASSWORD,
  };

  const query = `
  
    BEGIN
    UsersControllerProcedure(
        p_CRUD_TYPE     => :p_CRUD_TYPE,
        p_USER_ID       => :p_USER_ID,
        p_USER_ROLE     => :p_USER_ROLE, 
        p_USER_NAME     => :p_USER_NAME,
        p_USER_EMAIL    => :p_USER_EMAIL,
        p_USER_PASSWORD => :p_USER_PASSWORD
      );
    END;
  `;

  try {
    await execution(query, params);
    return "User Updated Successfully ...";
  } catch (error) {
    if (error.errorNum === 20001) {
      return "Invalid User!";
    } else if (error.errorNum === 20000) {
      return "Invalid User Role !!!";
    } else if (error.errorNum === 20007) {
      return "Null Values are not Accepted!";
    } else if (error.errorNum === 20002) {
      return "User Email Already Exists!";
    }
  }
};

// Delete User By ID Method
const deleteUser = async (deleteFields) => {
  const params = {
    p_USER_ID: deleteFields.p_USER_ID,
    p_CRUD_TYPE: deleteFields.p_CRUD_TYPE,
  };

  const query = `
  
    BEGIN
    UsersControllerProcedure(
        p_CRUD_TYPE     => :p_CRUD_TYPE,
        p_USER_ID       => :p_USER_ID
      );
    END;
  `;

  try {
    await execution(query, params);
    return "User Deleted Successfully ...";
  } catch (error) {
    if (error.errorNum === 20001) {
      return "Invalid User!";
    }
  }
};

export { getAllUsers, createUser, userLogin, updateUser, deleteUser };
