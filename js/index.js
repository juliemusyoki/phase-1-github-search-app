document.getElementById('github-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('searchInput').value;
  if (username.trim() === '') {
      alert('Please enter a GitHub username.');
      return;
  }

  const userSearchEndpoint = `https://api.github.com/search/users?q=${username}`;
  const response = await fetch(userSearchEndpoint, {
      headers: {
          'Accept': 'application/vnd.github.v3+json'
      }
  });

  if (!response.ok) {
      alert('Error searching for users.');
      return;
  }

  const data = await response.json();
  displayUsers(data.items);
});

function displayUsers(users) {
  const userList = document.getElementById('user-list');
  const reposList = document.getElementById('repos-list');
  
  userList.innerHTML = ''; // Clear previous search results
  reposList.innerHTML = ''; // Clear previous search results

  users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
          <h3>${user.login}</h3>
          <img src="${user.avatar_url}" alt="${user.login}" width="100">
          <a href="${user.html_url}" target="_blank">GitHub Profile</a>
      `;

      userItem.addEventListener('click', () => {
          getUserRepositories(user.login);
      });

      userList.appendChild(userItem);
  });
}

async function getUserRepositories(username) {
  const repositoriesEndpoint = `https://api.github.com/users/${username}/repos`;
  const response = await fetch(repositoriesEndpoint, {
      headers: {
          'Accept': 'application/vnd.github.v3+json'
      }
  });

  if (!response.ok) {
      alert('Error fetching user repositories.');
      return;
  }

  const repositories = await response.json();
  displayRepositories(repositories);
}

function displayRepositories(repositories) {
  const reposList = document.getElementById('repos-list');
  reposList.innerHTML = '';

  repositories.forEach(repo => {
      const repoItem = document.createElement('li');
      repoItem.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
      `;

      reposList.appendChild(repoItem);
  });
}
