const grpc = require('@grpc/grpc-js');
const PROTO_PATH = './news.proto';
var protoLoader = require('@grpc/proto-loader');

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let newsList = {
	news: [
		{ id: '1', title: 'Note 1', body: 'Content 1', postImage: 'Post image 1' },
		{ id: '2', title: 'Note 2', body: 'Content 2', postImage: 'Post image 2' }
	]
};

server.addService(newsProto.NewsService.service, {
	getAllNews: (_, callback) => {
		callback(null, newsList);
	},
	addNews: (newsToAdd, callback) => {
		const lastId = newsList.news[newsList.news.length - 1].id;
		const nextId = Number(lastId) + 1;
		let _news = { ...newsToAdd.request, id: nextId.toString() };
		newsList.news.push(_news);
		callback(null, _news);
	},
	deleteNews: (_, callback) => {
		const newsId = _.request.id;
		newsList.news = newsList.news.filter(f => f.id !== newsId);
		callback(null, {});
	}
});

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
	console.log('Server running at 127.0.0.1:50051');
	server.start();
});
