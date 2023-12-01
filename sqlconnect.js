var express = require('express');
var mysql = require('mysql');
var fs = require('fs');

var app = express();

var con = mysql.createConnection({
  host: "18.206.103.215",
  user: "tesla",
  password: "32TesLa95%",
  database: "teslaDB"
});

con.connect(function(err) {
  if (err) throw err;

  app.get('/getdata', function(req, res) {
    con.query("SELECT * FROM Vehicles", function(err, result, fields) {
      if (err) throw err;

      // Save data as HTML file
      var htmlContent = generateHTML(result);
      fs.writeFile('output.html', htmlContent, function(err) {
        if (err) throw err;
        console.log('HTML file saved!');
      });

      // Send JSON response
      res.json(result);
    });
  });

  // Serve the HTML file when accessing "/output.html"
  app.get('/output.html', function(req, res) {
    fs.readFile('output.html', 'utf8', function(err, data) {
      if (err) throw err;
      res.send(data);
    });
  });

  app.listen(3000, function() {
    console.log('Server is running on port 3000');
  });
});

function generateHTML(data) {
  let html = '<html><head><title>SQL Data</title></head><body><h1>SQL Data</h1>';
  html += '<table border="1"><tr><th>Vehicle ID</th><th>Last Name</th></tr>';

  data.forEach(function(row) {
    html += `<tr><td>${row.VehicleID}</td><td>${row.LastName}</td></tr>`;
  });

  html += '</table></body></html>';
  return html;
}

