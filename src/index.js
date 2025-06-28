const url = 'http://localhost:3000/posts';
const form = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');

// GET method
function getPosts() {
  fetch(url)
    .then((response) => response.json())
    .then((posts) => {
      let postsHtml = '';
      posts.forEach((post) => {
        postsHtml += `
          <div id="post-${post.id}">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <img src="${post.image}" alt="Post Image" style="width: 100px; height: 100px;">
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
          </div>
        `;
      });
      postsContainer.innerHTML = postsHtml;
    })
    .catch((error) => console.error('Error fetching posts:', error));
}

// POST method
function addPost(postData) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((post) => {
      console.log('Post added:', post);
      getPosts();
    })
    .catch((error) => console.error('Error adding post:', error));
}

// PATCH method
function editPost(id) {
  const title = prompt('Enter new title:');
  const body = prompt('Enter new body:');
  const image = prompt('Enter new image URL:');
  const postData = { title, body, image };

  fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((post) => {
      console.log('Post updated:', post);
      getPosts();
    })
    .catch((error) => console.error('Error updating post:', error));
}

// DELETE method
function deletePost(id) {
  fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      console.log('Post deleted');
      getPosts();
    })
    .catch((error) => console.error('Error deleting post:', error));
}

// new form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('content').value;
  const image = document.getElementById('image').value;
  const postData = { title, body, image };
  addPost(postData);
  form.reset();
});

// load all posts
getPosts();
