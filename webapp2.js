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
        res.write(nav)
        res.write("<h1>Home</h1>");
        res.write('<br />Hello World!');
        res.write("<br>This is in a node!");
        res.write("<a href='/about?id=10'>Go to about</a>")
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