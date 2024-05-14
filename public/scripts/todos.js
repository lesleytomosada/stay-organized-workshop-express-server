document.addEventListener("DOMContentLoaded", function () {
  const users = document.getElementById("users");
  const selectLabel = document.createElement("option");
  const navToggle = document.getElementById("nav-toggle");
  selectLabel.value = "Select";
  selectLabel.textContent = "Select a User";
  selectLabel.disabled = true;
  selectLabel.selected = true;
  users.appendChild(selectLabel);
  fetch("http://localhost:8083/api/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        users.appendChild(option);
      });
    });
  users.addEventListener("change", getTodos);
  navToggle.addEventListener("click", function () {
    const navContent = document.getElementById("nav-content");
    navContent.classList.toggle("hidden");
  });
});

function getTodos() {
    const users = document.getElementById("users");
    const todoResults = document.getElementById("todoResults");
    const userId = users.value;
    fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            todoResults.innerHTML = "";
            data.forEach((todo) => {
                console.log(todo);
                const card = `
                <div class="w-64 h-40 mx-1 my-2 relative flex rounded border rounded overflow-hidden shadow-sm">
                    <div class="px-3 py-3">
                        <div class="font-semibold uppercase text-gray-500 tracking-widest mb-2">${todo.description}</div>
                        <p id="taskDeadline" class="deadline${todo.id} text-gray-700 text-base">
                            ${todo.completed ? "Completed": "Deadline: " + todo.deadline}
                        </p>
                        <button id="details" class="absolute bottom-2 left-3 border rounded text-white bg-gray-500 px-3 py-1 mt-3 hover:bg-gray-700">Details</button>
                            ${todo.completed ? "" : `<button id="markComplete" class="complete-${todo.id} absolute bottom-2 right-3 border rounded text-white bg-gray-500 px-3 py-1 mt-3 hover:bg-gray-700">Mark complete</button>`}
                       
                </div>`;
                todoResults.innerHTML += card;
                const detailsButtons = document.querySelectorAll("#details");
                detailsButtons.forEach((button, index) => {
                    button.addEventListener("click", function () {
                        getTodoDetails(data[index]);
                    });
                });
                const markCompleteButtons = document.querySelectorAll("#markComplete");
                markCompleteButtons.forEach((button, index) => {
                    button.addEventListener("click", function () {
                        markComplete(data[index]);
                    });
                });
            });
        });
} 
function getTodoDetails(task) {
  const modal = document.getElementById("modal");
  const taskModal = `
    <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed inset-0 flex items-center justify-center overflow-x-hidden z-50">
  <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 id="taskName" class="font-semibold uppercase tracking-widest text-gray-900 dark:text-white">
                  ${task.description}
              </h3>
              <button id="close" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto
               inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Close modal</span>
              </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Category: ${task.category}
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Priority: ${task.priority}
              </p>
              <p class="text-base leading-relaxed mb-6 text-gray-500 dark:text-gray-400">
                  Deadline: ${task.deadline}
              </p>
          </div>
      </div>
  </div>
</div>
</div>
    `;
  modal.innerHTML = taskModal;
  modal.classList.toggle("hidden");
  const closeButton = document.getElementById("close");
  closeButton.addEventListener("click", hideModal);
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.classList.toggle("hidden");
}

function markComplete(task) {
    fetch(`http://localhost:8083/api/todos/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(() => {
        const markCompleteButton = document.querySelector(".complete-" + task.id);
        markCompleteButton.classList.add("hidden");

        const taskDeadline = document.querySelector('.deadline' + task.id);
        taskDeadline.innerHTML = "Completed";
    })
  
}