// index.js
// where your node app starts

// init project
import express from "express";
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from "cors";
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
const isvalidDate = (date) => {
  return date.toUTCString() !== "Invalid Date";
};

app.use("/api/:date?", (req, res) => {
  const date = new Date(req.params.date);
  if (req.params.date === undefined) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().getTime()
    });
  } else if (isvalidDate(req.params.date)) {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else if (typeof +req.params.date === "number") {
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;

    const year = date.getFullYear();
    const date_str = `${year}-${month}-${day}`;

    if (isvalidDate(date_str)) {
      return res.json({
        unix: +req.params.date,
        utc: new Date(date_str).toUTCString()
      });
    }
  }
  return res.json({ error: "Invalid Date" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
