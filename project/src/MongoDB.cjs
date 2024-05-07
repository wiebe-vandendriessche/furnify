// backend/src/server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');
const Contact = require('./model/ContactModel.cjs');
app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
    res.send("Hello from node API")
});

app.get('/api/contact/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact);
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

app.post('/api/contact', async (req, res) => {
    try{
        const contact = await Contact.create(req.body);
        res.status(200).json(contact);
    }catch (error){
        res.status(500).json({message: error.message});
    }

})

app.put('/api/contact/:email', async (req,res)=>{
    try{
        const {email}=req.params;
        const contact = await Contact.findOne({ email });

        if(!contact){
            return res.status(404).json({message:"Contact not found"});
        }

        await Contact.findByIdAndUpdate(contact._id, req.body);


        const updatedContact = await Contact.findById(contact._id);

        res.status(200).json(updatedContact);

    }catch (error){
        res.status(500).json({message: error.message});
    }
})

mongoose.connect("mongodb+srv://nathan5c:LMfnKY9AGivMGBy4@cluster0.r84ekpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log('server is running on port 3000')
        });
    }).catch(() => {
    console.log("Connection failed");
})
