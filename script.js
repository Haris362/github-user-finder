const userName = document.getElementById('input');
const message = document.getElementById("message");

const userFinder = async () => {
  const user = userName.value.trim();  // Get input value inside the function

  if (user === "") {
    message.textContent = "Please enter a GitHub username.";
    message.style.display = "block";
    return;
  } else {
    message.style.display = "none";
  }

  const url = `https://api.github.com/users/${user}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      message.textContent = "User not found!";
      message.style.display = "block";
      return;
    }

    const data = await response.json();

    const resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}" width="120" />
      <h2>${data.name || "No Name Available"} (@${data.login})</h2>
      <p><strong>Bio:</strong> ${data.bio || "No bio provided"}</p>
      <p><strong>Location:</strong> ${data.location || "Not mentioned"}</p>
      <p><strong>Website:</strong> 
        ${data.blog ? `<a href="${data.blog}" target="_blank">${data.blog}</a>` : "None"}
      </p>
      <p><strong>Twitter:</strong> 
        ${data.twitter_username ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank">@${data.twitter_username}</a>` : "None"}
      </p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
      <p><strong>Followers:</strong> ${data.followers}</p>
      <p><strong>Following:</strong> ${data.following}</p>
      <p><strong>GitHub Since:</strong> ${new Date(data.created_at).toDateString()}</p>
      <p><a href="${data.html_url}" target="_blank">🔗 View Full GitHub Profile</a></p>
    `;
    resultDiv.style.display = "block";

  } catch (error) {
    console.log(error);
    message.textContent = "Error fetching data.";
    message.style.display = "block";
  }
};

const button = document.getElementById("submit-button");
button.addEventListener("click", () => {
  userFinder();
  userName.value = "";
});

userName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    userFinder();
    userName.value = "";
  }
});
