const client = require('./client');

client.deleteNews({ id: '3' }, (error, news) => {
	if (error != null) throw error;
	console.log(news);
});
