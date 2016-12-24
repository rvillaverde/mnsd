var express = require('express');
var app = express();
var port =  process.env.PORT || 3000;

var mailgunUrl = "sandboxde8961b3625b4f71a2d257ddd2b93cf2.mailgun.org";
var mailgunApiKey = "key-dc4d73f26e199ce5fc0c5e39947716c6";
var mailgun = require('mailgun-js')({apiKey: mailgunApiKey, domain: mailgunUrl});
var email = 'romina.villaverde@gmail.com';

app.use(express.static(__dirname));

app.post('/send', function(req, res) {
  var contactInfo = "";

  req.on('data', function(chunk) {
    contactInfo += chunk.toString();
  });
  
  req.on('end', function() {
    var contact = JSON.parse(contactInfo);
    console.log(contact);
    var emailData = {
      from: 'Manus Dei Webmaster <no-reply@manusdei.com.ar>',
      to: email,
      subject: 'Nuevo mensaje de ' + contact.name,
      text: contact.name + '(' + contact.email + ') ha enviado un mensaje desde el sitio: ' + contact.message
    };
    
    mailgun.messages().send(emailData, function (error, body) {
      if(error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        console.log(body);
        res.send('Mail sent successfully');
      }
    });
  });
});

app.use(function(req,res) {
  res.sendFile(__dirname+'/index.html');
});

app.listen(port,function() {
  console.log('runnnig on http://localhost:'+port);
});
