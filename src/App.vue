<template>
  <div id="app">
    <nav-bar></nav-bar>
    <b-container class="py-5">

      <router-view></router-view>
    </b-container>

  </div>
</template>

<style lang="scss">


</style>
<script>
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar}
}
</script>
