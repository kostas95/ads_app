document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (event) {
        if (!form.checkValidity() || !checkAgeLimit()) {
            event.preventDefault();
        } else {
            event.preventDefault();
            // Make a POST request to the "/users/register" endpoint
            fetch('/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify
                    ({
                        name: document.getElementById('username').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        password2: document.getElementById('confirmPassword').value,
                    })
            })
            .then(response => {
                if (response.ok) {
                    alert("Registration ok")
                }
                return response.json();
            })
            .then(data => {
                if (data["errors"]) {
                    const error = data["errors"];
                    alert(error[0]["msg"]);
                }
            })
            .catch(error => {
                // Handle errors here
                alert(error);
                console.log(error);
            });
        }
    });

    var confirmPassword = document.getElementById('confirmPassword');
    var password = document.getElementById('password');

    confirmPassword.addEventListener('input', function () {
        if (confirmPassword.validity.patternMismatch) {
            confirmPassword.setCustomValidity('Passwords must match.');
        } else {
            confirmPassword.setCustomValidity('');
        }
    });

    password.addEventListener('input', function () {
        confirmPassword.pattern = password.value;
    });

    function checkAgeLimit() {
        var birthDateInput = document.getElementById('birthDate');
        if (birthDateInput.value) {
            var birthDate = new Date(birthDateInput.value);
            var currentDate = new Date();
            var age = currentDate.getFullYear() - birthDate.getFullYear();

            // Check if the user is at least 18 years old
            if (age < 18) {
                alert('You must be at least 18 years old to register.');
                return false;
            }
        }
        return true;
    }
});
