let express=require("express");

let app=express();

app.get('/',(req,res)=>{
    res.send("Get the data")
})

app.listen(8080,()=>{
    console.log("port is running at 3000!")
})




