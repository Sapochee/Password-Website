// Contact info & Copyright info button
function showContactInfo() {
    alert("Contact information: example@example.com");
}

function showCopyright() {
    alert("Copyright © 2024 Password Manager. All rights reserved.");
}

function passwordChecker(password) {
    //converts input into SHA-1 hash for API
    var text = sha1(password).toUpperCase();
    //splits up SHA-1 hash by first 5 characters
    var firstHash = text.substring(0, 5);
    var restHash = text.substring(5);
    console.log(text)
    console.log(firstHash, restHash)

    fetch(`https://api.pwnedpasswords.com/range/${firstHash}`)
    .then((response) => response.text())
    .then((result) => {
        const lines = result.split('\n').map(line => line.trim());
        console.log(result)
        console.log(lines)
        lines.forEach(line => {
            //split each line by ':' to separate the hash and the count of times breached
            const [hash, count] = line.split(':');
            console.log(hash, count)
            if (hash == restHash) {
                document.getElementById('result').innerText = `Number of Password Breaches: ${count}.`;
                return;
            } else {
                document.getElementById('result').innerText = `Password has not been breached.`;
            }
        });
    })
    .catch((error) => console.error(error));

}

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var password = document.getElementById('password').value;
    document.getElementById('result').innerText = '';
    passwordChecker(password);
    document.getElementById('password').value = '';
});

function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function storeGeneratedPassword(password) {
    fetch('generated_passwords.json')
    .then(response => response.json())
    .then(data => {
        data.Passwords.push({ generatedPassword: password });
        const jsonData = JSON.stringify(data);
        fetch('generated_passwords.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });
    })
    .catch(error => console.error(error));
}

document.getElementById('generatePasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const passwordLength = document.getElementById('passwordLength').value;
    const generatedPassword = generatePassword(passwordLength);
    document.getElementById('generatedPassword').innerText = `Generated Password: ${generatedPassword}`;
    storeGeneratedPassword(generatedPassword);
});