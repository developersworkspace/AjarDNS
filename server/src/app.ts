import * as Packet from 'native-dns-packet';

import * as buffer from 'buffer';
let Buffer = buffer.Buffer;

import * as udp from 'udp';

import { RecordsRepository } from './repositories/records';

import { Record } from './models/record';

export class DNSServer {

    private socket: any;

    constructor(private host: string, private port: number, private recordsRepository: RecordsRepository) {
        this.socket = udp.createSocket('udp4');
        this.initializeSocket();
    }

    start() {
        this.socket.bind(this.port, this.host);
    }

    private initializeSocket() {
        this.socket.on('listening', () => {
            var address = this.socket.address();
            console.log(`UDP Server listening on ${address.address}:${address.port}`);
        });

        this.socket.on('message', (message: any[], remote: any) => {
            this.handlePacket(message, remote);
        });
    }

    private handlePacket(message: any[], remote: any) {

        var packet = Packet.parse(message);

        let record: Record = this.recordsRepository.find(this.decimalTypeToStringType(packet.question[0].type), packet.question[0].name)
        if (record != null) {
            packet.answer = [
                {
                    name: record.name,
                    type: packet.question[0].type,
                    class: packet.question[0].class,
                    ttl: record.ttl,
                    address: record.address,
                    data: record.data
                }
            ];

        }

        var buf = new Buffer(1028);
        var numberOfBytes = Packet.write(buf, packet);
        this.socket.send(buf, 0, numberOfBytes, remote.port, remote.address);
    }

    private decimalTypeToStringType(n: number) {
        switch (n) {
            case 1:
                return 'A';
            case 2:
                return 'NS';
            case 5:
                return 'CNAME';
            case 12:
                return 'PTR';
            case 28:
                return 'AAAA';
            default:
                return null;
        }
    }
}

let port = 53;
let host = '127.0.0.1';

let recordsRepository = new RecordsRepository();

let dnsServer = new DNSServer(host, port, recordsRepository);

dnsServer.start();


