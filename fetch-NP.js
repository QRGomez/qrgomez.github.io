const API_Source = "https://jsonplaceholder.typicode.com/posts";
const API_Source_Users = "https://jsonplaceholder.typicode.com/users";

const fetchUsers = async () => {
  try {
    const users = await fetch(API_Source_Users);
    return await users.json();
  } catch (error) {
    console.log(error);
  }
};

const getSelectedItem = () => {
  var U_id = document.getElementById("user_ID");
  var ID_val = U_id.value;

  return ID_val;
};

const goToFilter = () => {
  var element = document.getElementById("filters");
  element.scrollIntoView({
    block: "start",
    inline: "nearest",
    behavior: "smooth",
  });
};
document.getElementById("btns").addEventListener("click", goToFilter);
const produceContent = async (response) => {
  id = getSelectedItem();
  let outputContainer = document.getElementById("card_container");
  outputContainer.innerHTML = "";

  const data = await response.json();
  const outputDiv = document.createElement("div");
  outputDiv.className = "card_wrapper";
  data.forEach((item) => {
    const content = document.createElement("div");

    content.innerHTML = `
            <div class = "card">
                <h1>${item.title}</h1>
                <br>
                <p>${item.body}</p>
                <button class = "card_btn">View More</button>
            </div>
            `;
    outputDiv.appendChild(content);
  });
  outputContainer.appendChild(outputDiv);
};

const fetchPosts = async () => {
  id = getSelectedItem();
  let outputContainer = document.getElementById("card_container");
  outputContainer.innerHTML = "";

  if (id == 0) {
    const response = await fetch(`${API_Source}`);
    produceContent(response);
  } else {
    const response = await fetch(`${API_Source}?userId=${id}`); // API link based on selected ID
    produceContent(response);
  }
};

window.addEventListener("load", async () => {
  const dropdown = document.getElementById("user_ID");
  const user = await fetchUsers();
  innerHTML = `<option value=0>Show All Posts</option>`;
  user.forEach((i) => {
    innerHTML += `<option value=${i.id}>${i.name}</>`;
  });
  dropdown.innerHTML = innerHTML;
  fetchPosts();
  document.documentElement.scrollTop = 0;
});
