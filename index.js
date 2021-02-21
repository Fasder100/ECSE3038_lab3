const express = require("express");
const mongoose = require("mongoose");
const { reset } = require("nodemon");

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://User3:qazxsw123@cluster0.gu3mc.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const dataSchema = new mongoose.Schema({
location: {
    type: String,
    required: true

},
lat: {
    type: String,
    required: true

},
long: {
    type: String,
    required: true

},
percentage_full: {
    type: String,
    required: true

},


});

const Data = mongoose.model('Data',dataSchema);

app.get("/data", (req,res)=>{
    Data.find( (err, value) =>{
        if (err)res.status(400).json("Bad Request");
        res.json(value);
    }); 

});

app.post("/data", (req,res) => {

    let newData = new Data({
        location: req.body.location,
        lat: req.body.lat,
        long: req.body.long,
        percentage_full: req.body.percentage_full

    })

    newData.save((err, data) => {

        if(err) res.status(400).json("Bad Request");
        res.json(data);


    });



});

app.patch("/data/:id", (req, res) => {

 let id = req.params.id;
 let update = req.body;

 Data.findOneAndUpdate({_id: id},update, (err, value)=> {

    if(err) res.status(400).json("Bad Request");
    res.json(value);
 });
});

app.delete("/data/:id", (req,res) => {

    let id = req.params.id;
    Data.findOneAndDelete({_id: id}, (err) => {
            if(err) res.status(400).json("Bad Request");
            res.json({
                success: true,
            });

    });
});

app.listen(3000);
