<template>
  <div id="app">
    <nav-bar>

    </nav-bar>
    <b-container class="py-5">

      <router-view></router-view>
    </b-container>
    <dm-footer></dm-footer>
  </div>
</template>

<style lang="scss">


</style>
<script>
import NavBar from "@/components/NavBar";
import DmFooter from "@/components/DmFooter";
export default {
  components: {DmFooter, NavBar}
}
</script>
