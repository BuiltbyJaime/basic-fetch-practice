const outputDiv = document.getElementById("output");

document.getElementById("getAllUsers").addEventListener("click", async () => {
  const users = await fetchUsers();
  displayUsers(users);
});

document.getElementById("getFilteredUsers").addEventListener("click", async () => {
  const users = await fetchUsers();
  const filtered = users.filter(user => user.yearsEmployed < 10);
  displayUsers(filtered);
});

document.getElementById("reset").addEventListener("click", () => {
  outputDiv.innerHTML = "";
});

async function fetchUsers() {
  const endpoint = "https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json";
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Failed to fetch users.");
    return await response.json();
  } catch (err) {
    outputDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    return [];
  }
}

function displayUsers(users) {
  if (users.length === 0) {
    outputDiv.innerHTML = "<p>No users found.</p>";
    return;
  }

  outputDiv.innerHTML = users.map(user => `
    <div style="margin-bottom: 1rem; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem;">
      <strong>${user.firstName} ${user.lastName}</strong><br>
      Experience: ${user.yearsEmployed} years
    </div>
  `).join("");
}
