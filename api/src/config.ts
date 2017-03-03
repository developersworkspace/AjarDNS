export var config = {
    web: {
        uri: 'http://localhost:4200'
    },
    api: {
        uri: 'http://localhost:3000/api'
    },
    oauth: {
        jwtSecret: 'ajardns_secret',
        jwtIssuer: 'ajardns.developersworkspace.co.za',
        providers: {
            github: {
                clientId: '001134b92b965f10c490',
                clientSecret: '16d2ff97573d9f41d6dee082921a84348c35fd1d',
                redirectUri: 'http://ajardns.developersworkspace.co.za/api/oauth/github/callback'
            }
        }
    },
    datastores: {
        mongo: {
            uri: 'mongodb://mongo:27017/ajardns'
        }
    },
    logging: {
        path: './'
    }
};