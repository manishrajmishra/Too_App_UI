<template>
    <div>
    </div>
</template>

<script>
export default{
    created(){
        this.$store.dispatch('clearTodos')
        this.$store.dispatch('loggedOut')
          // eslint-disable-next-line no-unused-vars
            .then(response => {
                this.$router.push({name: 'home'})
            })
    }
}
</script>