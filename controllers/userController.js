const users = require("../Data/users");

const getAllUsers =(req, res)=>{
    res.status(200).json(users)
}
const getUsersById =(req, res) =>{
    const id = parseInt(req.params.id)
    const user = users.find((u) => u.id === id)

    if(!user){
        return res.status(404).json({massag:"user not found"})
    }
     res.status(200).json(user);
    }
const createUser = (req, res)=>{
    const {name, email} =req.body;

      if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
    }
     const newUser = {
    id: users.length + 1 ,
    name,
    email,
  };
    users.push(newUser)
    res.status(201).json(newUser)
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
    
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const {name, email}= req.body;
  if (name) user.name = name;
  if (email) user.email =email;
  res.status(200).json(user);
}
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1)[0];
  res.status(200).json({ message: "User deleted successfully", user: deletedUser });
};
module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
};