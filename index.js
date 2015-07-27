var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var five = require("johnny-five");
var led;

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

io.on('connection', function(socket){
  socket.on('color', function(color){

    if ( !led.isOn ) {
    	led.on();
    }

    led.color(color);

  });
});

five.Board().on("ready", function() {
  led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });

  this.repl.inject({
  	led: led
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
