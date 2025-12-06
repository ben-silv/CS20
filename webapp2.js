var http = require('http');

// Use Heroku's port or 8080 for local development
const PORT = process.env.PORT || 3000;

http.createServer(function (req, res) {
    console.log("server created")
    res.writeHead(200, {'Content-Type': 'text/html'});
    theURL = req.url;
    
    // Remove localhost references - use relative URLs
    nav = "<a href='/'>Home</a>" + 
        "&nbsp; <a href='/results'>Results</a>"

    if (theURL == "/"){
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Stock Lookup Form</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 500px;
                        margin: 50px auto;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .form-container {
                        padding: 30px;
                        border-radius: 8px;
                    }
                    h2 {
                        margin-top: 0;
                        color: #333;
                    }
                    .form-group {
                        margin-bottom: 20px;
                    }
                    label {
                        display: block;
                        margin-bottom: 8px;
                        color: #555;
                        font-weight: bold;
                    }
                    input[type="text"] {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        box-sizing: border-box;
                        font-size: 14px;
                    }
                    .radio-group {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .radio-option {
                        display: flex;
                        align-items: center;
                    }
                    input[type="radio"] {
                        margin-right: 8px;
                    }
                    button {
                        background-color: #007bff;
                        color: white;
                        padding: 12px 24px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 16px;
                        width: 100%;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                    .nav {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .nav a {
                        margin: 0 10px;
                        color: #007bff;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="nav">
                    <a href="/">Home</a>
                    <a href="/process">Process</a>
                </div>
                <div class="form-container">
                    <h2>Stock Lookup</h2>
                    <form action="/process" method="GET">
                        <div class="form-group">
                            <label for="stockInput">Enter Stock Ticker or Company Name:</label>
                            <input type="text" id="stockInput" name="stockInput" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Search Type:</label>
                            <div class="radio-group">
                                <div class="radio-option">
                                    <input type="radio" id="ticker" name="searchType" value="ticker" checked>
                                    <label for="ticker" style="margin-bottom: 0; font-weight: normal;">Ticker Symbol</label>
                                </div>
                                <div class="radio-option">
                                    <input type="radio" id="company" name="searchType" value="company">
                                    <label for="company" style="margin-bottom: 0; font-weight: normal;">Company Name</label>
                                </div>
                            </div>
                        </div>
                        
                        <button type="submit">Search</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    }
    else if (theURL == "/results") {
        res.write(nav)
        res.write("<h1>Results</h1>");
        res.write('<br> This is the results page!');
    }
    res.end();
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
