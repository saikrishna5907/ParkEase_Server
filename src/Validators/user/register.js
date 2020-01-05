import Validator from 'validator';
// import isEmpty from 'is-empty';

module.exports.validateRegisterInput = (data) => {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
    data.vehicleId = !isEmpty(data.vehicleId) ? data.vehicleId : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name is required.";
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name is required.";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "First Name is required.";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is Invalid...!"
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required.";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }
    return  {
        errors,
        isValid: isEmpty(errors)
    }
}
