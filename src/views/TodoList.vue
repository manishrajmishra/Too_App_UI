<template>
    <div>
        <!-- <v-dialog v-model="editTodoModal" max-width="700" persistent>
		<v-card>
          <v-toolbar
              color="primary"
              dark
              class="h6"
            >EDIT TODO</v-toolbar>
        <v-card-text>
          <ValidationObserver ref="password_update" v-slot="{handleSubmit}">
			<v-form @submit.stop.prevent="handleSubmit(updateTodo)">
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <ValidationProvider v-slot="{ errors }" name="Title" :rules="{required: true, min:5}">
                  <v-text-field label="Title*" type="text" :error-messages="errors" prepend-icon="mdi-book" v-model="title"></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <ValidationProvider name="Description" >
                  <v-text-field label="Description" type="text" prepend-icon="mdi-book-multiple" v-model="description"></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <ValidationProvider v-slot="{ errors }" name="Status" :rules="{required: true}">
                    <v-select
                        prepend-icon="mdi-calendar-multiple-check"
                        v-model="status"
                        :items="statues"
                        label="Status*"
                        :error-messages="errors"
                ></v-select>
                </ValidationProvider>
              </v-col>
            </v-row>

          <small>*indicates required field</small>

          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            type="submit"
          >
            Update Todo
          </v-btn>
          <v-btn
            color="error"
            type="button"
            @click="editTodoModal = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
        </v-form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
        </v-dialog> -->

      <ReusableDialog
          :modal="editTodoModal"
          titleName="Edit Todo"
          methodName="updateTodo"
          buttonName="Update"
          @closeModal="editTodoModal = false"
          :todo="todo"></ReusableDialog>

        <v-dialog 
            v-model="deleteTodoModal"
            persistent
            max-width="500"
        >
        <v-card>
                <v-toolbar
                  color="primary"
                  dark
                  class="text-h6"
                >Delete Todo</v-toolbar>
                <v-card-text>
                  <div class="text-h5 pa-12">Are you sure you want to delete this Todo ?</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-end">
                  <v-btn
                    color="error"
                    large
                    @click="deleteTodo(id)"
                  >Yes</v-btn>
                  <v-btn
                    color="primary"
                    large
                    @click="deleteTodoModal = false"
                  >No</v-btn>
                </v-card-actions>
              </v-card>
        </v-dialog>

    <v-container fluid style="max-width: 100%">
                <v-row >
                <v-col  cols="12" md="6" sm="12">
                    <v-card elevation="10" class="p-1">
                    <v-card-title>
                        <h3 style="text-align: center" class="mx-auto">
                        Pending Todos
                        </h3>
                    </v-card-title>
                    <hr/>
                    <v-row>
                      <v-col cols="12" sm="6" md="6"  v-for="todo in pendingTodos" :key="todo.id" >
                    <draggable
                        class="col-12"
                        :list="pendingTodos"
                        group="todoapp"
                        animation="400"
                        @add="onAdd($event, 'pending')"
                    >
                        <v-card :data-id="todo.id" color="secondary" style="position: relative" elevation="10"  class="cards mt-2 text-white">
                            <div style="text-align: center">
                            <strong>Title:</strong> {{todo.title}}
                            <div style="position: absolute; top: 8px; left: 8px; ">
                            <b-iconstack title="Edit Todo" @click="showEditModal(todo)" font-scale="1.2">
                                <b-icon stacked icon="square"></b-icon>
                                <b-icon stacked icon="pencil-square"></b-icon>
                            </b-iconstack>
                            
                            <b-iconstack title="Delete Todo" variant="danger" class="ml-2" v-if="todo.status === 'completed'" @click="removeTodo(todo)" font-scale="1.2">
                                <b-icon stacked class="d-none" icon="square"></b-icon>
                                <b-icon stacked icon="trash"></b-icon>
                            </b-iconstack>

                            </div>
                            </div>
                            <div style="text-align: center">
                            <strong>Description:</strong> {{todo.description}}
                            </div>
                            <div style="text-align: center">
                            <strong>Status:</strong> {{todo.status}}
                            </div>
                            <div style="text-align: center">
                            <strong>Created On:</strong> {{todo.created_at | date}}
                            </div>
                            <div style="text-align: center">
                            <strong>Updated On:</strong> {{todo.updated_at | date}}
                            </div>
                        </v-card>
                    </draggable>
                      </v-col>
                    </v-row>
                    </v-card>
                </v-col>

                <v-col  cols="12" md="6" sm="12">
                    <v-card elevation="10" class="p-1">
                    <v-card-title>
                        <h3 style="text-align: center" class="mx-auto">
                        Completed Todos
                        </h3>
                    </v-card-title>
                    <hr/>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" v-for="todo in completedTodos" :key="todo.id">
                    <draggable
                        class="col-12"
                        :list="completedTodos"
                        group="todoapp"
                        animation="400"
                        @add="onAdd($event, 'completed')"
                        > 
                        <v-card :data-id="todo.id" color="success" style="position: relative" elevation="10" class="cards mt-2 text-white">
                            <div style="text-align: center">
                            <strong>Title:</strong> {{todo.title}}
                            <div style="position: absolute; top: 8px; left: 8px; ">
                            <b-iconstack title="Edit Todo" @click="showEditModal(todo)" font-scale="1.2">
                                <b-icon stacked icon="square"></b-icon>
                                <b-icon stacked icon="pencil-square"></b-icon>
                            </b-iconstack>
                            </div>
                            <div style="position: absolute; top: 15px; right: 8px; ">
                            <b-iconstack title="Delete Todo" variant="danger" class="ml-2" v-if="todo.status === 'completed'" @click="removeTodo(todo)" font-scale="1.2">
                                <b-icon stacked class="d-none" icon="square"></b-icon>
                                <b-icon stacked icon="trash"></b-icon>
                            </b-iconstack>

                            </div>
                            </div>
                            <div style="text-align: center">
                            <strong>Description:</strong> {{todo.description}}
                            </div>
                            <div style="text-align: center">
                            <strong>Status:</strong> {{todo.status}}
                            </div>
                            <div style="text-align: center">
                            <strong>Created On:</strong> {{todo.created_at | date}}
                            </div>
                            <div style="text-align: center">
                            <strong>Updated On:</strong> {{todo.updated_at | date}}
                            </div>
                        </v-card>
                    </draggable>
                    </v-col>
                    </v-row>
                    </v-card>
                </v-col>
                
                </v-row>
    </v-container>

    </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import draggable from 'vuedraggable'
import ReusableDialog from '@/components/ReusableDialog'
export default {
  name: 'todo-list',
  data() {
    return {
      todo:{
        id: "",
        title: "",
        status: "",
        description: "",
      },
      show: false,
      addTodoModal: false,
      editTodoModal: false,
      statues: [
        { text: 'Please Select Statues', value: '', disabled: true, selected: true },
        { text: 'Pending', value: "pending"},
        { text: 'Completed', value: 'completed'}
      ],
      title: '',
      description: '',
      status: '',
      id: '',
      deleteTodoModal: false,
      created_at: '',
      updated_at: ''
    }
  },
  components : {
    ReusableDialog,
    draggable,
  },
  created() {
    if(this.$store.state.todos.length === 0 ){
      this.show = true
      this.$store.dispatch('retrieveTodos')
      .then(response => {
        if(response){
          const notification = {
            type:'success',
            message: response.data.message
          }
        setTimeout(() => {
          this.show = false
        },1200)
          this.$store.dispatch('add',notification)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['pendingTodos', 'completedTodos'])
  },
  methods: {
    onAdd(event, status) {
      console.log(event)
      let id = event.item.getAttribute('data-id');
      let todo = this.$store.state.todos.find((todo) => todo.id == id)
      console.log(todo)
      console.log(id)
      axios.put('/Todo/' + id, {
        title: todo.title,
        description: todo.description,
        status: status
      }).then((response) => {
        console.log(response.data);
        let index = this.$store.state.todos.indexOf(todo);
        this.$store.state.todos.splice(index, 1);
        this.$store.state.todos.push(response.data.todo);
        setTimeout(() => {
          this.show = false
        },250)
      }).catch((error) => {
        console.log(error);
      })
    },
    removeTodo(todo){
      this.deleteTodoModal = true
      this.id = todo.id
    },
    deleteTodo(id_delete){
      console.log(id_delete)
      this.$store.dispatch('deleteTodo', id_delete)
        this.deleteTodoModal = false
    },
    showEditModal(todo1){
      this.editTodoModal = true
      this.todo.title = todo1.title
      this.todo.description = todo1.description
      this.todo.status = todo1.status
      this.todo.id = todo1.id
    },
  }
}
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
.b-icon:hover{
  color: black;
}
.cards:hover{
  transform: scale(1.01);
}
.container{
  transition-delay: 2s;
}
</style>