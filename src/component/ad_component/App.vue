<template>
  <div >
      <router-view></router-view>

  </div>
</template>

<script>



export default {
  name: 'App',

}
</script>

<style>
 .v-enter,.v-leave-to{
        opacity: 0;
        transition: translatex ;
      }
      .v-enter-active, .v-leave-active{
         transition: all 0.5s ease;

      }
</style>
