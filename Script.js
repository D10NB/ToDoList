const { createApp } = Vue;

createApp({
    data() {
        return {
            newTaskName: '',
            tasks: []
        }
    },

    async mounted() {
        this.fetchTasks(); // Haal taken op bij laden
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
            this.fetchTasks(); // opnieuw laden
        },

        async delItem(task) {
            await fetch(`/tasks/${task.id}`, {
                method: 'DELETE'
            });

            this.fetchTasks(); // opnieuw laden
        }
    }
}).mount('#taskList');