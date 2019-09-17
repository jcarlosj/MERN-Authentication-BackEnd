const JwtStrategy = require( 'passport-jwt' ).Strategy,
      ExtractJwt = require( 'passport-jwt' ).ExtractJwt,
      mongoose = require( 'mongoose' ),
      User = mongoose.model( 'users' ),
      keys = require( '../config/keys' ),
      opts = {};

opts .jwtFromRequest = ExtractJwt .fromAuthHeaderAsBearerToken();
opts .secretOrKey = keys .secretOrKey;

// Exporta Configuracion de 'Passport'
module .exports = passport => {
    // Configura 'Passport'
    passport .use(
        new JwtStrategy( opts, ( jwt_payload, done ) => {
            // Busca Usuario por ID
            User .findById( jwt_payload.id )
                .then( user => {
                    if ( user ) {
                        return done( null, user );
                    }
                    return done( null, false );
                })
                .catch( err => console .log( err ) );
            })
    );
};