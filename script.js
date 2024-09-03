document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('responseMessage').textContent = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let valid = true;

    if (!email.includes('@')) {
        document.getElementById('emailError').textContent = 'Введите корректную почту.';
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Пароль должен быть не менее 6 символов.';
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    }

    if (!valid) return;

    mockFetch(email, password)
        .then(response => {
            document.getElementById('responseMessage').textContent = response.message;
        })
        .catch(error => {
            document.getElementById('responseMessage').textContent = 'Ошибка: ' + error.message;
        });
});

function mockFetch(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "example@example.ru" && password === "123456") {
                resolve({ success: true, message: "Успешный вход!" });
            } else {
                reject({ success: false, message: "Неверная почта или пароль." });
            }
        }, 1000);
    });
}