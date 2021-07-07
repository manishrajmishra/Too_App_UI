<template>
  <v-container>
    <v-row>
      <v-hover v-slot="{ hover }">
      <pre class="mx-auto justify-center" style="font-size: 50px; overflow: hidden;">
        <strong>
        Keep the track of your
                Work 
           with this Todo.</strong>
            <v-btn :elevation="hover ? 15 : 6" style="left: 250px" color="success" to="/register" class="ml-15" v-if="!loggedIn">Register</v-btn></pre>
      </v-hover>
    </v-row>
    <br/>
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover ? 15 : 6">
        <v-carousel cycle show-arrows-on-hover>
          <v-carousel-item
            reverse-transition="fade"
            transition="fade"
            :src="require('@/assets/landing.jpg')"
        ></v-carousel-item>
        <v-carousel-item
            reverse-transition="fade"
            transition="fade"
            :src="require('@/assets/landing1.jpg')"
        ></v-carousel-item>
        <v-carousel-item
            reverse-transition="fade"
            transition="fade"
            :src="require('@/assets/landing2.jpg')"
        ></v-carousel-item>
        </v-carousel>
    <!-- <v-img :src="require('@/assets/landing.jpg')"> </v-img> -->
      </v-card>
    </v-hover>
    <br/><br/>
    <br /><br />
    <v-hover v-slot="{hover}">
      <v-card :elevation="hover ? 15 : 6">
    <v-row class="mx-auto justify-center">
      <h1 class="ml-5">Free up your mental space</h1>
      <p class="ml-10 mr-5">
        Regain clarity and calmness by getting all those tasks out of your head
        and onto your to-do list (no matter where you are or what device you
        use).
      </p>
    </v-row>
      </v-card>
    </v-hover>
    <br />
    <br />
    <v-row class="mx-auto justify-center">
      <v-col cols="6">
      <v-hover v-slot="{hover}">
      <v-card :elevation="hover ? 15 : 6">
        <h1 class="ml-5 mt-15">
          <strong>A task manager you can trust for life</strong>
        </h1>
        <p class="ml-5 mr-5 mb-5">
          In the 30 days that we’ve been building Todoist, we’ve never
          considered selling out or becoming acquired. Our team is committed to
          staying independent and earning your trust for as long as you need our
          apps.
        </p>
        <v-btn :elevation="hover ? 15 : 6" color="info" v-if="!loggedIn" to="/login" class="ml-15 mb-5"
          >Login</v-btn
        >
      </v-card>
      </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover v-slot="{hover}">
      <v-card :elevation="hover ? 15 : 6">
        <v-img :src="require('@/assets/landing1.jpg')"> </v-img>
      </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <br />
    <br />
    <v-row class="mx-auto justify-center">
      <v-col cols="6">
        <v-hover v-slot="{hover}">
      <v-card :elevation="hover ? 15 : 6">
        <v-img :src="require('@/assets/landing2.jpg')"> </v-img>
      </v-card>
        </v-hover>
      </v-col>
      <v-col cols="6" class="mt-5">
        <v-hover v-slot="{hover}">
      <v-card height="200" :elevation="hover ? 15 : 6">
        <h1 class="mt-15 ml-5">
          <strong>Achieve peace of mind with Todo</strong>
        </h1>
        <p class="ml-5 mr-5">
        Regain clarity and calmness by getting all those tasks out of your head
        and onto your to-do list (no matter where you are or what device you
        use).
      </p>
      </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default{
  name: 'home',
  data(){
    return{
      
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
}
</script>
