var mongoose = require('mongoose')
var mongooseAux = require('mongoose')

mongoose.connect('mongodb://localhost:27017/agenda', { useNewUrlParser: true }, function (err) {
  	if (err) throw err   
	mongooseAux.connection.db.dropDatabase();
	mongooseAux.connection.close()
	console.log('removido banco')
})