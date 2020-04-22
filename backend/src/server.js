const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-awlzp.mongodb.net/omnistack7?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

//Retornar json
app.use(express.json());

//Envio de arquivos
app.use(express.urlencoded({ extended: true }));

//Arquivo
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

//req e res middleware, intercepta request e response
// app.get('/teste', (req, res) => {
//     return res.send('hello word');
// })

server.listen(process.env.PORT || 3333);
