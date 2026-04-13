const { createApp } = Vue;

createApp({
    data() {
        return {
            newTaskName: '',
            tasks: []
        }
    },

    async mounted() {
        this.fetchTasks(); 
    },

    methods: {
        async fetchTasks() {
            const res = await fetch('/tasks');
            this.tasks = await res.json();
        },

        async newItem() {
            if (!this.newTaskName) return;

            await fetch('/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.newTaskName })
            });

            this.newTaskName = '';
            this.fetchTasks(); 
        },

        async delItem(task) {
            await fetch(`/tasks/${task.id}`, {
                method: 'DELETE'
            });

            this.fetchTasks();
        },
        async toggleCompletion(task, event){
            const completion = event.target.checked ? 1 : 0;

            await fetch(`/tasks/${task.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({completed : completion})
            });

            this.fetchTasks();
        }
    }
}).mount('#taskList');