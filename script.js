// Contact info & Copyright info button
function showContactInfo() {
    alert("Contact information: example@example.com");
}

function showCopyright() {
    alert("Copyright © 2024 Password Manager. All rights reserved.");
}

function passwordGenerator() {
    //converts input into SHA-1 hash for API
    var myString = "hello";
    var text = sha1(myString);

    //splits up SHA-1 hash by first 5 characters
    var firstHash = text.substring(0, 5);
    var restHash = text.substring(5);
    
    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    fetch(`https://api.pwnedpasswords.com/range/${firstHash}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
        const lines = result.split('\n');
        var amountOfBreaches = 0;
        lines.forEach(line => {
            //split each line by ':' to separate the hash and the count of times breached
            const [hash, count] = line.split(':');
            if (hash == restHash) {
                console.log("Number of Breaches:", count);
                amountOfBreaches = count
                return amountOfBreaches
            }
            else {
                console.log("Could not find password in database")
                return
            }
        })
    })
    .catch((error) => console.error(error));

}