const express = require("express");
const bodyParser = require("body-Parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html");

})
app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
const jsonData = JSON.stringify(data);
  //console.log(firstName, lastName, email);

const url = "https://us21.api.mailchimp.com/3.0/lists/b8bfa9fe8c";

const options = {
  method: "POST",
  auth: "Olaoluwa:ef9f9f72e80ec4df59a67809d05765c4-us21"
}
  const request = https.request(url, options, function(response) {
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});


//api keys 1e8321101d2a0f3ccaa84c6e92a7b4ca-us21     b8bfa9fe8c

// ef9f9f72e80ec4df59a67809d05765c4-us21 //
