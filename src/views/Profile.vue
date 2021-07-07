<template>
<div>
<v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step
        :complete="step > 1"
        step="1"
      >
        User' Profile
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="step > 2"
        step="2"
      >
        User's Genral Details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="step > 3"
        step="3"
      >
        User's Address
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">
        About
      </v-stepper-step>
    </v-stepper-header>
    </v-stepper>
<v-card width="1000" class="mx-auto mt-15 mb-5" elevation="10">
    <v-card-title v-if="step == 1">
			<h1 class="display-1">User's Profile</h1>
		</v-card-title>
    <v-card-title v-if="step == 2">
      <h1 class="display-1">User's Genral Details</h1>
    </v-card-title>
    <v-card-title v-if="step == 3">
			<h1 class="display-1">User's Address</h1>
		</v-card-title>
    <v-card-title v-if="step == 4">
			<h1 class="display-1">About</h1>
		</v-card-title>
        <v-card-text>
            <ValidationObserver ref="password_update" v-slot="{handleSubmit}">
			<v-form @submit.stop.prevent="handleSubmit(profile_update)">
            <div v-if="step === 1" class="d-flex col-12 justify-content-center">
              <div @click="handler" class="mb-5 picture"> 
                <div class="overlay"><v-icon style="margin-left: 5.6rem; margin-top: 10rem;" color="red darken-2">mdi-camera</v-icon></div>
                
                  <b-img style=" border-radius: 50%;" width="200" height="200" v-if="profilePicture===null && !uploaded" :src="require('@/assets/logo.png')"/>
                  <b-img style=" border-radius: 50%;" width="200" height="200" v-else-if="uploaded" :src="avatar" alt="Image"/>
                  <b-img style=" border-radius: 50%;" width="200" height="200" v-else :src="`https://localhost:44360/${profilePicture}`" alt="Image"/>
               
               <div>
                 <input
                       ref="imageOpen"
                       class="d-none"
                       type="file"
                       @change="GetImage"
                       accept="image/*"
                     />
                </div> 
              </div>
            </div>

            <v-row>
                <v-col
                    v-if="step === 1"
                    cols="12"
                    sm="6"
                    md="6"
                >
                <ValidationProvider v-slot="{ errors }" name="UserName" :rules="{required: true}">
                    <v-text-field :disabled="loading" label="UserName" type="text" :error-messages="errors" prepend-icon="mdi-account-circle" v-model="userName" readonly></v-text-field>
                </ValidationProvider>
                </v-col>
                
                <v-col
                    v-if="step === 1"
                    cols="12"
                    sm="6"
                    md="6"
                >
                <ValidationProvider v-slot="{ errors }" name="Email" :rules="{required: true}">
                    <v-text-field :disabled="loading" label="Email" type="email" :error-messages="errors" prepend-icon="mdi-gmail" v-model="email" readonly></v-text-field>
                </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 1"
                    cols="12"
                    sm="6"
                    md="6"
                >
                <ValidationProvider v-slot="{ errors }" name="Name" :rules="{required: true, min:5}">
                  <v-text-field :disabled="loading" label="Name" type="text" :error-messages="errors" prepend-icon="mdi-account" v-model="name"></v-text-field>
                </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 1"
                    cols="12"
                    sm="6"
                    md="6"
                >
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="dob"
                    persistent
                    width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <ValidationProvider v-slot="{ errors }" name="Date of Birth" :rules="{required: true}">
                    <v-text-field
                        :disabled="loading"
                        v-model="dob"
                        label="Date of Birth"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="errors"
                    ></v-text-field>
                    </ValidationProvider>
                    </template>
                    <v-date-picker
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1900-01-01"
                    v-model="dob"
                    scrollable
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="modal = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(dob)"
                    >
                        OK
                    </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>

                <v-col
                    v-if="step === 2"
                    cols="12"
                    sm="6"
                    md="6"
                >
                <ValidationProvider v-slot="{ errors }" name="Gender" :rules="{required: true}">
                <v-radio-group :disabled="loading" label="Gender" :error-messages="errors" v-model="gender" row prepend-icon="mdi-human-male-female">
                <v-radio
                    label="Male"
                    value="m"
                ></v-radio>
                <v-radio
                    label="Female"
                    value="f"
                ></v-radio>
                <v-radio
                    label="Other"
                    value="o"
                ></v-radio>
                </v-radio-group>
                </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 2"
                    cols="12"
                    sm="6"
                    md="6"
                >
                 <ValidationProvider v-slot="{ errors }" name="Mobile Number" :rules="{required: true, numeric: true}">
                 <v-text-field :disabled="loading" label="Mobile Number" type="text" :error-messages="errors" prepend-icon="mdi-phone" v-model="phoneNumber"></v-text-field>
                 </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 2"
                    cols="12"
                    sm="6"
                    md="6"
                >
                 <ValidationProvider
                        v-slot="{ errors }"
                        name="Hobbies"
                        :rules="{
                          required: hobbies.length === 0 ? true : false,
                        }"
                      >
                        <span :class="hobbies.length === 0 ? 'error-12' : ''">Hobbies</span>
                        <v-layout wrap>
                          <v-checkbox
                            v-for="hobbie in myhobbies"
                            :key="hobbie.text"
                            v-model="hobbies"
                            :label="hobbie.text"
                            :value="hobbie.value"
                            hide-details
                            class="ml-2 mt-0"
                            :error-messages="errors"
                          ></v-checkbox>
                        </v-layout>
                      </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 2"
                    cols="12"
                    sm="6"
                    md="6"
                >
                <ValidationProvider v-slot="{ errors }" name="Blood Group" :rules="{required: true}">
                    <v-select
                        prepend-icon="mdi-water"
                        :disabled="loading"
                        v-model="bloodGroup"
                        :items="['AB+', 'AB-', 'B+', 'B-', 'A+', 'A-', 'O+', 'O-']"
                        label="Blood Group"
                        :error-messages="errors"
                ></v-select>
                </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 3"
                    cols="12"
                    sm="4"
                    md="4"
                >
                <ValidationProvider v-slot="{ errors }" name="Country" :rules="{required: true}">
                    <v-select
                        :disabled="loading"
                        v-model="country"
                        :items="countries"
                        label="Country"
                        :error-messages="errors"
                        @input="getStates()"
                ></v-select>
                </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 3"
                    cols="12"
                    sm="4"
                    md="4"
                >
                <ValidationProvider v-slot="{ errors }" name="State" :rules="{required: true}">
                    <v-select
                        :disabled="loading"
                        v-model="state"
                        :items="states"
                        label="State"
                        :error-messages="errors"
                        @change="getCities()"
                ></v-select>
                </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 3"
                    cols="12"
                    sm="4"
                    md="4"
                >
                <ValidationProvider v-slot="{ errors }" name="City" :rules="{required: true}">
                    <v-select
                        :disabled="loading"
                        v-model="city"
                        :items="cities"
                        label="City"
                        :error-messages="errors"
                ></v-select>
                </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 3"
                    cols="12"
                    sm="12"
                    md="12"
                >
                <ValidationProvider v-slot="{ errors }" name="Address" :rules="{required: true, min:5}">
                  <v-text-field :disabled="loading" label="Address" type="text" :error-messages="errors" prepend-icon="mdi-home" v-model="address"></v-text-field>
                </ValidationProvider>
                </v-col>

                <v-col
                    v-if="step === 4"
                    cols="12"
                    sm="12"
                    md="12"
                >
                <span :class="description.length === 0 ? 'error-12' : ''">Description</span>
                <ValidationProvider v-slot="{ errors }" name="Description" :rules="{required: true, min:5}">
                  <vue-editor style="max-height: 200px; overflow-y: scroll" :disabled="loading" type="text" :error-messages="errors" v-model="description"></vue-editor>
                </ValidationProvider>
                </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-card-actions>
					<v-spacer></v-spacer>
          <v-btn class="info" v-if="step == 2 || step == 3 || step == 4" @click.prevent="prev()">Previous</v-btn>
          <v-btn class="info" v-if="step == 1 || step == 2 || step == 3" @click.stop.prevent="handleSubmit(next)">Next</v-btn>
					<v-btn v-if="step === 4" type="submit" color="info">
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
</div>
</template>


<script>
import { VueEditor } from "vue2-editor";
import axios from 'axios'
export default{
    components: {
      VueEditor
    },
    name: 'profile',
    data(){
        return {
            step:1,
            modal: false,
            newImage: '',
            loading: false,
            userName : this.$store.state.user[0].userName !==null ? this.$store.state.user[0].userName : null,
            email : this.$store.state.user[0].email !==null ? this.$store.state.user[0].email : null,
            name : this.$store.state.user[0].name !==null ? this.$store.state.user[0].name : null,
            gender : this.$store.state.user[0].gender !==null ? this.$store.state.user[0].gender : null,
            hobbies : this.$store.state.user[0].hobbies !==null ? this.$store.state.user[0].hobbies.split(',') : [],
            bloodGroup : this.$store.state.user[0].bloodGroup !==null ? this.$store.state.user[0].bloodGroup : null,
            dob : this.$store.state.user[0].dob !==null ? this.$store.state.user[0].dob.substring(0,10) : null,
            address : this.$store.state.user[0].address !==null ? this.$store.state.user[0].address : null,
            description : this.$store.state.user[0].description !==null ? this.$store.state.user[0].description : null,
            city : this.$store.state.user[0].city !==null ? this.$store.state.user[0].city : null,
            state : this.$store.state.user[0].state !==null ? this.$store.state.user[0].state : null,
            country : this.$store.state.user[0].country !==null ? this.$store.state.user[0].country : null,
            phoneNumber: this.$store.state.user[0].phoneNumber !==null ? this.$store.state.user[0].phoneNumber : null,
            profilePicture : this.$store.state.user[0].profilePicture !==null ? this.$store.state.user[0].profilePicture : null,
            uploaded: false,
            blood_groups: [
              { text:'Please select an option', value: null },
              { text:'AB+', value:'AB+' },
              { text:'AB-', value:'AB-' },
              { text:'B+', value:'B+' },
              { text:'B-', value:'B-' },
              { text:'O+', value:'O+' },
              { text:'O-', value:'O-' },
              { text:'A+', value:'A+' },
              { text:'A-', value:'A-' },
            ],
            myhobbies: [
              { text: 'Boxing', value: 'Boxing' },
              { text: 'Cooking', value: 'Cooking' },
              { text: 'Dancing', value: 'Dancing' },
              { text: 'Movie', value: 'Movie'},
              { text: 'Swimming', value: 'Swimming' }
            ],
            countries: [],
            states: [],
            cities: [],
            selectedCountry: this.$store.state.user[0].country !==null ? this.$store.state.user[0].country : null,
            selectedState: this.$store.state.user[0].state !==null ? this.$store.state.user[0].state : null,
      }
    },
     created(){
      // this.$store.state.user[0]     
      console.log(this.$store.state.user[0])
      this.getCountries()

      if(this.country!==null){
        this.getStates()
      }
      if(this.state!==null){
        this.getCities()
      }
    },
    methods: {
      prev() {
      this.step--;
      },
      next() {
        this.step++;
      },
      handler(){
        console.log(this.$refs)
        this.$refs.imageOpen.value = ''
        this.$refs.imageOpen.click()
      },
      getCountries(){
          axios.get('/Public/country')
          .then(response => {
              for(let i in response.data){
                const country={
                  text:response.data[i].name,
                  value:response.data[i].iso2
              }
              //console.log(country.text)
              //console.log(country.value)
                this.countries.push(country)
              }
            });
      },
      getStates: function() {
        this.states=[]
        this.cities=[]
          axios.get(`/Public/state?countryName=${this.country}`)
            .then(response => {
              //console.log(response.data)
              for(let i in response.data){
                const state={
                  text:response.data[i].name,
                  value:response.data[i].iso2
                }
                //console.log(state.text)
                //console.log(state.value)
            this.states.push(state)
            if(this.selectedCountry !== this.country){
              this.state = ''
              this.city = ''
              this.address = ''
            }
              }
          });
      },
      getCities: function() {
        this.cities=[]
        axios.get(`/Public/city?countryName=${this.country}&stateName=${this.state}`)
          //axios.get(`/getcontstatecity?country=${this.country}&state=${this.state}`)
            .then(response => {
              //console.log(response.data)
              for(let i in response.data){
                const city={
                  text:response.data[i].name,
                  value:response.data[i].name
                }
                //console.log(city.text)
                //console.log(city.value)
                this.cities.push(city)
                if(this.selectedState !== this.state){
                  this.city = ''
                  this.address = ''
                }
              }
          });
      },
      GetImage(e){
          this.uploaded = false
          this.newImage = e.target.files[0]
          // let reader = new FileReader();
          // reader.readAsDataURL(this.newImage);
          // reader.onload = e => {
          //     this.avatar = e.target.result
          //     this.uploaded = true
          // }
           this.avatar = URL.createObjectURL(e.target.files[0])
           this.uploaded = true
          console.log(this.avatar)
      },
      profile_update(){
        console.log(this.profilePicture)
        console.log(this.newImage)
        this.loading = true
        console.log('hello im here')
        let formdata = new FormData()
        formdata.append("userName", this.userName);
        formdata.append("email", this.email);
        formdata.append("name", this.name);
        formdata.append("gender", this.gender);
        formdata.append("hobbies", this.hobbies.join(','));
        formdata.append("bloodGroup", this.bloodGroup);
        formdata.append("country", this.country);
        formdata.append("state", this.state);
        formdata.append("city", this.city);
        formdata.append("address", this.address);
        formdata.append("phoneNumber", this.phoneNumber);
        if(this.avatar && this.uploaded){
          formdata.append("coverPhoto", this.newImage);
        }
        formdata.append("dob", this.dob);
        formdata.append("description", this.description);
        console.log(formdata)
        // console.log(this.user.hobbiesCategory)
        this.$store.dispatch('profile_update',formdata).then(response => {
          this.loading = false;
          console.log(response)
          this.avatar = null
          this.uploaded = false
          this.$refs.password_update.reset()
          //this.$store.dispatch('retrieveUser');
          this.profilePicture = this.$store.state.user[0].profilePicture !== null ? this.$store.state.user[0].profilePicture : null
          // this.$router.push({ name: 'todo' })
        })
        // .catch(error => {
        //   this.loading = false
        //   console.log(error.response)
        // })
      }
  }
}
</script>

<style scoped>
.overlay {
  position: absolute;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}
.picture:hover .overlay {
  display: block;
}
.error-12{
  color: red;
  background-color: none;
}
</style>