

async function fetchGitHubUserDetails(username, accessToken) {
  const url = `https://api.github.com/users/${username}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github.v3+json',
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user details:', error.response.status, error.response.data);
    return null;
  }
}

const form = document.querySelector('.needs-validation');
const input = document.getElementById('floatingTextarea2');
const userDetailsContainer = document.querySelector('.user-details');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (form.checkValidity()) {
    const accessToken = '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';
    const username = input.value.trim();

    userDetailsContainer.innerHTML = '<h1>Loading...</h1>';

    const userDetails = await fetchGitHubUserDetails(username, accessToken);

    if (userDetails) {
      userDetailsContainer.innerHTML = `
        <div class = "text-center">
        <h1>User Details</h1>
        <p>Username: ${userDetails.login}</p>
        <p>Name: ${userDetails.name}</p>
        <p>Location: ${userDetails.location}</p>
        <p>Bio: ${userDetails.bio}</p>
        <p>Public Repositories: ${userDetails.public_repos}</p>
        <p>Followers: ${userDetails.followers}</p>
        <p>Following: ${userDetails.following}</p>
        </div>
        <!-- Add more details here as needed -->
      `;
    } else {
      userDetailsContainer.innerHTML = '<h1>Error retrieving user details</h1>';
    }
  }

  form.classList.add('was-validated');
});

    