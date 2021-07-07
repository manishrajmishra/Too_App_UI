
<template>
	<v-card width="600" class="mx-auto mt-15" elevation="10">
		<v-card-title>
			<h1 class="display-1">Login</h1>
		</v-card-title>
		<v-card-text>
          <ValidationObserver ref="loginForm" v-slot="{handleSubmit}">
			<v-form @submit.stop.prevent="handleSubmit(login)">
                <ValidationProvider v-slot="{ errors }" name="Email" :rules="{required: true, email: true}">
                  <v-text-field label="Email" type="email" :error-messages="errors" prepend-icon="mdi-gmail" v-model="email"></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Password" :rules="{required: true}">
                  <v-text-field
						:type="showPassword ? 'text' : 'password'"
						label="Password"
                        v-model="password"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
                        :error-messages="errors"
					/>
                </ValidationProvider>
				<v-card-actions>
          <v-btn type="submit" color="info">
                        <v-progress-circular
                            v-if="loading"
                            :size="20"
                            :width="3"
                            color="white"
                            indeterminate
                        ></v-progress-circular>
                        <span v-if="loading">Authenticating</span>
                        <span v-else>Login</span>
                    </v-btn>
                    <v-spacer></v-spacer>
					<v-btn color="success" :to="{name: 'register'}">Register</v-btn>
				</v-card-actions>
			</v-form>
          </ValidationObserver>
		</v-card-text>
		</v-card>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data(){
        return{
            email: '',
            password: '',
            showPassword: false,
            loading: false,
            errors: ''
        }
    },
    created() {
      console.log(this.$router.currentRoute.query.token)
      console.log(this.$route.params.token)
      if(this.$router.currentRoute.query.token !== undefined){
        let formdata = new FormData();
        formdata.append('verificationToken', this.$router.currentRoute.query.token);
        axios.defaults.headers.common['Authorization'] = "";
        axios.post('/User/VerifyEmail', formdata)
        .then(response => {
          const notification = {
            type:'success',
            message: response.data.message
          }
          this.$store.dispatch('add',notification)
        })
        .catch(error => {
          const notification = {
            type:'danger',
            message: error.response.data.message
          }
          this.$store.dispatch('add',notification)
        })
      }
    },
    methods: {
        login(){
            this.loading = true
            this.errors = ""
            this.$store.dispatch('retreieveToken', {
                email: this.email,
                password: this.password
            })
            // eslint-disable-next-line no-unused-vars
            .then(response => {
              //console.log(response.data.message)
              //console.log(response.response.data.message)
              if(response){
                console.log("hello")
                 const notification = {
                  type:'success',
                  message: response.data.message
                }
                this.$store.dispatch('add',notification)
                this.$router.push({ name: 'todo' })
              }else{
                this.errors = response.response.data
              }
              this.loading = false
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
              console.log(error)
              this.loading = false
            })
        }
    }
}
</script>

<style scoped>

</style>