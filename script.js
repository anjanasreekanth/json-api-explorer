


//List Posts section
errorDiv = document.getElementById("errorDiv");
postList = document.getElementById("postList");
fetchButton = document.getElementById("fetchButton");
// Fetch posts from API when button is clicked
function fetchPosts() {
    postList.innerHTML = "";
    errorDiv.textContent = "";
    postList.textContent = "Loading..."; // Show loading message
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((posts) => {
            renderPosts(posts); // Display posts
        })
        .catch((err) => {
            postList.innerHTML = "";
            errorDiv.textContent = "Error loading posts: " + err.message;
        });
}
// Listen for button click to fetch posts
fetchButton.addEventListener("click", fetchPosts);
// Helper function to render posts in the DOM
function renderPosts(posts) {
    postList.innerHTML = ""; // Clear previous posts
    posts.slice(0,5).forEach((post) => {
        // Create a div for each post
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        // Add post title and body
        postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postList.appendChild(postDiv);
    });
}

//Create and Send a new Post
postForm = document.getElementById("postForm");
titleInput = document.getElementById("titleInput");
bodyInput = document.getElementById("bodyInput");
formError = document.getElementById("formError");
formSuccess = document.getElementById("formSuccess");
postButton = document.getElementById("postButton");

//when submit button is clicked
postButton.addEventListener("click", event => {
    
    const title = titleInput.value;
    const body = bodyInput.value;
    formError.textContent = '';
    formSuccess.textContent = '';
    
    console.log(title);
    console.log(body);

    
    event.preventDefault();
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            title: title,
            body: body,
        }),
    })
    .then(response => {    
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status} - ${response.statusText || 'Unknown Error'}`);
        }
              
        return response.json(); 
    })
    .then(createdPost => {
        console.log("createdPost", createdPost);
        formSuccess.textContent = `Post created successfully! (ID: ${createdPost.id})\n${JSON.stringify(createdPost, null, 2)}`;
        titleInput.value = '';
        bodyInput.value = '';
    })
    .catch(error => {    
        formError.textContent = `Error creating post: ${error.message}`;
    });
});

