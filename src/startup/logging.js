const logger = require('winston');
const { format } = require('winston');

exports.initializeLogger = () => {
    logger.add(new logger.transports.Console(
        {colorise: true,
        prettyPrint: true,
        format: format.combine(format.timestamp(),format.simple())
    }));

    process.on('uncaughtException', error => {
        logger.error('uncaughtException'+error);
        process.exit(1);
    });

    process.on('unhandledRejection', error => {
        console.error('unhandledRejection :'+error);
        process.exit(1);
    });
}