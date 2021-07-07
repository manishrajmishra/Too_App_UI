<template>
<v-card width="600" class="mx-auto mt-15" elevation="10">
        <v-card-title>
			<h1 class="display-1">Register</h1>
		</v-card-title>
		<v-card-text>
          <ValidationObserver ref="registerForm" v-slot="{handleSubmit}">
			<v-form @submit.stop.prevent="handleSubmit(register)">
                <ValidationProvider v-slot="{ errors }" name="Username" :rules="{required: true, min:5}">
                  <v-text-field label="Username" @input="resetErrorsUsername" type="text" :error-messages="errors['0'] ? errors['0'] : error['userName']" prepend-icon="mdi-account-circle" v-model="UserName"></v-text-field>
                </ValidationProvider>
<!-- {{error.userName}} -->
                <ValidationProvider v-slot="{ errors }" name="Name" :rules="{required: true, min:5}">
                  <v-text-field label="Name" type="text" :error-messages="errors" prepend-icon="mdi-account-circle" v-model="Name"></v-text-field>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="Email" :rules="{required: true, email: true}">
                  <v-text-field label="Email" @input="resetErrorsEmail" type="email" :error-messages="errors['0'] ? errors['0'] : error['email']" prepend-icon="mdi-gmail" v-model="Email"></v-text-field>
                </ValidationProvider>
<!-- {{error.email}} -->
                <ValidationProvider v-slot="{ errors }" name="Password" :rules="{required: true, min:8,  regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/}">
                    <v-text-field
						:type="showPassword ? 'text' : 'password'"
						label="Password"
                        hint="Password should be of atleast 8 characters and requires atleast one : uppercase letter, lowercase letter, number, special character."
                        v-model="Password"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
                        :error-messages="errors"
					/>
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="Confirm Password" rules="required|confirmed:Password">
                    <v-text-field
                        :type="showPassword1 ? 'text' : 'password'"
						label="Confirm Password"
                        hint="Password should be of atleast 8 characters and requires atleast one : uppercase letter, lowercase letter, number, special character."
                        v-model="Confirm_Password"
						prepend-icon="mdi-lock"
						:append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword1 = !showPassword1"
                        :error-messages="errors"
					/>
                </ValidationProvider>
				<v-card-actions>
                     <v-btn color="success"  type="submit">
                        <v-progress-circular
                            v-if="loading"
                            :size="20"
                            :width="3"
                            color="white"
                            indeterminate
                        ></v-progress-circular>
                        <span v-if="loading">Registering</span>
                        <span v-else>Register</span>
                    </v-btn>
                    <v-spacer></v-spacer>
					<v-btn color="info" :to="{name: 'login'}">Login</v-btn>
				</v-card-actions>
			</v-form>
          </ValidationObserver>
		</v-card-text>
</v-card>
</template>

<script>
export default {
    name: 'Register',
    data: () => ({
        Name: '',
        Email: '',
        UserName: '',
        Password: '',
        Confirm_Password: '',
        showPassword: false,
        showPassword1: false,
        loading: false,
        error: []
    }),
    methods: {
        resetErrorsUsername(){
          this.error['userName'] = []
        },
        resetErrorsEmail(){
            this.error['email'] = []
        },
        register(){
            this.loading = true
            this.error = ""
            this.$store.dispatch('register',{
            Name: this.Name,
            Email: this.Email,
            UserName: this.UserName,
            Password: this.Password,
            Confirm_Password: this.Confirm_Password,
        })
        // eslint-disable-next-line no-unused-vars
        .then(response => {
            if(response===true){
                this.$router.push({ name: 'login' })
            }else{
                this.error = response.response.data[0]
                console.log(this.error)
            }
            this.loading = false
        })
        .catch(error => {
            this.loading = false
            console.log(error.response.data)
        })
      }
    }
}
</script>