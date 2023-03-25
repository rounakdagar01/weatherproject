const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){


  const query = (req.body.cityName);
  // const apikey = "ed8510c2e27de3ac92b8f41c10ea2ef0"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=ed8510c2e27de3ac92b8f41c10ea2ef0"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherproject = JSON.parse(data);
      const temp = weatherproject.main.temp
      const weatherDescription = weatherproject.weather[0].description;
      res.write("<p> The weather is currently" + weatherDescription + "</p>");
      res.write("<h1>The temperature in "+query+" is" + temp + "degrees celcius.</h1>");
      res.send();
    })
  })

})


app.listen("3000", function(){
  console.log("server started on port 3000");
});
