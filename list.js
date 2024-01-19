window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach((taskText) => {
        createTaskElement(taskText);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert('Please fill out the task');
            return;
        }

        // Save task to localStorage
        savedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        createTaskElement(task);

        input.value = '';
    });

    function createTaskElement(taskText) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = taskText;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);
        task_el.appendChild(task_content_el);

        const task_action_el = document.createElement('div');
        task_action_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = 'EDIT';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerHTML = 'DELETE';

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);

        task_el.appendChild(task_action_el);
        list_el.appendChild(task_el);

        // Event listeners for edit and delete
        task_edit_el.addEventListener('click', () => {
            // Your existing edit logic here
        });

        task_delete_el.addEventListener('click', () => {
            // Remove task from savedTasks array
            const taskIndex = savedTasks.indexOf(taskText);
            if (taskIndex !== -1) {
                savedTasks.splice(taskIndex, 1);
            }

            // Save updated tasks to localStorage
            localStorage.setItem('tasks', JSON.stringify(savedTasks));

            // Remove the task element from the DOM
            list_el.removeChild(task_el);
        });
    }
});
