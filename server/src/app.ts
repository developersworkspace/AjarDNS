// Imports
import * as Packet from 'native-dns-packet';
import * as udp from 'udp';

import * as buffer from 'buffer';
let Buffer = buffer.Buffer;

// Imports logger
import { logger } from './logger';

// Imports repository
import { RecordsRepository } from './repositories/records';

// Import models
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
            logger.info(`Listening on ${address.address}:${address.port}`);
        });

        this.socket.on('message', (message: any[], remote: any) => {
            logger.debug(`Recieved packet from ${remote.address}:${remote.port}`);
            this.handlePacket(message, remote);
        });
    }

    private handlePacket(message: any[], remote: any) {

        let packet = Packet.parse(message);

        logger.info(`Recieved query for ${packet.question[0].name} of type ${this.decimalTypeToStringType(packet.question[0].type)} from ${remote.address}:${remote.port}`);


        this.recordsRepository.find(this.decimalTypeToStringType(packet.question[0].type), packet.question[0].name)
            .then((result: Record) => {
                if (result != null) {
                    packet.answer = [
                        {
                            name: result.name,
                            type: packet.question[0].type,
                            class: packet.question[0].class,
                            ttl: result.ttl,
                            address: result.address,
                            data: result.data
                        }
                    ];

                }

                var buf = new Buffer(1028);
                var numberOfBytes = Packet.write(buf, packet);
                this.socket.send(buf, 0, numberOfBytes, remote.port, remote.address);
            });
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
let host = '0.0.0.0';

let recordsRepository = new RecordsRepository({
    server: 'mongo',
    database: 'ajardns'
});

let dnsServer = new DNSServer(host, port, recordsRepository);

dnsServer.start();


