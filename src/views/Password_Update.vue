
<template>
<div>
	<v-card width="600" class="mx-auto mt-15" elevation="10">
		<v-card-title>
			<h1 class="display-1">Password Update</h1>
		</v-card-title>
		<v-card-text>
          <ValidationObserver ref="password_update" v-slot="{handleSubmit}">
			<v-form @submit.stop.prevent="handleSubmit(password_update)">
                <ValidationProvider v-slot="{ errors }" name="Email" :rules="{required: true, email}">
                  <v-text-field label="Email" type="email" :error-messages="errors" prepend-icon="mdi-gmail" v-model="email" readonly></v-text-field>
                </ValidationProvider>
                
                <ValidationProvider readonly v-slot="{ errors }" name="Current Password" :rules="{required: true}">
                  <v-text-field
                    @input="resetErrorsPassword"
						:type="showPassword ? 'text' : 'password'"
						label="Current Password"
                        v-model="CurrentPassword"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
                        :error-messages="errors['0'] ? errors['0'] : error['currentPassword']"
					/>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="Password" :rules="{required: true, min:8,  regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/}">
                    <v-text-field
						:type="showPassword1 ? 'text' : 'password'"
						label="New Password"
                        hint="Password should be of atleast 8 characters and requires atleast one : uppercase letter, lowercase letter, number, special character."
                        v-model="NewPassword"
						prepend-icon="mdi-lock"
						:append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword1 = !showPassword1"
                        :error-messages="errors"
					/>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="Confirm Password" rules="required|confirmed:Password">
                    <v-text-field
						:type="showPassword2 ? 'text' : 'password'"
						label="Confirm Password"
            hint="Password should be of atleast 8 characters and requires atleast one : uppercase letter, lowercase letter, number, special character."
                        v-model="ConfirmNewPassword"
						prepend-icon="mdi-lock"
						:append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword2 = !showPassword2"
                        :error-messages="errors"
					/>
                </ValidationProvider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn type="submit" color="info">
                        <v-progress-circular
                            v-if="loading"
                            :size="20"
                            :width="3"
                            color="white"
                            indeterminate
                        ></v-progress-circular>
                        <span v-if="loading">Updating</span>
                        <span v-else>Update</span>
                    </v-btn>
				</v-card-actions>
			</v-form>
          </ValidationObserver>
		</v-card-text>
		</v-card>

    <v-dialog 
        v-model="logoutModal"
        persistent
        max-width="500"
    >
    <v-card>
            <v-toolbar
              color="primary"
              dark
              class="text-h6"
            >Confirmation to Logout</v-toolbar>
            <v-card-text>
              <div class="text-h5 pa-12">Do you want to continue ?</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
              <v-btn
                color="primary"
                large
                @click="changeRoute"
              >Yes</v-btn>
              <v-btn
                color="error"
                large
                @click="logout"
              >No</v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
    
</div>
        

</template>

<script>
export default {
    name: 'Password_Update',
    data(){
        return{
            email: '',
            showPassword: false,
            showPassword1: false,
            showPassword2: false,
            CurrentPassword: '',
            NewPassword: '',
            ConfirmNewPassword: '',
            error: [],
            loading: false,
            logoutModal: false,
        }
    },
    created(){
      this.email = this.$store.state.user[0].email
    },
    methods: {
        resetErrorsPassword(){
            this.error['currentPassword'] = []
        },
        password_update(){
        this.loading = true
        this.error = ""
        this.$store.dispatch('password_update',{
          CurrentPassword: this.CurrentPassword,
          NewPassword: this.NewPassword,
          ConfirmNewPassword: this.ConfirmNewPassword
        })
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          console.log(response)
          if(response===true){
            this.logoutModal = true
            this.loading = false
            this.NewPassword=null
            this.CurrentPassword=null
            this.ConfirmNewPassword=null
            this.$refs.password_update.reset()
          }else{
            console.log(response.response.data[0])
            this.error = response.response.data[0]
            this.loading = false
            // this.NewPassword=null
            // this.CurrentPassword=null
            // this.ConfirmNewPassword=null
            this.$refs.password_update.reset()
          }
        })
      },
      changeRoute(){
        this.logoutModal = false
        this.$router.push({name: 'home'})
      },
      logout(){
        this.$store.dispatch('loggedOut')
        // eslint-disable-next-line no-unused-vars
        .then(response => {
                this.$router.push({name: 'home'})
            })
      },
    }
}
</script>

<style scoped>

</style>