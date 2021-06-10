async function newFormHandler(event) {
    event.preventDefault();
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    const response = await fetch(`/api/users/signup`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to add user');
    }
}

document
  .getElementById('signUpButton')
  .addEventListener('click', newFormHandler);