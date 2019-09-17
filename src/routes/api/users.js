const express = require( 'express' ),
      router = express .Router(),
      bcrypt = require( 'bcryptjs' ),
      jwt = require( 'jsonwebtoken' ),
      keys = require( '../../config/keys' ),

// Carga de validación de entrada 
      validateRegisterInput = require( '../../validation/register' ),
      validateLoginInput = require( '../../validation/login' ),
// Carga User Model
      User = require( '../../models/User' );      

// Path: api/users/register
router .post( '/register', ( req, res ) => {
    const { errors, isValid } = validateRegisterInput( req .body );     // Valida Formulario Registro
    
    // Verifica Validacion
    if ( !isValid ) {
        return res .status( 400 ) .json( errors );
    }

    // Verifica si el usuario con el correo pasado en el formulario existe
    User .findOne({ email: req .body .email }) .then( user => {
        if ( user ) {
            // El usuario existe devuelve mensaje 
            return res .status( 400 ) .json({ email: 'El Correo ya existe' });
        } else {
            // Crea el nuevo usuario
            const newUser = new User({
                name: req .body .name,
                email: req .body .email,
                password: req .body .password
            });
            
            // Hash contraseña antes de guardar en la base de datos
            bcrypt .genSalt( 10, ( err, salt ) => {

                // Encripta el valor del campo 'password'
                bcrypt .hash( newUser .password, salt, ( err, hash ) => {

                    if ( err ) throw err;
                    
                    newUser .password = hash;
                    newUser
                        .save()
                        .then( user => res .json( user ) )
                        .catch( err => console .log( err ) );
                });
            });
        }
    });
});

// Path: api/users/login
router .post( '/login', ( req, res ) => {
    const { errors, isValid } = validateLoginInput( req .body );        // Valida Formulario Login

        // Verifica Validacion
        if ( !isValid ) {
            return res .status( 400 ) .json( errors );
        }

    const email = req .body .email,
          password = req.body.password;

    // Encontrar Usuario por 'email'
        User .findOne({ email }) .then( user => {
        // Valida si el usuario NO existe
        if ( !user ) {
            return res .status( 404 ) .json({ emailnotfound: 'Email not found' });
        }
    // Valida la contrasena
        bcrypt .compare( password, user .password ) .then( isMatch => {
            if ( isMatch ) {
            
                // Usuario encontrado: Carga 'payload'
                const payload = {
                    id: user.id,
                    name: user.name
                };
                
                // Token
                jwt .sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    ( err, token ) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status( 400 )
                    .json({ passwordincorrect: 'Contrasena incorrecta' });
            }
        });
    });
});

// Exporta el Router
module .exports = router;