const express = require('express');
const request = require('request');
const cors = require('cors')
const cheerio = require('cheerio');

const app = express();

const port = 5000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("I am working fine! CC")
})

app.get('/:from/:to', (req, res) => {
    const from = req.params.from;
    const to = req.params.to;
    console.log(from, to);
    request(`https://www.xe.com/currencyconverter/convert/?Amount=1&From=${from}&To=${to}`, (err, response, html) => {
        if(response.statusCode === 200){
            console.log("fine");
            const $ = cheerio.load(html);
            const result = $('.result__BigRate-sc-1bsijpp-1').text();
            const lastUpdate = $('.result__LiveSubText-sc-1bsijpp-2').text();
            console.log(result);
            res.send({result, lastUpdate});

        }
    })
})

//listen
app.listen(process.env.PORT || port, () => {
    console.log("I am ready to work! CC");
})

