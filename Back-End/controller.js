const users = [
  {
    id: "1",
    name: "janindu",
    age: 21,
    address: "Matara",
  },
  {
    id: "2",
    name: "Tharuka",
    age: 23,
    address: "Palatuwa",
  },
  {
    id: "3",
    name: "Shan",
    age: 27,
    address: "Dickwella",
  },
];

const GetUsers = (callback) => {
  callback(users);
};

const userById = (callback, id) => {
  const user = users.find((user) => user.id == id);

  if (user) {
    callback(user);
  } else {
    callback("No user");
  }
};

exports.GetUsers = GetUsers;
exports.userById = userById;
