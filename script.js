//fetch and display post

//1. Getting elements using id(post: button- fetchbutton,error and postlist))
const fetchButton = document.getElementById("fetchButton");
const errorMessage = document.getElementById("error");
const postList = document.getElementById("postList");
//2.getting elements using id(postform,titleinput,bodyinput,formerror,form success)
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");


//writing function for Posts(fetching data and displaying the data )

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
    posts.slice(0,5).forEach((post) => { //only displaying 5 posts
        // Create a div for each post
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        // Add post title and body
        postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postList.appendChild(postDiv);
    });
}

//Function for form submit

postForm.addEventListener("submit", (event) => { // make sure to add event parameter so the browser doesn't actually refresh the page 
  event.preventDefault();
  // user input
  const title = titleInput.value;
  const body = bodyInput.value;


  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST", // replaces default
    headers: { "Content-Type": "applicaiton/json" }, // specifies the format of request body
    body: JSON.stringify( // turns user data into a string
      {
        title,
        body
      })
  }).then(response => {
    if (!response.ok) { // valiadtion if connectivity issue
      throw new Error("Post submission unsuccessful")
    }
    alert("Form submitted!");
    return response.json()
  }).then(data => {
    formSuccess.textContent = "Post submitted!"

    // reset form text content
    titleInput.value = "";
    bodyInput.value = "";
  }).catch(err => {
    formError.innerHTML = "Error submitting posts: " + err.message;
  });
})
