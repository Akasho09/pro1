const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mysql = require("mysql2");
const bodyParser=require("body-parser");
const search1=require("../nodeandsql/public/home.js");
const { error } = require("console");
const { connect } = require("http2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jamia_college",
  insecureAuth: true,
});

require("dotenv").config();
const app = express();
const port = process.env.port || 3000;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // New
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json()); 


// Connect to the database
// connection.connect((error) => {
//   if (error) {
//     console.error("Error connecting to database: " + error);
//     return;
//   }
//   console.log("Connected to database as id " + connection.threadId);
//   connection.query("select * from client_master ", function (error, result) {
//     if (error) {
//       throw error;
//     }
//     // console.log(result[0]);
//   });
// });

// // Set Handlebars as the view engine
// const handlebars = exphbs.create({ extname: '.hbs',});
// app.engine('.hbs', handlebars.engine);
// app.set('view engine', '.hbs');

// // app.get('/home', (req, res) => {
// //   res.render('home.hbs', { title: 'Homepage' });
// // });
// app.get('/login' , (req,res)=>{
// res.render('login.hbs' );
// });

// ---->Handling specific routes  //

//login and landing page
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "login.html"));
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// home page
// app.get("/home", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "home.html"));
// });

// sign up page student
app.get("/signupstu", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signupstu.html"));
});

// app.post('/search' , (req,res)=>{
// // const tosearch=req.body;
// console.log(search1.tosearch);
// res.send('Data submitted successfully!');
// });
app.post('/searchpage', (req, res) => {
  // if (roleof === 'teacher') { 
    var inputValue = req.body.searched;
    try {
      connection.query('SELECT * FROM studentdata WHERE name=? OR id=? ' , [inputValue, inputValue] ,
        function(error, result){
          if(error){
            console.error(error); 
            res.status(500).send('Error occurred during search'); 
          } else {
            console.log(result); 
            res.json(result);  
          }
        }
      );
    } catch(error) {
      console.error(error); 
      res.status(500).send('Error occurred during search'); 
    }
  // else {
  //   // Handle unauthorized access if role is not 'teacher'
  //   res.status(401).send('Unauthorized access');
  // }
});
// try {
//   connection.query(
//     "SELECT * FROM studentdata WHERE name=? OR id=?" ,[inputValue ,inputValue] , 
//     function (error, result) {
//       if (error) {
//         if (error.errno == 1062) {
//           console.error("Error inserting data:", error);
//           res
//             .status(400)
//             .send("Duplicate entry. Please try again with a different ID.");
//         } else {
//           console.error("Error inserting data:", error);
//           res.status(500).send("Error saving data!");
//       }
//       }
//       res.sendFile(path.join(__dirname, "public", "home.html"));
//       // res.send("found");
//     }
//   );
// } catch (error) {
//   console.error(error);
//   res.status(500).send("Error saving data!");
// }
  // }});




app.post("/signupstu", async (req, res) => {
  const { username, email, phone, password } = req.body;
  try {
    connection.query(
      "INSERT INTO userdetails (username , email ,phone , password ) VALUES ( ?, ?, ?,?) ",
      [username, email, phone, password],
      function (error, result) {
        if (error) {
          if (error.errno == 1062) {
            console.error("Error inserting data:", error);
            res
              .status(400)
              .send("Duplicate entry. Please try again with a different ID.");
          } else {
            console.error("Error inserting data:", error);
            res.status(500).send("Error saving data!");
        }
        }
        // res.sendFile(path.join(__dirname, "public", "home.html"));
        res.sendFile(path.join(__dirname, "public", "studenthome.html"));
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving data!");
  }
});

//teacher signup page
app.get("/signuptea", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signuptea.html"));
});

app.post("/signuptea", async (req, res) => {
  const { username, email, subject, password } = req.body;
  try {
    connection.query(
      "INSERT INTO teacherdetails (username , email ,subject , password ) VALUES ( ?, ?, ?,?) ",
      [username, email, subject, password],
      function (error, result) {
        if (error) {
          if (error.errno == 1062) {
            console.error("Error inserting data:", error);
            res
              .status(400)
              .send("Duplicate entry. Please try again with a different ID.");
          } else {
            console.error("Error inserting data:", error);
            res.status(500).send("Error saving data!");
          }
        }
        res.sendFile(path.join(__dirname, "public", "home.html"));
      }
    );
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Error saving data!");
  }
});


//add data page
app.post("/add.html", (req, res) => {
  const { id, name, email } = req.body;
  console.log(req.body);
  try {
    connection.query(
      "INSERT INTO studentdata (id , email ,name ) VALUES ( ?, ?, ?) ",
      [id, email, name],
      function (error, result) {
        if (error) {
          if (error.errno == 1062) {
            console.error("Error inserting data:", error);
            res
              .status(400)
              .send("Duplicate entry. Please try again with a different ID.");
          } else {
            console.error("Error inserting data:", error);
            res.status(500).send("Error saving data!");
          }
        }
        res.sendFile(path.join(__dirname, "public", "submit.html"));
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving data!");
  }
});

var roleof;
//login page handling
app.post('/login' , (req,res)=>{
var username=req.body.username;
var password=req.body.password;
var role=req.body.role;
roleof=role;
if(role==='student'){
connection.query("SELECT * FROM userdetails WHERE username =? and password=?" ,
[username,password] ,
function(error,result){
if(error){
  console.log(error);
}
else if(result!=""){
  console.log(result);
  // res.render('/home');  
  // res.sendFile(path.join(__dirname, "public", "home.html"));
  res.send (" STUDENT CORNER");
}
else{
  res.end("no user found");
}
});
}

else if(role==='teacher'){
  connection.query("SELECT * FROM teacherdetails WHERE username =? and password=?" ,
  [username,password] ,
  function(error,result){
  if(error){
    console.log(error);
  }
  else if(result!=""){
    console.log(result);
    // res.render('/home');  
    res.sendFile(path.join(__dirname, "public", "home.html"));
  }
  else{
    res.end("no user found");
  }
  });


}
});



//view page
app.get('/view' ,(req,res)=>{
//student data view page for teacher
  console.log(roleof);
  try {
    connection.query(" select * from studentdata ", function (error, results) {
      if (error) {
        console.log(error);
        res.status(400).send("errooooor");
        return;
      }
      else {
        console.log(results);
        let tableHtml = "<table>";
        tableHtml +=
          "<thead><tr><th> ID </th><th> Name </th><th> Email </th></tr></thead>";
        tableHtml += "<tbody>";
        results.forEach((student) => {
          tableHtml += `<tr><td>${student.id}</td><td>${student.name}</td><td>${student.email}</td></tr>`;
        });
        tableHtml += "</tbody></table>";

        res.send(tableHtml);
      }
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send("errooor");
}
});


// Handle form submission (assuming a POST request to "/add-student")
// app.post('/http://localhost:3000/add.html', async (req, res) => {
//   const { id,name, email } = req.body;

//   // Validate input (optional)

//   try {
//     // Connect to the database
//     const connection = await pool.getConnection();

//     // Prepare and execute the SQL query
//     const [result] = await connection.execute(
//       'INSERT INTO studentdata (id,name, email) VALUES (?, ?, ?)',
//       [id ,name, email]
//     );

//     // Close the connection
//     await connection.release();

//     // Send success response
//     res.send('Student added successfully!');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error saving data!');
//   }
// });

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});