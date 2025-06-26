const url = "http://localhost:3000/posts";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("new-post-form");
  loadPosts();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const image = document.getElementById("img-link").value;
    const postId = form.getAttribute("data-id");

    const post = { title, body, image };
    const method = postId ? "PUT" : "POST";
    const endpoint = postId ? `${url}/${postId}` : url;

    fetch(endpoint, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    }).then(() => {
      form.reset();
      form.removeAttribute("data-id");
      loadPosts();
    });
  });
});

function loadPosts() {
  fetch(url)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";

      posts.forEach(post => {
        const box = document.createElement("div");
        box.innerHTML = `
          <h3 onclick="showPost(${post.id})">${post.title}</h3>
          <button onclick="editPost(${post.id})">Edit</button>
          <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postList.appendChild(box);
      });
    });
}

function showPost(id) {
  fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        ${post.image ? `<img src="${post.image}" style="max-width:100%;"><br>` : ""}
        <p>${post.body}</p>
      `;
    });
}

function editPost(id) {
  fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(post => {
      document.getElementById("title").value = post.title;
      document.getElementById("body").value = post.body;
      document.getElementById("img-link").value = post.image;
      document.getElementById("new-post-form").setAttribute("data-id", post.id);
    });
}

function deletePost(id) {
  fetch(`${url}/${id}`, { method: "DELETE" }).then(loadPosts);
}
