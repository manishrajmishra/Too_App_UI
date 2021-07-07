<template>
<v-container>
    <v-main>
        <v-row>
        <v-col cols="12" md="6">
        <h1>Oops!</h1>
        <h3>The page you're looking for is not here.</h3>
        <v-btn style="margin-left: 2rem; margin-top: 1rem" color="primary" :to="{ name: 'home' }">
              Go to the home page
        </v-btn>
        </v-col>

        <v-col cols="6" md="6">
          <img width="700" :src="require('@/assets/404-error-page.png')">
        </v-col>
        </v-row>
    </v-main>
</v-container>
</template>