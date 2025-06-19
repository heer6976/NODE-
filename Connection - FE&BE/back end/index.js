// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());

// app.get("/",(req,res)=>{
//     res.json({
//         msg:"Hello Smit How Are You ?",
//     })
// })
// app.listen(8000);


const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        msg:"This is Home Page!",
    })
});

app.get("/about", (req, res) => {
    res.json({
        msg:"This is About Page!",
    })
});

app.get("/contact", (req, res) => {
    res.json({
        msg:"This is Contact Page!",
    })
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});