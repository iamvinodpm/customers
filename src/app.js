const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const CON = process.env.CON;
const Customer = require("./models/customer");

const customer = new Customer( {
    "name":"nisha",
    "email":"abc@xyx.com"
});


app.get('/',(req,res)=>{
    res.send(customer);
})

app.post('/',(req,res)=>{
    res.send("This is a POST request");
})

app.post('/api/people',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

app.get('/api/customers',async (req,res)=>{
    const result = await Customer.find();
    res.send({"customers":result});
})



const start = async() => {
    try{
        await mongoose.connect(CON);
        app.listen(PORT,()=>{
            console.log("Server is running on port "+ PORT + "!!!!!");
        })
    }catch(error){
        console.log(error.message);
    }
};

start();