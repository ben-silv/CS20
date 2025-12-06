var http = require('http');
var url = require('url');


// Use Heroku's port or 8080 for local development
const PORT = process.env.PORT || 3000;

http.createServer(function (req, res) {
    console.log("server created")
    res.writeHead(200, {'Content-Type': 'text/html'});
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    var query = parsedUrl.query;
    
    // Remove localhost references - use relative URLs
    nav = "<a href='/'>Home</a>" + 
        "&nbsp; <a href='/results'>Results</a>"

    if (pathname == "/"){
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Stock Lookup Form</title>
            </head>
            <body>
                <h2>Stock Lookup</h2>
                <form action="/results" method="GET">
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
    }
    else if (pathname == "/results") {
        var stockInput = query.stockInput || "Not provided";
        var searchType = query.searchType || "Not selected";
        
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
                <br>
                <a href="/">Back to Form</a>
            </body>
            </html>
        `);
    }
    res.end();
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
