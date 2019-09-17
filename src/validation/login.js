const Validator = require( 'validator' ),
      isEmpty = require( 'is-empty' );

module .exports = function validateLoginInput( data ) {

    let errors = {};

    // Convierta campos vacíos en una cadena vacía para que podamos usar funciones de validación
    data .email = !isEmpty( data .email ) ? data .email : '';
    data .password = !isEmpty( data .password ) ? data .password : '';

    // Valida campo 'email' del formulario
    if ( Validator .isEmpty( data .email ) ) {
        errors .email = 'Email field is required';
    } else if ( !Validator .isEmail( data .email ) ) {
        errors .email = 'Email is invalid';
    }

    // Valida campo 'password' del formulario
    if ( Validator .isEmpty( data .password ) ) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};