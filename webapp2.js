var http = require('http');
var url = require('url');
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3000;

//MongoDB connection
const MONGO_URI = 'mongodb+srv://mydbuser:dbuser@cluster0.nwqpdop.mongodb.net/?appName=Cluster0';
const DB_NAME = 'Stock';
const COLLECTION_NAME = 'PublicCompanies';

let db;
let stocksCollection;

//connect to MongoDB
MongoClient.connect(MONGO_URI)
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db("Stock");
        stocksCollection = db.collection("PublicCompanies");
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    var query = parsedUrl.query;

    //create the form on the page
    if (pathname == "/") {
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Stock Lookup Form</title>
            </head>
            <body>
                <h2>Stock Searching</h2>
                <form action="/process" method="GET">
                    <label for="stockInput">Enter Stock Ticker or Company Name:</label><br>
                    <input type="text" id="stockInput" name="stockInput" required><br><br>
                    
                    <label>Search Type:</label><br>
                    <input type="radio" id="ticker" name="searchType" value="ticker" checked>
                    <label for="ticker">Ticker Symbol</label><br>
                    <input type="radio" id="company" name="searchType" value="company">
                    <label for="company">Company Name</label><br><br>
                    
                    <button type="submit">Search</button>
                </form>
            </body>
            </html>
        `);
        res.end();
    }
    else if (pathname == "/process") {
        //Retreive the form data
        var stockInput = query.stockInput || "";
        var searchType = query.searchType || "";
        
        //find which type of search
        var searchQuery = {};
        
        if (searchType === "ticker") {
            searchQuery = { stockTicker: stockInput.toUpperCase() };
            
        } else if (searchType === "company") {
            searchQuery = { companyName: stockInput};
        }
        
        //find data in database
        stocksCollection.find(searchQuery).toArray()
            .then(results => {
                //display the results in console
                if (results.length > 0) {
                    results.forEach((stock, index) => {
                        console.log(`Name: ${stock.companyName}`);
                        console.log(`Stock Ticker: ${stock.stockTicker}`);
                        console.log(`Stock Price: $${stock.stockPrice}`);
                        console.log("");
                    });
                } else {
                    console.log("No Matching Stocks Found in the Database.");
                }
                
                // Extra Credit: display results on webpage
                res.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Process Results</title>
                    </head>
                    <body>
                        <h2>Search Results</h2>
                        <p><strong>Input:</strong> ${stockInput}</p>
                        <p><strong>Search Type:</strong> ${searchType}</p>
                `);
                
                if (results.length > 0) {
                    res.write("<ul>");
                    results.forEach(stock => {
                        res.write(`<li>${stock.companyName} (${stock.stockTicker}) - $${stock.stockPrice}</li>`);
                    });
                    res.write("</ul>");
                } else {
                    res.write("<p>No matching stocks found in the database.</p>");
                }
                res.write(`
                        <br>
                        <a href="/">Back to Form</a>
                    </body>
                    </html>
                `);
                res.end();
            })
            .catch(err => {
                res.write('<a href="/">Error. Back to Form</a>');
                res.end();
            });
    }
    else {
        res.write("<a href='/'>Error. Go Home</a>");
        res.end();
    } 
}).listen(PORT);
