import express, { json } from "express";
const PORT = 5000;
const app = express();
import { userSchema } from "./schema/index.js";

app.use(json());
let users = [];

// middleware

app.use("/", (req, res, next)=>{
    console.log("Request------->", req.originalUrl)
    next()
})

// Add User

app.post("/users", async (req, res) => {
  try {
    await userSchema.validateAsync(req.body);
    users.push({ id: Date.now().toString(36), ...req.body });
    res.send({ message: "User Added Successfully" });
  } catch (err) {
    res.send({ err, message: "Something Went Wrong" });
  }
});

// Delete User

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    users = users.filter((obj) => obj.id !== id);
    res.send({ message: "User Deleted Successfully" });
  } catch (err) {
    res.send({ err, message: "Something Went Wrong" });
  }
});

// Edit User

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const editUser = users.findIndex((obj) => obj.id === id);
    users.splice(editUser, 1, { ...req.body, id });
    res.send({ user: req.body, message: "User Updated Successfully" });
  } catch (err) {
    res.send({ err, message: "Something Went Wrong" });
  }
});

// Get All Users

app.get("/users", (req, res) => {
  res.send({ users });
});

app.get("/",(req, res)=>{
    res.send(new Date().toString())
})

console.log("All users", users);
app.listen(PORT, () => {
  console.log("Server is Running");
});
