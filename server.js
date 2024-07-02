// module testing node.js server based on metanit.com
// https://metanit.com/web/javascript/19.1.php

const http = require("http");
const fs = require("fs");

http.createServer(function(request, response){

    let filePath = request.url.substring(1);

    filePath = filePath.split("?")[0];

    if(filePath == "")
        filePath = "index.html";

    filePath = "./" + filePath

    fs.readFile(filePath, function(error, data){

        if(error){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            if(filePath.endsWith(".js")) response.setHeader("Content-Type",
                "text/javascript");
            response.end(data);
        }
    });
}).listen(3000, function(){
    console.log("Server started at 3000");
});
