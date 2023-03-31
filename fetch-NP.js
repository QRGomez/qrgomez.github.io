const API_Source = "https://jsonplaceholder.typicode.com/posts";
const API_Source_Users = "https://jsonplaceholder.typicode.com/users";
var curr_Page = 0;
let total_pages = 0;

//--------------------------

const fetchUsers = async () => {
  try {
    const users = await fetch(API_Source_Users);
    return await users.json();
  } catch (error) {
    console.log(error);
  }
};

const nextPage = () => {
  if (curr_Page < total_pages - 1) {
    curr_Page++;
    fetchPosts();
  }
};

const backPage = () => {
  if (curr_Page > 0) {
    curr_Page--;
    fetchPosts();
  }
};

const curr_Page_check = () => {
  if (curr_Page == 0) {
    curr_Page = 0;
    document.getElementById("prev").disabled = true;
    document.getElementById("next").disabled = false;
  } else if (curr_Page == total_pages - 1) {
    curr_Page = total_pages - 1;
    document.getElementById("next").disabled = true;
    document.getElementById("prev").disabled = false;
  } else {
    document.getElementById("prev").disabled = false;
    document.getElementById("next").disabled = false;
  }
};

const page_reset = () => {
  curr_Page = 0;
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

//--------------------------
document.getElementById("user_ID").addEventListener("change", page_reset);
document.getElementById("next").addEventListener("click", nextPage);
document.getElementById("prev").addEventListener("click", backPage);
document.getElementById("btns").addEventListener("click", goToFilter);

const produceContent = async (response) => {
  let outputContainer = document.getElementById("card_container");
  outputContainer.innerHTML = "";
  const data = response;
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

const createPages = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const num_of_pages = Math.ceil(data.length / 6);
    total_pages = num_of_pages;
    let page_divider = new Array(num_of_pages);

    for (let i = 0; i < page_divider.length; i++) {
      page_divider[i] = [];
    }

    var page_num = 0;
    data.forEach((item) => {
      if (page_divider[page_num].length < 6) {
        page_divider[page_num].push(item);
      } else {
        page_num++;
        page_divider[page_num].push(item);
      }
    });

    return page_divider;
  } catch (error) {
    console.log(error);
  }
};

const displayPages = async (url) => {
  pages = "";
  try {
    pages = await createPages(url);
    produceContent(pages[curr_Page]);
    pagetrack = document.getElementById("currPage");
    pagetrack.innerHTML = `<h3>${curr_Page + 1}</h3>`;
  } catch (error) {
    console.log(error);
  }
};
const fetchPosts = async () => {
  curr_Page_check();
  id = getSelectedItem();
  let outputContainer = document.getElementById("card_container");
  outputContainer.innerHTML = "";
  pages = "";
  if (id == 0) {
    displayPages(`${API_Source}`);
  } else {
    displayPages(`${API_Source}?userId=${id}`);
  }
};
//--------------------------
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
