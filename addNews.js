const client = require('./client');

const _news = { title: 'Note 3', body: 'Content 3', postImage: 'Post image 3' };

client.addNews(_news, (error, news) => {
	if (error != null) throw error;
	console.log(news);
});
