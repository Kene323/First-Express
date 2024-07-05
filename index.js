// npm init (Typed in the terminal)
// npm i express (Copied from NPM website)
// npm i nodemon (Copied from NPM website)
// npm i --save-dev @types/express (Typed in the terminal)
// npm i uuid (Copied from NPM website)

// Import Express
const { json } = require("body-parser")
const express = require("express")
const app = express()
const {v4: uuidv4} = require('uuid')

app.use(express.json())
const userData = []

app.get("/api/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Hello, this is my first express app",
        data: userData
})
})

app.post("/api/create-user", (req, res)=>{
    const {name, email} = req.body
    if (!name || !email){
        return res.status(404).json({
            success: false,
            message: "Please fill all fields"
        })
}
const obj = {
    id: uuidv4(),
    name: name,
    email: email,
    company: "Kode10X",
    date: new Date()
}
userData.push(obj)
res.status(201).json({
    success: true,
    message: "data submitted",
    result: obj
})
    })

app.delete("/api/delete-user/:id", (req, res)=>{
    const userId = req.params.id // extract the id parameter from the url
    const userIndex = userData.findIndex((user)=>user.id === userId) // searches for the user

    if(userIndex != -1){
        userData.splice(userIndex, 1)
        res.status(200).json({
            success: true,
            message: "user deleted succesfully",
            data: userData
    })
    }else{
        res.status(404).json({
            success: false,
            message: "user NOT FOUND"
        })
    }
})

app.put("/api/update-user/:id", (req, res)=>{
    const userId = req.params.id
    console.log(req.params);
    console.log(req.params.id);
    const {name, email} = req.body
    const updateUser = userData.find((profile)=> profile.id === userId)

    if (updateUser){
        if(name) updateUser.name = name
        if(email) updateUser.email = email
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            result: updateUser
        })
    }else{
        res.status(404)>json({
            success: false,
            message: "User not found"
    })
    }
})

const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})
