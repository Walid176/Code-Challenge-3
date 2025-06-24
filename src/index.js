const url = "http://localhost:3000/posts";

// Show all posts
function showPosts() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("post-list");
      list.innerHTML = "";

      data.forEach(post => {
        const item = document.createElement("div");
        item.className = "post";
        item.innerHTML = `<h3>${post.title}</h3>`;

        item.addEventListener("click", () => {
          showPostDetail(post.id);
        });

        list.appendChild(item);
      });
    });
}

// Show one post when clicked
function showPostDetail(id) {
  fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
    });
}

// Add a new post
function setupForm() {
  const form = document.getElementById("new-post-form");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    const post = {
      title: title,
      body: body
    };

    const list = document.getElementById("post-list");
    const item = document.createElement("div");
    item.className = "post";
    item.innerHTML = `<h3>${post.title}</h3>`;
    list.appendChild(item);

    form.reset();
  });
}

// Run this when page is ready
document.addEventListener("DOMContentLoaded", () => {
  showPosts();
  setupForm();
});
