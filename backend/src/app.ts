import express from 'express';
const server = express();

const app = (config) => {
    const log = config.log()
    if (server.get("env") === "development") {
        server.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }

    server.use((error, req, res, next) => {
        res.status(error.status || 500);
        // Log out the error to the console
        log.error(error);
        return res.json({
            error: {
                message: error.message,
            },
        });
    });

    server.get('/', (req, res) => {
        res.send('Hello World!');
    });

    return server;
}

export default app;