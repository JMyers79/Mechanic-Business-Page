import sqlite3 from "sqlite3";
import { open } from "sqlite";



export const setupDatabase = async () => {
    const db = await open({
        filename: './public/database/carproducts.db',
        driver: sqlite3.Database
    });

    // Create table if it doesn't exist
    await db.exec(`CREATE TABLE IF NOT EXISTS carproducts (
        product_id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        brand TEXT,
        price_usd REAL,
        stock_qty INTEGER,
        description TEXT
    )`);

    // If table is empty, insert some seed rows
    const row = await db.get('SELECT COUNT(*) AS count FROM carproducts');
    if (!row || row.count === 0) {
        const insertSQL = `INSERT INTO carproducts (product_id, name, category, brand, price_usd, stock_qty, description) VALUES
            (101, 'All-Weather Floor Mats', 'Accessories', 'WeatherTech', 89.99, 120, 'Durable mats for front and rear footwells'),
            (102, 'Synthetic Motor Oil 5W-30', 'Maintenance', 'Mobil 1', 34.50, 200, 'High-performance engine oil for all seasons'),
            (103, 'LED Headlight Bulbs', 'Lighting', 'Auxbeam', 59.99, 75, 'Bright white LED bulbs with long lifespan'),
            (104, 'Ceramic Brake Pads', 'Brakes', 'Bosch', 79.95, 60, 'Low-dust, high-performance brake pads'),
            (105, 'Cold Air Intake Kit', 'Performance', 'K&N', 299.00, 30, 'Boosts horsepower and throttle response'),
            (106, 'Windshield Sun Shade', 'Accessories', 'EcoNour', 24.99, 150, 'Foldable sun shade for UV protection'),
            (107, 'Tire Pressure Gauge', 'Tools', 'Accutire', 19.95, 90, 'Digital gauge with backlit display'),
            (108, 'Car Battery Charger', 'Electronics', 'NOCO', 129.99, 40, 'Smart charger for 12V batteries'),
            (109, 'Leather Seat Covers', 'Interior', 'FH Group', 149.99, 50, 'Universal fit with stylish design'),
            (110, 'Dash Cam Front & Rear', 'Electronics', 'VIOFO', 179.99, 35, 'Dual camera system with loop recording');`;

        await db.exec(insertSQL);
        console.log('Inserted seed carproducts rows.');
    }

    console.log('Database and setup complete.');
    return db;
};
export const getDbConnection = () => {
    return open({
        filename: "./public/database/carproducts.db",
        driver: sqlite3.Database
    });
};
