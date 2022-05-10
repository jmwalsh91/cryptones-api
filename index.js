const express = require("express")
const app = express()

app.get('/', (req, res) => (
    res.send('index route hit')
));

const port = 4000
app.listen(port, () => {
    console.log("App running on port 4000")
})