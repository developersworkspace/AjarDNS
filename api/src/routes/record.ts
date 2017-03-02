// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

// Imports services
import { RecordService } from './../services/record';

// Imports configuration
import { config } from './../config';

let router = express.Router();

router.get('/', (req: Request, res: Response, next: Function) => {
    res.json();
});

export = router;
