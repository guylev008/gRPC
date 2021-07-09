const express = require('express');
const getNews = require('./getNews');

const app = express();
const port = 3000;

app.get('/getNews', async (req, res) => {
	getNews.getAllNews(res);
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
