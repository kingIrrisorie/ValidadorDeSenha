document.getElementById('passwordInput').addEventListener('input', function() {
    validatePassword(this.value);
});

function validatePassword(password) {
    const feedback = document.getElementById('feedback');
    const tips = document.getElementById('tips');
    let strength = 0;
    let messages = [];

    // Critérios da força
    if (password.length >= 8) strength++;
    else messages.push("Use pelo menos 8 caracteres.");

    if (/[A-Z]/.test(password)) strength++;
    else messages.push("Adicione letras maiúsculas.");

    if (/[a-z]/.test(password)) strength++;
    else messages.push("Adicione letras minúsculas.");

    if (/[0-9]/.test(password)) strength++;
    else messages.push("Inclua números.");

    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else messages.push("Use símbolos (ex: @, #, !, %).");

    // Feedback da força
    switch(strength) {
        case 0:
        case 1:
            feedback.textContent = 'Senha muito fraca';
            feedback.style.color = 'red';
            break;
        case 2:
        case 3:
            feedback.textContent = 'Senha média';
            feedback.style.color = 'orange';
            break;
        case 4:
        case 5:
            feedback.textContent = 'Senha forte';
            feedback.style.color = 'green';
            break;
    }

    // Exibir dicas
    if (messages.length > 0) {
        tips.innerHTML = "<strong>Dicas para melhorar sua senha:</strong><br>" + messages.join("<br>");
        tips.style.color = 'yellow';
    } else {
        tips.textContent = "";
    }
}

function generatePassword() {
    const length = 12;

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~";

    let allChars = lowercase + uppercase + numbers + symbols;
    let password = "";

    // Garante pelo menos 1 de cada tipo
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Preenche o resto com qualquer caractere
    for (let i = 4; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Embaralha os caracteres pra não ficar previsível
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    const input = document.getElementById('passwordInput');
    input.value = password;
    validatePassword(password);
}


function togglePassword() {
    const input = document.getElementById('passwordInput');
    const checkbox = document.getElementById('showPassword');

    if (checkbox.checked) {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}
