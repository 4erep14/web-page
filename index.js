document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = validateForm();

        if (isValid) {
            alert('Registration successful!');
            form.reset();
        }
    });

    function validateForm() {
        let valid = true;

        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.textContent = '');

        const fullName = document.getElementById('fullName');
        if (fullName.value.trim() === '') {
            showError(fullName, 'Full Name is required.');
            valid = false;
        }

        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            showError(email, 'Email is required.');
            valid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Enter a valid email address.');
            valid = false;
        }

        const password = document.getElementById('password');
        if (password.value.trim() === '') {
            showError(password, 'Password is required.');
            valid = false;
        } else if (!validatePassword(password.value)) {
            showError(password, 'Password must be at least 8 characters long and include letters and numbers.');
            valid = false;
        }

        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword.value.trim() === '') {
            showError(confirmPassword, 'Please confirm your password.');
            valid = false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match.');
            valid = false;
        }

        const dob = document.getElementById('dob');
        if (dob.value === '') {
            showError(dob, 'Date of Birth is required.');
            valid = false;
        } else if (!validateAge(dob.value)) {
            showError(dob, 'You must be at least 13 years old.');
            valid = false;
        }

        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            const genderField = document.querySelector('.gender-options');
            showError(genderField, 'Please select your gender.');
            valid = false;
        }

        const phone = document.getElementById('phone');
        if (phone.value.trim() !== '' && !validatePhone(phone.value)) {
            showError(phone, 'Enter a valid phone number.');
            valid = false;
        }

        const terms = document.getElementById('terms');
        if (!terms.checked) {
            const termsField = document.querySelector('.form-group.terms label');
            showError(termsField, 'You must accept the terms and conditions.');
            valid = false;
        }

        return valid;
    }

    function showError(element, message) {
        const errorElement = element.parentElement.querySelector('.error-message');
        errorElement.textContent = message;
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    }

    function validateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 13;
    }

    function validatePhone(phone) {
        const re = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
        return re.test(phone);
    }
});
