var express = require('express') //import do modulo
var app = express() //Cria uma instancia do express
app.listen(8080)
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/agenda', { useNewUrlParser: true }, function (err) {
  	if (err) throw err   
	console.log('Banco conectado com sucesso!')
})


var Contact

var schemaUser = mongoose.Schema({
    name: String,
    email: String,
    phone: String
})

Contact = mongoose.model('Contact', schemaUser)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//usuario de teste
new Contact({
    name: 'teste',
    email: 'teste@teste.com',
    phone: '444444444444'
}).save(function(error, success){
    if(error)throw error
    console.log('Usuario salvo: '+ success)
})

//cadastra um usuario
app.post('/addContact', function(req, res) {
    var name = req.param('name')
    var email = req.param('email')
    var phone = req.param('phone')
    new Contact({ //nova instancia do model
       'name': name,
       'email': email,
       'phone': phone
      }).save(function(error, success) {
          if (error) {
              res.json({'error': 'Nao foi possivel salvar novo usuario'})
          } else {
              res.json(success)
          }
      });
  });


//busca todos os usuarios cadastrados
app.get('/listContacts', function(req, res){
    Contact.find({},function(error, success){
        if(error){
            res.json({'error': 'Ocorreu um erro ao buscar usuarios cadastrados'})
            res.render('Name')
        }else{
            res.json(success)
        }
    })
})

//atualiza usuario por id
app.put('/updateContact', function(req, res){
    var id = req.param('id')
    var newName = req.param('name')
    var newMail = req.param('email')
    var newPhone = req.param('phone')
    var newValues = {$set: {name: newName, email: newMail, phone: newPhone}}
    Contact.updateOne({_id: id}, newValues, function(error, success){
        if(error){
            res.json({error: 'Ocorreu um erro ao atualizar ocorrencia'})
        }else{
            res.json(success)
        }
    })
})

//deleta um contato por id
app.delete('/delContact', function(req, res){
    var id = req.param('id')
    Contact.deleteOne({_id: id}, function(error, success){
        if(error){
            res.json({error: 'Ocorreu um erro ao deletar o usuario'})
        }else{
            res.json(success)
        }
    })
})