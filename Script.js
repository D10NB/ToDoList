const { createApp } = Vue;

createApp({
    data() {
        return {
            newTaskName: '', // Voor het tekstveld
            tasks: [         // De lijst met taken
                { name: "Het kopen van een pen" },
                { name: "Koken" },
                { name: "Stofzuigen" }
            ]
        }
    },
    methods: {
        newItem() {
            if (!this.newTaskName) {
                return; // Doe niets als het veld leeg is
            }
            this.tasks.push({
                name: this.newTaskName
            });
            this.newTaskName = ''; // Maak het tekstveld weer leeg
        },
        delItem(task) {
            this.tasks.splice(this.tasks.indexOf(task), 1);
        }
    }
}).mount('#taskList');
