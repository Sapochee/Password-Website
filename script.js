var host = window.location.origin;
console.log(host)

// Voice commands
if (annyang) {
    var commands = {

        // Switches between pages, even if user says "password manager"
        'Navigate to *page': function(page) {
            if (page.toLowerCase().includes("password")) {
                window.location.href = "password.html";
            } else {
                window.location.href = page.toLowerCase().replace(/\s+/g, '-') + '.html';
            }
        },

        // Generates new password between 5-20 characters in length
        'Generate new password': function() {
            var passwordLength = randomIntFromInterval(5, 20);
            var generatedPassword = generatePassword(passwordLength);
            document.getElementById('passwordLength').value = passwordLength; // Set spoken length in the input box
            document.getElementById('generatedPassword').textContent = "Generated Password: " + generatedPassword; // Display result
        },

        // Checks specified password
        'Check password :password': function(password) {
            document.getElementById('password').value = password.toLowerCase(); // Set spoken password in the input box
            passwordChecker(password);
        }
        
    }
    annyang.addCommands(commands);
};

// Turn on audio
document.getElementById('turn-on-audio').addEventListener('click', function () {
    if (annyang) {
        annyang.start({continuous: true, autoRestart: false});
    }
});

// Turn off audio
document.getElementById('turn-off-audio').addEventListener('click', function () {
    if (annyang) {
        annyang.abort(); 
    }
});

// Random int between values
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Contact info & Copyright info button
function showContactInfo() {
    window.location.href = "contact.html";
}

function showCopyright() {
    window.location.href = "copyright.html";
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
                document.getElementById('result').innerText = `Number of Password Breaches: ${count}`;
                return;
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

async function addPassword(pass) {
    await fetch(`${host}/passwords`, {
        method: 'POST',
        body: JSON.stringify({
            "generated_password": pass,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
    })
}

document.getElementById('generatePasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const passwordLength = document.getElementById('passwordLength').value;
    const generatedPassword = generatePassword(passwordLength);
    addPassword(generatedPassword)
    document.getElementById('generatedPassword').innerText = `Generated Password: ${generatedPassword}`;
});