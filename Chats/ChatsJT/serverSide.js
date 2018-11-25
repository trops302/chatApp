
let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let path = require("path");
let port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

server.listen(port, function(){
  console.log("listening on port " + port);
  
  io.on("connection", function (socket) {
    console.log("Lietotajs pievienojas...");

    socket.on("disconnect", function(){
        console.log("lietotajs atvienojas....")
    });

    // Jauna zinja
    socket.on("newMessage", function (msgObject) {
      io.emit("newMessage", msgObject);
    });

    // Jauns dalibnieks
    socket.on("newMember", function (name) {
      io.emit("newMember", name);
    });
  });
});
