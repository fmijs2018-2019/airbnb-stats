const jwksRsa = require('jwks-rsa');
import jwt from 'express-jwt';

export const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.TENANTNAME}.eu.auth0.com/.well-known/jwks.json`
    }),

    audience: process.env.CLIENTID,
    issuer: `https://${process.env.TENANTNAME}.eu.auth0.com/`,
    algorithms: ['RS256']
});