<template>
  <b-navbar
    type="dark"
    variant="info"
    class="shadow-sm py-0"
    :sticky="true"
    toggleable="md"
  >
    <b-container class="py-1">
      <b-navbar-brand to="/" class="mr-xl-5 py-2" href="#">
        <h2>News Project</h2>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact-active-class="text-white">Top Headlines</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style scoped></style>
