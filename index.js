const http = require('http');
const mqtt = require('mqtt');


const httpServer = http.createServer(function(req, res){
    console.log(req.url);
    console.log(req.headers['payload']);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);

    mqttClient.publish(req.url, req.headers['payload']);
}).listen();
console.log(httpServer.address().port);

const options = {
    clean: true,
    connectTimeout: 4000,
    clientId: 'nodejs',
    username: 'ochibkga',
    password: 'EaZUEOHix0qj',
  }
const mqttClient  = mqtt.connect('mqtt://m13.cloudmqtt.com:18050', options);


mqttClient.on('connect', function () {
        console.log('mqtt connected');
        mqttClient.publish('presence', 'Hello mqtt');
})

mqttClient.on('disconnect', function() {
    console.log('client disconnected');
})

mqttClient.on('error', function(error){
    console.log('mqtt connect krne main error agaya hai.' + error);
    console.log(error);
})

mqttClient.on('packetsend', function(packet){
    console.log('packet sent' + packet.topic + ':' + packet.payload);
})
