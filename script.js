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