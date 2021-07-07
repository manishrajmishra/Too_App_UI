<template>
    <v-dialog v-model="modalShow" max-width="700" persistent>
		<v-card>
          <v-toolbar
              color="primary"
              dark
              class="h6"
            >{{titleName}}</v-toolbar>
        <v-card-text>
          <ValidationObserver ref="addTodo" v-slot="{handleSubmit}">
			<v-form @submit.stop.prevent="handleSubmit(checkMethod)">
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <ValidationProvider v-slot="{ errors }" name="Title" :rules="{required: true, min:5}">
                  <v-text-field label="Title*" type="text" :error-messages="errors" prepend-icon="mdi-book" v-model="todo.title"></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <ValidationProvider name="Description" >
                  <v-text-field label="Description" type="text" prepend-icon="mdi-book-multiple" v-model="todo.description"></v-text-field>
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
                        v-model="todo.status"
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
            {{buttonName}}
          </v-btn>
          <v-btn
            color="error"
            type="button"
            @click="resetTodo"
          >
            Cancel
          </v-btn>
        </v-card-actions>
        </v-form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  data(){
    return{
    statues: [
        { text: 'Please Select Statues', value: '', disabled: true },
        { text: 'Pending', value: "pending"},
        { text: 'Completed', value: 'completed'}
    ],
    modalShow: false,
    }
  },
  props: {
    modal: {
      type: Boolean,
      required: true,
    },
    titleName: {
      type: String,
      required: true,
    },
    methodName: {
      type: String,
      required: true,
    },
    buttonName: {
      type: String,
      required: true,
    },
    todo: {
      type: Object,
      default: () => {
        return {
          title: "",
          description: "",
          status: "",
        };
      }
    }
  },
  watch: {
    modal(new1) {
      this.modalShow = new1;
    },
  },
  methods: {
      routesCheck(){
      if(this.$route.name === 'todo'){
        this.modalShow = true
      }else{
        this.$router.push('todo');
        this.modalShow = true
      }
    },
      checkMethod() {
      if (this.methodName === "addTodo") {
        this.addTodo();
      }
      if (this.methodName === "updateTodo") {
        this.updateTodo();
      }
    },
    addTodo() {
      this.$store.dispatch('addTodo', {
        title: this.todo.title,
        description: this.todo.description,
        status: this.todo.status
      })
      .then(() => {
        this.modalShow = false
        this.resetTodo();
      })
    },
    resetTodo(){
      this.todo.title = ''
      this.todo.description = ''
      this.todo.status = ''
      this.modalShow = false
      this.$refs.addTodo.reset()
      this.$emit("closeModal", false);
    },
    updateTodo(){
      this.$store.dispatch('updateTodo', {
        'id': this.todo.id,
        'title': this.todo.title,
        'description': this.todo.description,
        'status': this.todo.status,
      })
      .then(response => {
        console.log(response)
        if(response){
          console.log(response)
          this.modalShow = false
          this.$emit("closeModal", false);
          let todo = this.$store.state.todos.find((todo) => todo.id == this.todo.id)
          let index = this.$store.state.todos.indexOf(todo);
          this.$store.state.todos.splice(index, 1);
          this.$store.state.todos.push(response.data.todo);
        }
      })
    },
  }
}
</script>
