import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 5000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stateagency",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }

  console.log("Connected to the database");
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/register", upload.single("image"), (req, res) => {
  const { userName, password, contact, email, usertype } = req.body;
  const image = req.file;

  console.log("server side image is", req.file);

  const query =
    "INSERT INTO user (User_Name, password, Contact, Email, user_type, user_img) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      userName,
      password,
      contact,
      email,
      usertype,
      image.buffer,
      // image.buffer.toString("base64"),
    ],
    //[userName, password, contact, email, usertype,  Buffer.from(image.buffer, 'binary')],
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Failed to register user" });
        return;
      }
      res.status(200).json({ message: { userName, password } });
    }
  );
});

const upload2 = multer({ storage: multer.memoryStorage() });

app.post("/api/addproperty", upload2.single("image"), (req, res) => {
  const { description, status, room, price, address, zipcode, id } = req.body;
  const image2 = req.file;

  const query =
    "INSERT INTO property (Desciption, Status, Room, Price, Adress, zipCode, prop_image, User_ID) VALUES (?, ?, ?, ?, ?, ? , ?, ?) ";

  connection.query(
    query,
    [
      description,
      status,
      room,
      price,
      address,
      zipcode,
      image2.buffer,
      id,
      // image2.toString("base64"),
    ],
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Failed to register user" });
        return;
      }
      res.status(200).json({ message: "Registered successfully" });
    }
  );
});

app.get("/filter", (req, res) => {
  const { city, rooms, status } = req.query;

  const query =
    "SELECT Prop_ID, Desciption, Status, Adress, zipCode, Room, Price, prop_image FROM property WHERE Status LIKE ? AND Adress LIKE ? AND Room LIKE ?";
  const searchStatus = "%" + status + "%";
  const searchCity = "%" + city + "%";
  const searchRooms = "%" + rooms + "%";

  connection.query(
    query,
    [searchStatus, searchCity, searchRooms],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query: " + err.stack);
        res.status(500).json({ error: "Error executing MySQL query" });
        return;
      }

      const properties = results.map((property) => {
        return {
          Prop_ID: property.Prop_ID,
          Desciption: property.Desciption,
          Status: property.Status,
          Adress: property.Adress,
          zipCode: property.zipCode,
          Room: property.Room,
          Price: property.Price,
          prop_image: property.prop_image.toString("base64"),
        };
      });

      res.send(properties);
    }
  );
});

app.post("/api/login", (req, res) => {
  const { userName, password } = req.body;
  const query = "SELECT * FROM user WHERE User_Name = ? AND password = ?";

  connection.query(query, [userName, password], (err, result) => {
    const userid = result[0].User_ID;
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ success: false, message: "Failed to login" });
      return;
    }
    if (result.length === 1) {
      res
        .status(200)
        .json({ success: true, message: { userName, password, userid } });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Invalid username or password" });
    }
  });
});

app.get("/search/:key", (req, res) => {
  const searchKey = req.params.key;
  const query =
    "SELECT * FROM user INNER JOIN property ON user.User_ID = property.User_ID  WHERE property.Prop_ID LIKE ?";

  const searchValue = "%" + searchKey + "%";

  connection.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).json({ error: "Error executing MySQL query" });
      return;
    }

    const builderdetails = results.map((user) => {
      return {
        User_Name: user.User_Name,
        Contact: user.Contact,
        Email: user.Email,
        user_img: user.user_img.toString("base64"),
      };
    });

    res.send(builderdetails[0]);
  });
});

app.get("/portfolio/:key", (req, res) => {
  const searchKey = req.params.key;
  const query = "SELECT * FROM user WHERE User_ID LIKE ?";

  const searchValue = "%" + searchKey + "%";

  connection.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).json({ error: "Error executing MySQL query" });
      return;
    }

    const portfolio = results.map((user) => {
      return {
        User_Name: user.User_Name,
        Contact: user.Contact,
        Email: user.Email,
        user_img: user.user_img.toString("base64"),
      };
    });

    res.send(portfolio[0]);
  });
});

app.get("/portfolioproperties/:key", (req, res) => {
  const searchKey = req.params.key;

  const query = "SELECT * FROM property WHERE User_ID LIKE ?";

  const searchValue = "%" + searchKey + "%";

  connection.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).json({ error: "Error executing MySQL query" });
      return;
    }

    const portfolioproperties = results.map((property) => {
      return {
        Prop_ID: property.Prop_ID,
        Desciption: property.Desciption,
        Status: property.Status,
        Adress: property.Adress,
        zipCode: property.zipCode,
        Room: property.Room,
        Price: property.Price,
        prop_image: property.prop_image.toString("base64"),
      };
    });

    res.send(portfolioproperties);
  });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

// // Working Login
// app.post("/api/login", (req, res) => {
//   const { userName, password } = req.body;
//   const query = "SELECT * FROM user WHERE User_Name = ? AND password = ?";
//   connection.query(query, [userName, password], (err, result) => {
//     if (err) {
//       console.error("Error logging in:", err);
//       res.status(500).json({ success: false, message: "Failed to login" });
//       return;
//     }
//     if (result.length === 1) {
//       res.status(200).json({ success: true, message: { userName, password } });
//     } else {
//       res
//         .status(200)
//         .json({ success: false, message: "Invalid username or password" });
//     }
//   });
// });

// app.get("/filter", (req, res) => {

//   const { city, rooms, status } = req.query;
//   console.log(city, rooms, status);

// const query = "SELECT * FROM property WHERE Status LIKE ? AND Adress LIKE ? AND Room LIKE ?";

//   const searchstatus = "%" + status + "%";
//   const searchcity = "%" + city + "%";
//   const searchrooms = "%" + rooms + "%";

//   connection.query(query, [searchstatus, searchcity , searchrooms], (err, results) => {
//     if (err) {
//       console.error("Error executing MySQL query: " + err.stack);
//       res.status(500).json({ error: "Error executing MySQL query" });
//       return;
//     }

//     res.send(results);
//     console.log(results);
//   });
// });

// //registration without image
// app.post("/api/register", (req, res) => {
//   const { userName, password, contact, email ,usertype} = req.body;
//   const query =
//     "INSERT INTO user (User_Name, password, Contact , Email , user_type) VALUES (?, ?, ?, ?, ?)";
//   connection.query(
//     query,
//     [ userName, password, contact, email, usertype],
//     (err, result) => {
//       if (err) {
//         console.error("Error registering user:", err);
//         res.status(500).json({ error: "Failed to register user" });
//         return;
//       }
//       res.status(200).json({ message: "Registered successfully" });
//     }
//   );
// });

// app.get("/api/properties", (req, res) => {
//   connection.query("SELECT * FROM properties", (err, results) => {
//     if (err) {
//       console.error("Error executing MySQL query: " + err.stack);
//       res.status(500).json({ error: "Error executing MySQL query" });
//       return;
//     }

//     res.json(results);
//   });
// });

// app.get("/search/:key", (req, res) => {
//   const searchKey = req.params.key;
//   const query = "SELECT * FROM properties WHERE id LIKE ?";
//   const searchValue = "%" + searchKey + "%";

//   connection.query(query, [searchValue], (err, results) => {
//     if (err) {
//       console.error("Error executing MySQL query: " + err.stack);
//       res.status(500).json({ error: "Error executing MySQL query" });
//       return;
//     }

//     res.send(results);
//   });
// });

// app.get("/filter", (req, res) => {
//   const { city, rooms, status } = req.query;

//   // let query = `SELECT pd.room, p.status, a.city
//   //              FROM property AS p
//   //              JOIN prop_details AS pd ON p.id = pd.property_id
//   //              JOIN address AS a ON p.id = a.property_id`;

// let query = `SELECT p.Desciption, p.Status, pd.Room, pd.Price, a.City
// FROM property AS p
// JOIN prop_details AS pd ON p.id = pd.property_id
// JOIN adress AS a ON p.id = a.property_id`;

//   let conditions = [];

//   if (city) {
//     conditions.push(`a.city = '${city}'`);
//   }

//   if (rooms) {
//     conditions.push(`pd.room = '${rooms}'`);
//   }

//   if (status) {
//     conditions.push(`p.status = '${status}'`);
//   }

//   if (conditions.length > 0) {
//     query += " WHERE " + conditions.join(" AND ");
//   }

//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error("Error executing MySQL query: " + err.stack);
//       res.status(500).json({ error: "Error executing MySQL query" });
//       return;
//     }

//     res.send(results);
//   });
// });

// {userName, password, contact, email}

// app.get("/filter/:key", (req, res) => {
//   const searchKey = req.params.key;
//   const query = "SELECT * FROM properties WHERE id LIKE ?";
//   const searchValue = "%" + searchKey + "%";

//   connection.query(query, [searchValue], (err, results) => {
//     if (err) {
//       console.error("Error executing MySQL query: " + err.stack);
//       res.status(500).json({ error: "Error executing MySQL query" });
//       return;
//     }

//     res.send(results);
//   });
// });

// import express from "express";
// import mysql from "mysql";
// import cors from "cors";

// const app = express();
// const port = 5000;

// app.use(cors());

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "propertycare",
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database: " + err.stack);
//     return;
//   }

//   console.log("Connected to the database");
// });

// app.get("/api/properties", (req, res) => {
//   connection.query("SELECT * FROM properties", (err, results) => {
//     if (err) {
//       console.error("Error executing MySQL query: " + err.stack);
//       res.status(500).json({ error: "Error executing MySQL query" });
//       return;
//     }

//     res.json(results);
//   });
// });

// app.listen(port, () => {
//   console.log("Server running on port " + port);
// });
