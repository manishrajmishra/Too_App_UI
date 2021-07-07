import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'https://localhost:44360/api'
let nextId = 1;
export const store = new Vuex.Store({
  state: {
    // token: null,
    filter: 'all',
    todos: [],
    user:null,
    notifications: [],
    responseMessage: []
  },
  getters: {
    loggedIn(state){
      return state.user != null
    },
    pendingTodos(state){
      return state.todos.filter(todo => todo.status==='pending')
    },
    completedTodos(state){
      return state.todos.filter(todo => todo.status==='completed')
    },
  },
  mutations: {
    CHANGE_STATUS(state, getTodo){
      console.log(getTodo)
      const index = state.todos.findIndex((todo) => todo.id == getTodo.id)
      state.todos[index] = getTodo
      let tempTodos = state.todos
      state.todos = tempTodos
    },
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: nextId++
      });
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      );
    },
    addTodo(state, todo) {
      state.todos.unshift(todo)
    },
    deleteTodo(state, id) {
      console.log(id)
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => todo.completed==='pending')
    },
    retrieveTodos(state, todos){
      state.todos = todos
    },
    // retreieveToken(state, token){
    //   state.token = token
    // },
    loggedOut(state){
      state.user = null
    },
    clearTodos(state) {
      state.todos = []
    },
    SET_USER(state,user){
      state.user = user
    }
  },
  actions: {
    add({ commit }, notification) {
      commit("PUSH", notification);
    },
    remove({ commit }, notificationToRemove) {
      commit("DELETE", notificationToRemove);
    },
    retrieveUser(context, token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    
      return axios.get('/Authentication/detail')
          .then(response => {
            console.log(response.data.user_details[0])
            context.commit('SET_USER',response.data.user_details)
            return response
          })
          .catch(error => {
           console.log(error)
           return error
          })
    },
    clearTodos(context){
      context.commit('clearTodos')
    },
    register(context, data){
      axios.defaults.headers.common['Authorization'] = "";
      return axios.post('/User/registration', {
          Name: data.Name,
          Email: data.Email,
          UserName: data.UserName,
          Password: data.Password,
          Confirm_Password: data.Confirm_Password
        })
        .then(response => {
          console.log(response)
          const notification = {
            type:'success',
            message: response.data.message
          }
          context.dispatch('add',notification)
          return true
        })
        .catch(error => {
          console.log(error.response)
            const notification = {
              type:'error',
              message: "Unprocessiable Entity"
            }
            console.log(notification);
            context.dispatch('add',notification)
            return error
      })
    },
    password_update(context, data){
      // axios.defaults.headers.common['Authorization'] = 'Bearer' + context.state.token
      return axios.post('/Authentication/password-update', {
          CurrentPassword: data.CurrentPassword,
          NewPassword: data.NewPassword,
          ConfirmNewPassword: data.ConfirmNewPassword
        })
        .then(response => {
          console.log(response)
          const notification = {
            type:'success',
            message: response.data.message
          }
          context.dispatch('add',notification)
          return true
        })
        .catch((error) => {
          console.log(error.response.data[0].status)
          const notification = {
            type:'error',
            message: error.response.data[0].status
          }
          context.dispatch('add',notification)
          return error
        })
    },
    profile_update(context, data){
      // axios.defaults.headers.common['Authorization'] = 'Bearer' + context.state.token
      return axios.post('/Authentication/update',data)
        .then(response => {
          console.log(response)
          context.commit('SET_USER',response.data.user_details)
          const notification = {
            type:'success',
            message: response.data.message
          }
          context.dispatch('add',notification)
          return true
        })
        .catch(error => {
          const notification = {
            type:'error',
            message: error.response.data[0].status
          }
          context.dispatch('add',notification)
          console.log(error)
          return error
        })
    },
    loggedOut(context){
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            localStorage.setItem('token', '')
            context.commit('loggedOut')
            // const notification = {
            //    type:'success',
            //    message: 'LoggedOut Successfully'
            // }
            // context.dispatch('add',notification)
            resolve()
        })
    },
    retreieveToken(context, credentials){
      axios.defaults.headers = {
        'Content-Type': 'application/json; ', 
        common: {
          'Authorization' : ""
        }
      }
      //axios.defaults.headers.common['Authorization'] = "";
      return axios.post('/User/login', {
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          console.log(response)
          if(response.data.message === "Account is not Verified"){
            console.log("ahabsd");
            const notification = {
             type:'error',
             message: response.response.data.message
             }
             this.$store.dispatch('add',notification)
             return false
          }else{
            console.log("qw");
            console.log(response);
            localStorage.setItem('token', response.data.token)
            //context.commit('retreieveToken', token)
            return context.dispatch('retrieveUser', response.data.token);
          }
          
          //console.log(response);
        })
        .catch(error => {
          console.log(error.response)
          const notification = {
            type:'error',
            message: error.response.data.message
          }
          context.dispatch('add',notification)
          return error
        })
    },
    retrieveTodos(context){
      // axios.defaults.headers.common['Authorization'] = 'Bearer' + context.state.token
      return axios.get('/Todo')
        .then(response => {
          console.log(response.data)
          context.commit('retrieveTodos', response.data.todos)
          return response
        })
        .catch(error => {
          const notification = {
            type:'error',
            message: error.response.data[0].status
          }
          context.dispatch('add',notification)
          console.log(error)
        })
    },
    addTodo(context, todo) {
      return axios.post('/Todo', {
        title: todo.title,
        description: todo.description,
        status: todo.status
      })
        .then(response => {
          console.log(response)
          context.commit('addTodo', response.data.todo)
          const notification = {
            type:'success',
            message: response.data.message
          }
          context.dispatch('add',notification)
          return true
        })
        .catch(error => {
          const notification = {
            type:'error',
            message: error.response.data[0].status
          }
          context.dispatch('add',notification)
          console.log(error)
          return error
        })
    },
    updateTodo(context, todo) {
      console.log(todo.id)
      return axios.put('/Todo/' + todo.id, {
        title: todo.title,
        description: todo.description,
        status: todo.status
      })
      .then(response => {
        console.log(response)
        // context.commit('updateTodo', response.data.todo)
        const notification = {
          type:'success',
          message: response.data.message
        }
        // context.dispatch('retrieveTodos')
        context.dispatch('add',notification)
        return response
      })
      .catch(error => {
        console.log(error)
        const notification = {
          type:'error',
          message: error.response.data[0].status
        }
        context.dispatch('add',notification)
      })
    },
    deleteTodo(context, id) {
      context.commit('deleteTodo', id)
      axios.delete('/Todo/' + id)
        .then(response => {
          console.log(response.data.todo)
          //context.commit('deleteTodo', response.data.todo)
          // context.dispatch("retrieveTodos")
          const notification = {
            type:'success',
            message: response.data.message
          }
          context.dispatch('add',notification)
        })
        .catch(error => {
          console.log(error);
          const notification = {
            type:'error',
            message: error.response.data[0].status
          }
          context.dispatch('add',notification)
        })
    },
    updateFilter(context, filter) {
        context.commit('updateFilter', filter)
    },
    CHANGE_STATUS({commit}, getTodo){
      console.log(getTodo)
      // const index = state.todos.findIndex((todo) => todo.id == getTodo.id)
      // state.todos[index] = getTodo
      commit('CHANGE_STATUS', getTodo)
    },
  }
})