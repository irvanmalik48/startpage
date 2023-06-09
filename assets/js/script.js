const time = document.getElementById("time");
const date = document.getElementById("date");
const quoteEl = document.getElementById("quote");

const todoEl = document.getElementById("todo-input");

const labelling = document.getElementById("labelling");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");

const youtubeToggle = document.getElementById("youtube-toggle");
const googleToggle = document.getElementById("google-toggle");

youtubeToggle.addEventListener("click", () => {
  changeMode("youtube");
});

googleToggle.addEventListener("click", () => {
  changeMode("google");
});

todoEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

const quotes = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
  "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt",
  "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. - James Cameron",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "Spread love everywhere you go. Let no one ever come to you without leaving happier. - Mother Teresa",
  "When you reach the end of your rope, tie a knot in it and hang on. - Franklin D. Roosevelt",
  "Always remember that you are absolutely unique. Just like everyone else. - Margaret Mead",
  "Don't judge each day by the harvest you reap but by the seeds that you plant. - Robert Louis Stevenson",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Tell me and I forget. Teach me and I remember. Involve me and I learn. - Benjamin Franklin",
  "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart. - Helen Keller",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "Whoever is happy will make others happy too. - Anne Frank",
  "Do not go where the path may lead, go instead where there is no path and leave a trail. - Ralph Waldo Emerson",
  "You will face many defeats in life, but never let yourself be defeated. - Maya Angelou",
];

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${amPm}`;

  setTimeout(showTime, 1000);
}

function showDate() {
  let today = new Date(),
    day = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  // Output Date
  date.innerHTML = `${addZero(day)}<span>/</span>${addZero(
    month
  )}<span>/</span>${year}`;
}

function showQuote() {
  let randomQuote = Math.floor(Math.random() * quotes.length);

  quoteEl.innerHTML = quotes[randomQuote];

  setTimeout(showQuote, 10000);
}

function populateTodos() {
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  let todoList = document.getElementById("todos");

  if (todos.length === 0) {
    todoList.innerHTML = `<li id="no-todos" class="text-gray-300 text-center w-full text-sm flex justify-between items-center px-3 py-2.5">Is there anything you want to do?</li>`;
  } else {
    todos.forEach((todo) => {
      let li = document.createElement("li");
      let content = document.createElement("p");
      li.className =
        "flex items-center justify-between px-3 py-2 text-sm text-gray-300";

      let doneBtn = document.createElement("button");
      doneBtn.className =
        "bg-blue-300 hover:bg-gray-100 transition text-gray-900 font-bold px-4 py-0.5 rounded-full";

      doneBtn.appendChild(document.createTextNode("Done"));
      doneBtn.addEventListener("click", function () {
        this.parentNode.remove();

        let todos = localStorage.getItem("todos")
          ? JSON.parse(localStorage.getItem("todos"))
          : [];

        let todo = this.parentNode.firstChild.textContent;

        let index = todos.indexOf(todo);

        if (index > -1) {
          todos.splice(index, 1);
        }

        localStorage.setItem("todos", JSON.stringify(todos));

        todos = JSON.parse(localStorage.getItem("todos"));

        if (todos.length === 0) {
          todoList.innerHTML = `<li id="no-todos" class="text-gray-300 text-center w-full text-sm flex justify-between items-center px-3 py-2.5">Is there anything you want to do?</li>`;
        }
      });

      content.className = "text-sm text-gray-300";
      content.appendChild(document.createTextNode(todo));

      li.appendChild(content);
      li.appendChild(doneBtn);

      todoList.appendChild(li);
    });
  }
}

function changeMode(mode) {
  if (mode === "youtube") {
    labelling.innerHTML = labelling.innerHTML.replace("search for", "watch");

    searchInput.placeholder = "Type what you want to watch here...";

    searchForm.action = "https://www.youtube.com/results";
  } else if (mode === "google") {
    labelling.innerHTML = labelling.innerHTML.replace("watch", "search for");

    searchInput.placeholder = "Search for something...";

    searchForm.action = "https://www.google.com/search";
  }
}

populateTodos();

function addTodo() {
  let todo = todoEl.value;
  let todoList = document.getElementById("todos");

  if (todo === "") {
    alert("Please enter a todo");
  } else {
    if (document.getElementById("no-todos")) {
      document.getElementById("no-todos").remove();
    }

    // store todo in local storage
    let todos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    let li = document.createElement("li");
    let content = document.createElement("p");
    li.className =
      "flex items-center justify-between px-3 py-2 text-sm text-gray-300";

    let doneBtn = document.createElement("button");
    doneBtn.className =
      "bg-blue-300 hover:bg-gray-100 transition text-gray-900 font-bold px-4 py-0.5 rounded-full";

    doneBtn.appendChild(document.createTextNode("Done"));
    doneBtn.addEventListener("click", function () {
      this.parentNode.remove();

      let todos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];

      let todo = this.parentNode.firstChild.textContent;

      let index = todos.indexOf(todo);

      if (index > -1) {
        todos.splice(index, 1);
      }

      localStorage.setItem("todos", JSON.stringify(todos));

      todos = JSON.parse(localStorage.getItem("todos"));

      if (todos.length === 0) {
        todoList.innerHTML = `<li id="no-todos" class="text-gray-300 text-center w-full text-sm flex justify-between items-center px-3 py-2.5">Is there anything you want to do?</li>`;
      }
    });

    content.className = "text-sm text-gray-300";
    content.appendChild(document.createTextNode(todo));

    li.appendChild(content);
    li.appendChild(doneBtn);

    todoList.appendChild(li);

    todoEl.value = "";
  }
}

showDate();

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

showTime();

showQuote();
