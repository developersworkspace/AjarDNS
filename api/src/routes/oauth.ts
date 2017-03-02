// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';

// Imports services
import { OAuth } from './../services/oauth';

// Imports configuration
import { config } from './../config';

let router = express.Router();

router.get('/github', (req: Request, res: Response, next: Function) => {
    let oauthService = new OAuth();

    res.redirect(oauthService.getRedirectUrlToProvider('github'));
});

router.get('/github/callback', (req: Request, res: Response, next: Function) => {
    let oauthService = new OAuth();

    oauthService.getAccessTokenFromProvider('github', req.query.code).then((jwt: string) => {
        res.redirect(`${config.web.uri}/login?token=${jwt}`);
    });
});

export = router;
