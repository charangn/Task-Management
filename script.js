document.addEventListener("DOMContentLoaded", function() {
    const taskList = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task-btn");
    const addTaskModal = document.getElementById("add-task-modal");
    const editTaskModal = document.getElementById("edit-task-modal");
    const closeModalBtns = document.querySelectorAll(".close");
    const addTaskForm = document.getElementById("add-task-form");
    const editTaskForm = document.getElementById("edit-task-form");

    // Dummy data for initial tasks
    let tasks = [
        { id: 1, title: "Task 1", description: "Description of Task 1", dueDate: "2024-05-15" },
        { id: 2, title: "Task 2", description: "Description of Task 2", dueDate: "2024-05-20" }
    ];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
    
        tasks.forEach(task => {
            const li = document.createElement("li");
    
            const span = document.createElement("span");
            span.textContent = task.title;
            li.appendChild(span);
    
            const buttonContainer = document.createElement("div");
            buttonContainer.style.marginTop = "5px"; // Adjust the value for desired space between task name and buttons
    
            const viewBtn = document.createElement("button");
            viewBtn.textContent = "View";
            viewBtn.className = "view-btn";
            viewBtn.dataset.id = task.id;
            buttonContainer.appendChild(viewBtn);
    
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "edit-btn";
            editBtn.dataset.id = task.id;
            buttonContainer.appendChild(editBtn);
    
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.dataset.id = task.id;
            buttonContainer.appendChild(deleteBtn);
    
            li.appendChild(buttonContainer);
    
            taskList.appendChild(li);
        });
    }

    // Function to show add task modal
    function showAddTaskModal() {
        addTaskModal.style.display = "block";
    }

    // Function to hide add task modal
    function hideAddTaskModal() {
        addTaskModal.style.display = "none";
    }

    // Function to show edit task modal
    function showEditTaskModal(taskId) {
        const task = tasks.find(task => task.id === taskId);
        document.getElementById("edit-title").value = task.title;
        document.getElementById("edit-description").value = task.description;
        document.getElementById("edit-due-date").value = task.dueDate;
        editTaskModal.style.display = "block";
    }

    // Function to hide edit task modal
    function hideEditTaskModal() {
        editTaskModal.style.display = "none";
    }

    // Event listener for add task button click
    addTaskBtn.addEventListener("click", showAddTaskModal);

    // Event listener for close modal buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            if (this.closest(".modal") === addTaskModal) {
                hideAddTaskModal();
            } else {
                hideEditTaskModal();
            }
        });
    });

    // Event listener for submitting add task form
    addTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = this.title.value;
        const description = this.description.value;
        const dueDate = this["due-date"].value;
        const newTask = {
            id: tasks.length + 1,
            title: title,
            description: description,
            dueDate: dueDate
        };
        tasks.push(newTask);
        renderTasks();
        hideAddTaskModal();
        this.reset();
    });

    // Event listener for submitting edit task form
    editTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = this["edit-title"].value;
        const description = this["edit-description"].value;
        const dueDate = this["edit-due-date"].value;
        const taskId = parseInt(this.getAttribute("data-id"));
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].title = title;
            tasks[taskIndex].description = description;
            tasks[taskIndex].dueDate = dueDate;
            renderTasks();
            hideEditTaskModal();
        }
    });

    // Event delegation for view, edit, delete buttons
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("view-btn")) {
            const taskId = parseInt(event.target.getAttribute("data-id"));
            const task = tasks.find(task => task.id === taskId);
            document.getElementById("task-details-content").innerHTML = `
                <p><strong>Title:</strong> ${task.title}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Due Date:</strong> ${task.dueDate}</p>
            `;
        } else if (event.target.classList.contains("edit-btn")) {
            const taskId = parseInt(event.target.getAttribute("data-id"));
            showEditTaskModal(taskId);
            editTaskForm.setAttribute("data-id", taskId);
        } else if (event.target.classList.contains("delete-btn")) {
            const taskId = parseInt(event.target.getAttribute("data-id"));
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
        }
    });

    // Render initial tasks
    renderTasks();
});
