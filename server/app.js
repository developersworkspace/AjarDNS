var Packet = require('native-dns-packet');


var PORT = 53;
var HOST = '192.168.46.97';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    var packet = Packet.parse(message);

console.log(packet.question[0].name);

    packet.answer = [
        {
            name: 'worldofrations.com',
            type: packet.question[0].type,
            class: packet.question[0].class,
            ttl: 29,
            //address: '74.125.239.112',
            data: 'ns1.hello.com'
        }
    ];

    var buf = new Buffer(1028);
    var numberOfBytes = Packet.write(buf, packet);


    server.send(buf, 0, numberOfBytes, remote.port, remote.address);
});

server.bind(PORT, HOST);