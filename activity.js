// Imports
const express = require("express")
const app = express()
// const {json} = require("body-parser")
const {v4: uuidv4} = require("uuid")
app.use(express.json()) // middleware
//data
const phoneData = [
    {
        "id": uuidv4(),
        "brand": "Apple",
        "model": "iphone 13 Pro",
        "price": 999,
        "year": 2021
    },
    {
        "id": uuidv4(),
        "brand": "Samsung",
        "model": "Galaxy S21",
        "price": 799,
        "year": 2022
    }
]
//routes
app.get("/api/phone", (req, res)=>{
    res.status(200).json({
        success: true,
        result: phoneData.length,
        message: "Phone data Obtained",
        data: phoneData
    })
} )

app.post("/api/create-phone", (req, res)=>{
    const{brand, model, price, year} = req.body
    if(!brand || !model || !price || !year){
        return res.status(404).json({
            success: false,
            message: "please fill all fields"
        })
    }
const obj = {
    "id": uuidv4(),
    brand: brand,
    model: model,
    price: price,
    year: year,
    date: new Date()
}
phoneData.push(obj)
res.status(201).json({
    success: true,
    message: "data submitted",
    result: obj
})
})

app.delete("/api/delete-phone/:id", (req, res)=>{
    const phoneId = req.params.id // Extract the id parameter from the URL
    const phoneIndex = phoneData.findIndex((phone)=>phone.id === phoneId)

    if(phoneIndex !== -1){
        phoneData.splice(phoneIndex, 1)
        res.status(200).json({
            success: true,
            message: "Phone deleted successfully",
            data: phoneData
        })
    }else{
        res.status(404).json({
            success: false,
            message: "Phone not found"
        })
    }
})

//listen
const PORT = 6969
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})




















