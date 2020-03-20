export const environment = {
    jwt: {
        secret: "318869FGHSS2336DE375EEBC8CD4SS2336DE375EEBC9FGHSS2336DE375E82888",
        timeSecundsDuration: 86400
    },
    bcrypt: {
        salt: 10
    },
    mySqlAccess: {
        host: process.env.MONGODB || "mongodb://localhost/dbUserGado"
    },
    app: {
        url: process.env.URL || 'http://localhost',
        port: process.env.SERVER_PORT || 2001,
        name: 'Gado-user',
        version: '1.0.0',
    },
    logger: {
        level: process.env.LOG_LEVEL || "debug"
    }
}