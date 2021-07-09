const client = require('./client');

const getAllNews = res => {
	client.getAllNews({}, (error, news) => {
		if (error != null) throw error;
		console.log(news);
		res.status(200).send(news);
	});
};

module.exports = {
	getAllNews
};
