<template>
<div class="ToDoList">
  <h1>ToDo List</h1>
  <input type="text" v-model="newToDoText" @keyup.enter="addNewToDo" placeholder="Add a new todo">
  <transition name='fade'>
  <ul>
    <transition-group name="list" tag="p">
      <li v-for="(todo, index) of todos" @remove="todos.splice(index, 1)" class="ToDoItem" :key="index">
        <span>{{ index + 1 }}.</span>
        <span>{{ todo.title }}</span>
        <a @click="remove(todo, index)" class="todoitem-btn">&times;</a>
      </li>
    </transition-group>
  </ul>
  </transition>
</div>
</template>

<script>
import Vue from 'vue'
import setting from '../settings/setting.js'

export default {
  name: 'ToDoList',
  data() {
    return {
      Url: setting.apiUrl + '/todos',
      newToDoText: '',
      todos: []
    }
  },
  created: function() {
    this.$http.get(this.Url).then(function(response) {
      if (response.data.status === 200) {
        this.todos = response.data.todos
      }
    })
  },
  methods: {
    addNewToDo: function() {
      this.$http.post(this.Url, {
        title: this.newToDoText
      }).then(function(response) {
        if (response.data.status === 200) {
          this.todos.push(response.data.todo)
          this.newToDoText = ''
        }
      })
    },
    remove: function(todo, index) {
      this.$http.delete(this.Url + '/' + todo.id).then(function(response) {
        if (response.data.status === 200) {
          this.todos.splice(index, 1)
          alert('delete success!')
        } else {
          alert('delete faild!')
        }
      })
    }
  }
}
</script>

<style lang="css">
  .ToDoList {
    width: 50%;
    margin-left: 25%;
    padding: 5rem 0;
    background-color: #8977b3;
    box-shadow: 5px 5px 5px grey;
    border-radius: 1rem;
    border: 1px solid #041a13;
  }

  input {
    margin: 0 5% 1rem 5%;
    padding: 0.5rem 0;
    padding-left: 5%;
    width: 85%;
    background-color: #f2f2f2;
    border-radius: 1rem;
    border: 0;
    font-size: 1.5rem;
  }

  input::-ms-input-placeholder{text-align: center;}
  input::-webkit-input-placeholder{text-align: center;}

  h1 {
    text-align: center;
  }

  ul {
    margin: 1rem 5% 0 5%;
    padding: 0;
    list-style-type: none;
    border: 3px dotted #d6d0ce;
  }


  .ToDoItem {
    margin: 1rem;
    font-size: 1.4rem;
    font-family: monospace;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateX(30px);
  }
  .todoitem-btn {
    float: right;
    font-size: 1.2rem;
    border: 0;
    background-color: #8977b3;
  }
</style>
