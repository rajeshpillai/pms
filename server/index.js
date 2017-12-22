const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require('uuid/v4');

const app = express();

app.set("view engine", 'ejs');

app.use(express.static("public"));

var port = 3001;


var projects = [];

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

app.post("/project", function (req, res) {
    console.log("create: ", req.body);
    var project = {
        id: uuidv4(),
        projectName: req.body.projectName,
        desc: req.body.desc
    }

    projects.push(project);

    res.json(projects);
});

app.post("/project/edit", function (req, res) {
    console.log("udpate: ", req.body);
    var project = {
        id: req.body.id,
        projectName: req.body.projectName,
        desc: req.body.desc
    }

   for(var i =0; i < projects.length; i++) {
       if (projects[i].id == project.id) {
           projects[i] = project;
           break;
       }
   }

    console.log("PROJECT EDIT: ",project);

    res.json(projects);
});
