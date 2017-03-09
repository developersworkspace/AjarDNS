// Imports
import * as mongodb from 'mongodb';

// Imports models
import { Record } from './../models/record';

export class RecordsRepository {

    constructor(private config: any) {

    }

    public find(type: string, name: string): Promise<Record> {
        let mongoClient = new mongodb.MongoClient();
        return mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database).then((db: mongodb.Db) => {
            var collection = db.collection('records');
            return collection.findOne({
                type: type,
                name: name
            }).then((result: any) => {
                db.close();
                return result;
            });
        }).then((result: any) => {
            return new Record(name, '185.185.185.185', undefined, 3600);
            // if (result == null) {
            //     return null;
            // } else {
            //     return new Record(result.name, result.address, result.data, result.ttl);
            // }
        });

    }
}