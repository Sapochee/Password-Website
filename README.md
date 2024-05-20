# Password Checker
https://password-website-sapochees-projects.vercel.app/

[Developer Manual](#developer-manual)

### Proposal
This proposal plans solve the problem of generating more secure passwords through the utilization of the __HaveIBeenPwned__ security API. We want to create a robust solution
to enhance password security, recognizing the need to safeguard sensitive information in digital spaces. By using this API, we aim to develop a platform that enables users to effortlessly
generate and manage strong, unique passwords tailored to their specific requirements. This initiative will help individuals and organizations with a reliable toolset for strengthening their
digital assets against potential threats and vulnerabilities.

### Database Integration
Lists of passwords from the HaveIBeenPwned database will be integrated to the website that allows the users to
identify what kinds of information has been breached and what passwords to avoid. The website would also include a database of passwords previously generated from the password generator to make
sure that there are no overlaps with any currently existing passwords meaning that every
password generated would more likely be more unique for the user.

The current database for storing generated passwords is JSON based due to the small scale but can be transferred to a database management system like MySQL, PostgreSQL, or MongoDB for a more scalable solution.

### Targeted Browsers
The Password Checker application is designed to be compatible with any desktop platform using the Google Chrome Browser with the Allow CORS: Access-Control-Allow-Origin extension installed.

## Developer Manual

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Sapochee/Password-Website.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Password-Website
    ```
3. Open the `initialPage.html` file in your web browser

### How to Run/Test
1. Navigate to the *Password Generator/Checker* page from `home.html` or by directly opening `password.html`.

2. To check an existing password, enter it in the first box and click the *Check Password* button to see if and how many times it has been breached.

   To generate a new password, enter the preferred length in the second box and click the *Generate Password* button.

   You may also use the specified voice commands to perform these tasks. Instructions are at the bottom right of the page.

### API Endpoints
1. Password Generate Endpoint
    - Endpoint: `/generate-password`
    - Method: POST
    - Description: Generates a new, secure password with the specified length.
    - Request Body: JSON object with a single key: `length` (integer)

### Bugs
No known bugs in current state.

### Roadmap for Future
- Implement user account functionality, allowing users to store and manage their passwords securely.

- Explore integration options with popular password managers to provide a seamless experience for users.

- Develop a password strength meter to provide users with feedback on the strength of their passwords.

- Add support for multiple languages.

