const Validator = require( 'validator' ),
      isEmpty = require( 'is-empty' );

module .exports = function validateRegisterInput( data ) {
    let errors = {};

    // Convierta campos vacíos en una cadena vacía para que podamos usar funciones de validación
    data .name = !isEmpty( data .name ) ? data .name : '';
    data .email = !isEmpty( data .email ) ? data .email : '';
    data .password = !isEmpty( data .password ) ? data .password : '';
    data .password2 = !isEmpty( data .password2 ) ? data .password2 : '';

    // Valida campo 'name' del formulario
    if ( Validator .isEmpty( data .name ) ) {
        errors .name = 'Name field is required';
    }

    // Valida campo 'email' del formulario
    if ( Validator .isEmpty( data .email ) ) {
        errors .email = 'Email field is required';
    } else if ( !Validator .isEmail( data .email ) ) {
        errors.email = 'Email is invalid';
    }

    // Valida campo 'password' del formulario
    if ( Validator .isEmpty( data .password ) ) {
        errors .password = 'Password field is required';
    }
    if ( Validator .isEmpty( data .password2 ) ) {
        errors .password2 = 'Confirm password field is required';
    }
    if ( !Validator .isLength( data .password, { min: 6, max: 30 } ) ) {
        errors .password = 'Password must be at least 6 characters';
    }
    if ( !Validator .equals( data .password, data .password2 ) ) {
        errors .password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};