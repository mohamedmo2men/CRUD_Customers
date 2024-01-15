const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
var moment = require('moment');
var methodOverride = require('method-override')

const Customer = require("./model/customer.schema");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose
  .connect(
    "mongodb+srv://mohamedmo2men:2069520695@cluster0.zenvzjv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.get("/", (req, res) => {
  Customer.find()
    .then((result) => {
      res.render("index", { customers: result , moment:moment});
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/edit/:id", (req, res) => {
  Customer.findById(req.params.id).then((result) => {
    res.render("user/edit", {detailsCustomer:result , moment:moment })
    }).catch((err) => { err })


});
app.get("/user/:id", (req, res) => {
  Customer.findById(req.params.id).then((result) => {
    res.render("user/view" , {detailsCustomer:result , moment:moment })
    }).catch((err) => { err })

});

app.post("/user/add.html", (req, res) => {
  Customer.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/search", (req, res) => {
  Customer.find({firstName:req.body.searchText})
    .then((result) => {
     res.render("user/search" ,{customerSearch:result})
    })
    .catch((err) => {
      console.log(err);
    });
});
app.put("/edit/:id", (req, res) => {
  Customer.updateOne({_id:req.params.id} , req.body).then(() => {
    res.redirect("/")
    }).catch((err) => { err })

});
 
app.delete("/delete/:id", (req, res) => {
  Customer.deleteOne({ _id: req.params.id }).then(() => {
  res.redirect("/");
  });
}); 


