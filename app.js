import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { setupDatabase, getDbConnection } from './database.js';

const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const clickHandler = (e) => {
//     console.log("Button clicked!");
// }

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// let dbPromise = setupDatabase().catch((error) => {
//     console.error("Failed to set up database", error);
// });

app.get("/", (req, res) => {
    getDbConnection()
    .then((db) => {
        return db.all('SELECT * FROM carproducts');
    })
    .then((carproducts) => {
        console.log('DB rows:', carproducts);
    res.render("pages/index", {data : carproducts, title: "Products"});
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error");
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about", { title: "About Us" });
});
app.get("/contact", (req, res) => {
    res.render("pages/contact", { title: "Contact Us" });
});

// Ensure database is ready before starting the server
await setupDatabase();

app.listen(port, () => {
    console.log(`App listening at port:${port}`);
});
