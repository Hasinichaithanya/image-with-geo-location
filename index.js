const express = require("express");
const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

var db;
var images;
const uri =
  "mongodb+srv://hasinichaithanya04:@cluster0.suc7fzf.mongodb.net/geo_images?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

function Connect() {
  client
    .connect()
    .then((res) => {
      console.log("Connected to db");
      db = client.db("geo_images");
      images = db.collection("images");
    })
    .catch((err) => {
      console.error("Error connecting : ", err.message);
      process.exit(1);
    });
}
Connect();

//get all images api
app.get("/", async (req, res) => {
  images
    .find({})
    .toArray()
    .then((imagesList) =>
      res.status(200).json({
        total_count: imagesList.length,
        imagesList,
      })
    )
    .catch((e) => {
      res.status(400).json("Error fetching the data:", e.message);
      console.log(err);
    });
});

//add user api
app.post("/add-image", (req, res) => {
  const imageDetails = req.body;

  images
    .insertOne(imageDetails)
    .then((imageDetails) =>
      res.status(200).json({
        message: "Image is added successfully",
        imageDetails,
        success: true,
      })
    )
    .catch((e) => {
      res.status(400).json("Error: ", e);
      console.log(err);
    });
});

module.exports = app.listen(5000, () =>
  console.log("Server is running, listening to port 5000")
);
