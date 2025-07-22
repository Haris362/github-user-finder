const userName = document.getElementById('input')
const button = document.getElementById("submit-button")
const userFinder = async () => {
    const url = `https://api.github.com/users/${userName.value}`
  
  try {
    const response = await fetch(url);
    const data = await response.json()


    const resultDiv = document.getElementById("resultDiv")
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
        resultDiv.style.display = `block`
        // userName.value = ""
    }
    catch (error) {
      resultDiv.innerHTML = `<div class="error-box">❌ Error: ${error.message}</div>`;
      console.log(error);
    }
  }
     button.addEventListener("click", () => {
        userFinder()
        userName.value = ""
      })
userName.addEventListener("keydown",(e)=>{
    if (e.key === "Enter"){
        userFinder()
        userName.value = ""
    }
})