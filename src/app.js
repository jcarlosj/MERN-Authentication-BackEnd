const express = require( 'express' ),       // Importa paquete de Express
      cors = require( 'cors' ),             // Importa paquete de Cors (Intercambio de datos entre servidores)
      passport = require( 'passport' ),
      app = express();

const users = require( './routes/api/users' );
require( './config/passport' )( passport );

// Settings
app .set( 'port', process .env .PORT || 4000 );     // app .set() define valores por defecto para la aplicación con el nombre 'port'
                                                    // Considera Puerto para servicios en la nube (Si existe que lo use, si no que use por defecto el 8082)
// Middlewares
app .use( cors() );                                 // Habilita el Cross-origin resource sharing (CORS)
app .use( express .json() );                        // Analiza las solicitudes entrantes con cargas JSON
app .use( '/api/users' , users );
app.use( passport .initialize() );

// Routes



// Export Modulo Express
module .exports = app;