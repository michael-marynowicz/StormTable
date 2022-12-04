let http = require('http');
let formidable = require('formidable');

http.createServer(function (req, res) {

  //Create an instance of the form object
  let form = new formidable.IncomingForm();

  //Process the file upload in Node
  form.parse(req, function (error, fields, file) {
    let filepath = file.fileupload.filepath;
    let newpath = './uploads';
    newpath += file.fileupload.originalFilename;

    //Copy the uploaded file to a custom folder
    fs.rename(filepath, newpath, function () {
      //Send a NodeJS file upload confirmation message
      res.write('NodeJS File Upload Success!');
      res.end();
    });
  });

}).listen(80);



const net = require("net"), fs = require("fs");

let server, istream = fs.createReadStream("./uploads/Manuel-apprenti.pdf");

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!'); // This will serve your request to '/'.
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
 });

server = net.createServer(socket => {
    socket.pipe(process.stdout);
    istream.on("readable", function () {
        let data;
        while (data = this.read()) {
            socket.write(data);
        }
    })
    istream.on("end", function(){
        socket.end();
    })
    socket.on("end", () => {
        server.close(() => { console.log("\nTransfer is done!") });
    })
})

server.listen(8000, '0.0.0.0');


