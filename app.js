const express=require("express");
const app=express();
const https=require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(3000,function(){
  console.log("Server is running on 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/")

})
app.post("/",function(req,res){
  const query=req.body.cityName
  const apiKey="10ef02d84364880e508d10df97d2ce28"
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp
      const wDes=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon
      const nig="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write( "<p> "+"The weather is "+ wDes+ "<p>")
      res.write("<h1> "+"Temparature in "+query+" is "+temp+" </h1>")
      res.write("<img src="+nig+">")
      res.send();
  /*
  If you wanna send multiple send you can command with res.write first and than res.send
  */



      /*
      We can only have one res.send
      */

      // const arda={
      //   name:"arda",
      //   food:"az"
      // }
      // console.log(JSON.stringify(arda))
      // This is the opposite of JSON.parse
    })
  });
})


/*
/ means root
*/
