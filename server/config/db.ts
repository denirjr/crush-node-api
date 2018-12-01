import * as mongoose from 'mongoose';

class Database {

    private DB_URI = 'mongodb://denir:denir123@ds133601.mlab.com:33601/rugalzinhodb';

    private DB_CONNECTION;

    constructor(){}

    public createConection() {
        mongoose.connect(this.DB_URI);

        this.logger(this.DB_URI);
    }

    public closeConnection(message, callback) {

        this.DB_CONNECTION.close(() => {
            console.log('Mongoose foi conectado pelo ' + message);

            callback();
        })
    }
    logger(uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', () => console.log('Mongoose está conectado ao ' + uri));
        this.DB_CONNECTION.on('error', error => console.error.bind(console, "Erro na conexão: " + error));
        this.DB_CONNECTION.on('disconnected', () => console.log("Mongoose está desconectado do " + uri));
        }

    }
    export default Database;