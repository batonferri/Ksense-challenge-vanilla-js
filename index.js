const title = document.querySelector(".title");
const table = document.querySelector("table");
const postsDiv = document.querySelector(".posts");
const backBtn = document.querySelector(".backBtn");
const api = "https://jsonplaceholder.typicode.com";

const userHeaders = [
  "id",
  "name",
  "email",
  "phone",
  "website",
  "username",
  "address",
  "company",
];

const loadUsers = async () => {
  const response = await fetch(`${api}/users`);
  const data = await response.json();
  title.innerHTML = `All Users`;
  table.innerHTML = `
  <thead><tr>${userHeaders
    .map((item) => {
      return `<th>${item}</th>`;
    }, "")
    .join("")}</tr></thead>
    <tbody>${data
      .map((item) => {
        return `<tr onclick="loadPosts(${item.id}, '${item.username}')"><th>${
          item.id
        }</th>
        <th>${item.name}</th>
        <th>${item.email}</th>
        <th>${item.phone}</th>
        <th>${item.website}</th>
        <th>${item.username}</th>
        <th>${
          item.address.street +
          " " +
          item.address.suite +
          ", " +
          item.address.city +
          ", " +
          item.address.zipcode
        }</th>
        <th>${item.company.name}</th></tr>`;
      }, "")
      .join("")}<tbody>
`;
};

loadUsers();

const loadPosts = async (id, username) => {
  const response = await fetch(`${api}/posts`);
  const data = await response.json();
  title.innerHTML = `${username}'s Posts`;
  postsDiv.innerHTML = data
    .filter((item) => item.userId === id)
    .map((i) => {
      return `<div class="post">
    <div class="container">
      <h2>${i.title}</h2>
      <p>${i.body}</p>
    </div>
  </div>`;
    }, "")
    .join("");
  table.innerHTML = "";
  table.style.display = "none";
  backBtn.style.display = "block";
};

const goBack = () => {
  postsDiv.innerHTML = "";
  table.style.display = "block";
  backBtn.style.display = "none";
  loadUsers();
};
