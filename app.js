// Class untuk manajemen task
class Dashboard {
    constructor() {
      this.tasks = this.loadTasks();
      this.renderTasks();
    }
  
    loadTasks = () => {
      const data = localStorage.getItem('tasks');
      return data ? JSON.parse(data) : [];
    }
  
    saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    addTask = (text) => {
      this.tasks.push({ id: Date.now(), text });
      this.saveTasks();
      this.renderTasks();
    }
  
    deleteTask = (id) => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
      this.renderTasks();
    }
  
    renderTasks = () => {
      const list = document.getElementById('task-list');
      list.innerHTML = '';
      this.tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${task.text} 
          <button onclick="dashboard.deleteTask(${task.id})">Hapus</button>
        `;
        list.appendChild(li);
      });
    }
  }
  
  const dashboard = new Dashboard();
  
  document.getElementById('dashboard-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('task-input');
    const value = input.value.trim();
    if (value) {
      dashboard.addTask(value);
      input.value = '';
    }
  });
  