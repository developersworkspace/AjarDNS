import { Record } from './../models/record';

export class RecordsRepository {

    find(type: string, name: string): Record {
        
        switch (type) {
            case 'A':
                return new Record(name, '129.168.1.100', undefined, 500);
            default:
                return null;
        }

    }
}