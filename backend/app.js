if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/*
const {
  S3Client,
  PutObjectCommand
} = require("@aws-sdk/client-s3");

const s3Config = {
  accessKeyId: process.env.AKIA3FPU3UHCJEBJ7U5S,
  secretAccessKey: process.env.MxJfxeiefvYRGmtu650BGEX3Qp7nxWIGEOQmiPA3,
  region: "us-west-1",
};

const s3Client = new S3Client(s3Config);
*/


const { sequelize, User, Token } = require("./models");
const express = require("express");
const app = express();

//app.use(fileUpload());

app.use(express.json());
const axios = require("axios");
const cors = require("cors");
const { response } = require("express");
app.use(cors());

app.use(express.json());

const userRouter = require("./routers/user");
const accountRouter = require("./routers/account");


//const fileUpload = require("express-fileupload");



const port = process.env.PORT || 5001;

app.use(userRouter);
app.use(accountRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

app.post("/atms", (req, res) => {
  const apiKey = process.env.GOOGLE_MAP_KEY;

  let locationCurr;
  let latitude;
  let longitude;
  let atms = [];
  let address = req.body.address;
  const radius = 10000; // in meters
  console.log(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  //get user location
  let url2;
  axios
    .get(url)
    .then((data) => {
      console.log(data.data);
      locationCurr = data.data.results[0].geometry.location;
      latitude = locationCurr.lat;
      longitude = locationCurr.lng;
      console.log(locationCurr);
      atms.push(locationCurr);
      console.log("here");
      url2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bank&keyword=chase&key=${apiKey}`;
      atm();
    })
    .catch((error) => {
      console.log(error);
    });

  let atm = function () {
    axios
      .get(url2)
      .then((response) => {
        // console.log(response.data.results[0]);

        for (let i = 0; i < response.data.results.length; i++) {
          atms.push(response.data.results[i].geometry.location);
        }
        res.send(JSON.stringify(atms));
      })
      .catch((error) => {
        console.log(error);
      });
  };
});

/*
app.post("/upload", async (req, res) => {
  const file = req.files.file;
  const fileName = req.files.file.name;

  const bucketParams = {
    Bucket: process.env.bankapppicturebucket,
    Key: fileName,
    Body: file.data,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    res.send(data)
  } catch (err) {
    console.log("Error", err);
  }
});
*/

const main = async () => {
  // remove the force option to avoid dropping the table
  await sequelize.sync({ alter: true });
};

main();
