<template>
  <div>
    <nav class="navbar navbar-ligth bg-light">
      <a href="/" class="navbar-brand">MEVN Todo sample project</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent='sendTask'>
                <div class="form-group">
                  <input type="text"
                         v-model="task.title"
                         class="form-control"
                         placeholder="Insert a task">
                </div>
                <div class="form-group pt-2">
                  <textarea class="form-control"
                            v-model="task.description"
                            placeholder="Insert a description"
                            cols="30"
                            rows="10">
                  </textarea>
                </div>
                <div class="d-grid gap-2 pt-2">
                    <button v-if="edit === false" class="btn btn-primary">Send</button>
                    <button v-else class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>
                  Task
                </th>
                <th>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                  <button @click="updateTask(task._id)" class="btn btn-secondary">Edit</button>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
   class Task {
     constructor(title, description) {
       this.title = title;
       this.description = description;
     }
   }

  export default {
    data() {
      return {
        task: new Task(),
        tasks: [],
        edit: false,
        taskToEdit: ''
      }
    },
    created() {
      this.getTasks();
    },
    methods: {
      getTasks: function (){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
      },
      sendTask: function (){
        if(!this.edit){
          fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.task),
            headers: {
              'Accept': 'application/json',
              'content-type': 'application/json'
            }
          }).then(res => res.json())
              .then(() =>{
                this.getTasks();
              })
          this.task = new Task();
        }
        else {
          fetch('/api/tasks/' + this.taskToEdit, {
            method: 'PUT',
            body: JSON.stringify(this.task),
            headers: {
              'Accept': 'application/json',
              'content-type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(() =>{
            this.edit = false;
            this.getTasks();
          })
          this.task = new Task();
        }
      },
      deleteTask: function(id){
        fetch('api/tasks/'+id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(() => {
          this.getTasks();
        })
      },
      updateTask: function(id){
        fetch('api/tasks/'+id)
        .then((res) => res.json())
        .then((data) => {
          this.task = new Task(data.title, data.description);
          this.taskToEdit = data._id;
          this.edit = true;
        })
      }
    }
  }
 </script>