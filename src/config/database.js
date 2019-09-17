const mongoose = require( 'mongoose' ),             // Importa paquete 'mongoose' (ORM) para MongoDB
      URI = process .env .MONGODB_URI               // 'process': Objeto global de Node
        ? process .env .MONGODB_URI                 //    En el root del proyecto se debe crear el archivo .env con las variables de entorno deseadas (No debe agregarse al repositorio por seguridad)
        : 'mongodb://localhost/agencia-viajes-test';      

console .log( 'URI', URI );

// Conexión a una instancia o servidor de MongoDB
mongoose .connect( URI, {
    useCreateIndex: true,       // Falso por defecto. Configurado para truehacer que la compilación de índice predeterminada de Mongoose se use en createIndex()
    useNewUrlParser: true,      // Bandera para permitir a los usuarios recurrir al antiguo analizador (Controlador DB MongoDB)
    useFindAndModify: false,    // Configurado para false hacer findOneAndUpdate() y findOneAndRemove() usar nativo en findOneAndUpdate() lugar de findAndModify()
    useUnifiedTopology: true    // Configura nuevo motor de topología de Mongoose
});

const connection = mongoose .connection;

// Valida si la conexión se abre
connection .once( 'open', () =>  {
    console .log( `Base de datos conectada` );
});