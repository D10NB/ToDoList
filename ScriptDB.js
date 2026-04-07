const API_URL = "http://192.168.x.x:3000/tasks"; // Gebruik hier je eigen IPv4!

createApp({
    data() {
        return {
            newTaskName: '',
            tasks: []
        }
    },
    async mounted() {
        this.fetchTasks(); // Haal taken op als de site laadt
    },
    methods: {
        async fetchTasks() {
            const response = await fetch(API_URL);
            this.tasks = await response.json();
        },
        async newItem() {
            if (!this.newTaskName) return;
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.newTaskName })
            });
            this.newTaskName = '';
            this.fetchTasks(); // Vernieuw de lijst
        },
        async delItem(task) {
            await fetch(`${API_URL}/${task.id}`, { method: 'DELETE' });
            this.fetchTasks(); // Vernieuw de lijst
        }
    }
}).mount('#taskList');
