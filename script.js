let inp = document.querySelector("#in");
let btnadd = document.querySelector("#btn");
let list = document.querySelector("#List");
let btnf = document.querySelector(".btnf");
let msg = document.querySelector("#msg");

let tasks = [];

btnadd.addEventListener("click", () => {
  let value = inp.value.trim();
  if (value === "") return;

  let li = document.createElement("li");
  li.innerText = value;
  li.classList.add("liclass");

  let doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.classList.add("donebtn");

  let removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.classList.add("removebtn");

  li.append(doneBtn, removeBtn);
  list.append(li);
  tasks.push(li);

  inp.value = "";


  doneBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.style.textDecoration = "line-through";
    unfocusmode();
  });


  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    list.removeChild(li);
    if (li.classList.contains("selected")) {
      
     unfocusmode();
    }

    tasks = tasks.filter(t => t !== li);

    if (tasks.length === 0 && focusActive) {
    focusActive = false;
    btnf.classList.remove("changeclrf");
    msg.innerText = "";
    unfocusmode();
}
  });
});

let focusActive = false;

btnf.addEventListener("click", () => {
  if (tasks.length === 0 && !focusActive) return;

  focusActive = !focusActive;
  btnf.classList.toggle("changeclrf", focusActive);

  if (focusActive) {
    msg.innerText = "*Focus Mode ON — click a task to focus on it";
    focusmode();
  } else {
    msg.innerText = "";
    unfocusmode();
  }
});


function focusmode() {
  tasks.forEach(task => {
    task.onclick = () => {
      tasks.forEach(t => {
        t.classList.remove("selected");
        t.classList.add("unselected");
      });

      task.classList.remove("unselected");
      task.classList.add("selected");
    };
  });
}


function unfocusmode() {
  tasks.forEach(task => {
    task.classList.remove("selected", "unselected");
});
}