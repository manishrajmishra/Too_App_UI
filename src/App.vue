<template>
  <v-app>
    <v-app-bar app color="primary" dark>
			<v-toolbar-title><v-icon class="mr-2">{{ "mdi-star-plus-outline" }}</v-icon>Todo App</v-toolbar-title>
			<v-tab>
				<v-btn v-if="loggedIn" class="ml-15 d-none d-md-flex" plain to="/"><v-icon class="mr-2">{{ "mdi-home" }}</v-icon>Home</v-btn>
				<v-btn v-if="!loggedIn" class="ml-2 d-none d-md-flex" plain to="/"><v-icon class="mr-2">{{ "mdi-home" }}</v-icon>Home</v-btn>
        <v-btn class="ml-2 d-none d-md-flex" v-if="loggedIn" plain :to="{name: 'todo'}"><v-icon class="mr-2">{{"mdi-calendar"}}</v-icon>Todos</v-btn>
        <v-btn class="ml-2" v-if="loggedIn" plain @click="routesCheck"><v-icon class="mr-2">{{"mdi-message-plus-outline"}}</v-icon>Add Todo</v-btn>
			</v-tab>
			<v-spacer></v-spacer>
			
			<v-menu
					v-if="loggedIn"
					bottom
					transition="scale-transition"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
              plain
              class="d-none d-md-flex"
              style="left: 100px"
							dark
							v-bind="attrs"
							v-on="on"
						>
						<v-list-item-avatar>
						<img
							v-if="profilePicture===null"
							:src="require('@/assets/logo.png')"
						>
						<img
							v-else :src="`https://localhost:44360/${profilePicture}`" alt="Image"
						>
						</v-list-item-avatar>
							Hello {{username}}
						</v-btn>
					</template>
					

					<v-list>
						<v-list-item
							v-for="link in links"
							:key="`${link.label}-header-link`"
							text
							rounded
							:to="link.url"
						>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
						<v-list-item-title>{{ link.label }}</v-list-item-title>
					</v-list-item>
					</v-list>
				</v-menu>
			<v-tab>
				<v-btn class="d-none d-md-flex" v-if="!loggedIn" plain :to="{name: 'register'}"><v-icon class="mr-2">{{"mdi-border-color"}}</v-icon> Register</v-btn>
				<v-btn class="d-none d-md-flex" v-if="!loggedIn" plain :to="{name: 'login'}"><v-icon class="mr-2">{{"mdi-key"}}</v-icon> Login</v-btn>
			</v-tab>
      <v-app-bar-nav-icon class="d-flex d-md-none" @click="drawer = true" ></v-app-bar-nav-icon>
      <!-- Add this class to show menu icon only on small screen -->
    </v-app-bar>

    <v-navigation-drawer
      class="d-flex"
      v-model="drawer"
      app color="primary" dark
      width="350"
      right
      temporary
      v-if="loggedIn"
    >
      <v-list-item class="mt-4">
        <v-list-item-avatar class="ml-15">
          <img
							v-if="profilePicture===null"
							:src="require('@/assets/logo.png')"
						>
						<img
							v-else :src="`https://localhost:44360/${profilePicture}`" alt="Image"
						>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Hello {{username}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense class="ml-10">
        <v-list-item
							v-for="link in navigationLinks"
							:key="`${link.label}-header-link`"
							:to="link.url"
						>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
						<v-list-item-title>{{ link.label }}</v-list-item-title>
            </v-list-item-content>
					</v-list-item>
      </v-list>
      
      <v-footer style="top: 355px" color="primary" padless dark>
			<v-layout justify-center wrap>
				<v-flex primary py-4 text-center white--text xs12>
				<strong>Todo App</strong> - {{ new Date().getFullYear() }}
				</v-flex>
			</v-layout>
      <v-switch class="mt-5 mr-5" @click="toggleTheme" :append-icon="showIcon ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-switch>
		</v-footer>

    </v-navigation-drawer>

    <v-navigation-drawer
      class="d-flex"
      v-model="drawer"
      app color="primary" dark
      width="350"
      right
      temporary
      v-if="!loggedIn"
    >

    <v-list-item class="mt-4">
        <v-list-item-avatar class="ml-15">
          <img
							:src="require('@/assets/logo.png')"
						>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Welcome, User</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense class="ml-10">
        <v-list-item
							v-for="link in navigationLinksLogout"
							:key="`${link.label}-header-link`"
							:to="link.url"
						>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
						<v-list-item-title>{{ link.label }}</v-list-item-title>
            </v-list-item-content>
					</v-list-item>
      </v-list>
      
      <v-footer style="top: 430px" color="primary" padless dark>
			<v-layout justify-center wrap>
				<v-flex primary py-4 text-center white--text xs12>
				<strong>Todo App</strong> -	{{ new Date().getFullYear() }}
				</v-flex>
			</v-layout>
      <v-switch class="mt-5 mr-5" @click="toggleTheme" :append-icon="showIcon ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-switch>
		</v-footer>

    </v-navigation-drawer>

		<!-- <v-dialog v-model="openingTodo" max-width="700" persistent>
		<v-card>
          <v-toolbar
              color="primary"
              dark
              class="h6"
            >ADD TODO</v-toolbar>
        <v-card-text>
          <ValidationObserver ref="addTodo" v-slot="{handleSubmit}">
			<v-form @submit.stop.prevent="handleSubmit(addTodo)">
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
            Add Todo
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
    </v-dialog> -->

    <ResuableDialog
        :modal="openingTodo"
        titleName="Add Todo"
        methodName="addTodo"
        @closeModal="openingTodo = false"
        buttonName="Add"
        ></ResuableDialog>

		<notification-container/>

    <v-main>
      <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
		<router-view></router-view>
      </transition>
    </v-main>


    <v-footer color="primary" padless dark>
			<v-layout justify-center wrap>
				<v-flex primary py-4 text-center white--text xs12>
				<strong>	{{ new Date().getFullYear() }} — Todo App</strong>
				</v-flex>
			</v-layout>
      <v-switch color="white" class="mt-5 mr-5" @click="toggleTheme" :append-icon="showIcon ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-switch>
		</v-footer>
    

  </v-app>
</template>

<script>
import NotificationContainer from '@/components/NotificationContainer'
import ResuableDialog from "@/components/ReusableDialog"
export default {
	name: 'App',
	components: {
      NotificationContainer,
      ResuableDialog
    },
	data() {
		return {
      drawer: false,
			showIcon: false,
			openingTodo: false,
      title: '',
      description: '',
      status: '',
      statues: [
        { text: 'Please Select Statues', value: '', disabled: true },
        { text: 'Pending', value: "pending"},
        { text: 'Completed', value: 'completed'}
      ],
			links: [
				{
        icon: 'mdi-account',
				label: 'Profile',
				url: '/profile'
				},
				{
        icon: 'mdi-calculator',
				label: 'Change Password',
				url: '/password-update'
				},
				{
        icon: 'mdi-lock',
				label: 'Logout',
				url: '/logout'
				},
			],
      navigationLinks: [
        {
        icon: 'mdi-home',
				label: 'Home',
				url: '/'
				},
        {
        icon: 'mdi-calendar',
				label: 'Todos',
				url: '/todo'
				},
				{
        icon: 'mdi-account',
				label: 'Profile',
				url: '/profile'
				},
				{
        icon: 'mdi-calculator',
				label: 'Change Password',
				url: '/password-update'
				},
				{
        icon: 'mdi-lock',
				label: 'Logout',
				url: '/logout'
				},
			],
      navigationLinksLogout: [
        {
        icon: 'mdi-home',
				label: 'Home',
				url: '/'
				},
        {
        icon: 'mdi-border-color',
				label: 'Register',
				url: '/register'
				},
        {
        icon: 'mdi-key',
				label: 'Login',
				url: '/login'
				},
      ]
		}
	},
  watch: {
      group () {
        this.drawer = false
      },
  },
	computed: {
		loggedIn() {
		return this.$store.getters.loggedIn
		},
		username(){
		return this.$store.state.user[0].name
		},
		profilePicture(){
			return this.$store.state.user[0].profilePicture
		}
    },
	methods: {
    routesCheck(){
      if(this.$route.name === 'todo'){
        this.openingTodo = true
      }else{
        this.$router.push('todo');
        this.openingTodo = true
      }
    },
		toggleTheme(){
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark
			this.showIcon = !this.showIcon
		},
    addTodo() {
      this.$store.dispatch('addTodo', {
        title: this.title,
        description: this.description,
        status: this.status
      })
      .then(() => {
        this.openingTodo = false
        this.resetTodo();
      })
    },
    resetTodo(){
      this.title = ''
      this.description = ''
      this.status = ''
      this.openingTodo = false
      this.$refs.addTodo.reset()
    },
	}
}
</script>
