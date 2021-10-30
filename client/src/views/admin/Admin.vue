<template>
    <div>
        Вы вошли в панель администратора
    </div>
</template>

<script>
    export default {
        data() {
          return {
              auth: false
          }
        },
        mounted() {
            if (!this.auth) {
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>