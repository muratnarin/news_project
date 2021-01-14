<template>
  <div>
        <h4 class="mb-3">All Newspapers</h4>
        <b-list-group>
          <b-list-group-item
              v-for="(item,index) in getNewspapers"
              :key="index"
              class="d-flex justify-content-between align-items-center"
              button
              @click="$router.push('/newspaper/' + item.id)"
          >
              {{ item.name }}
          </b-list-group-item>
        </b-list-group>
  </div>
</template>

<script>
import {mapActions , mapGetters} from 'vuex'
export default {
name: "NewsList",
  computed:{
    ...mapGetters({
      getNewspapers: 'getNewspapers'
    })
  },
  methods:{
    ...mapActions({
      fetchNewspapers: 'fetchNewsPapers',

    }),
  },
  created() {
    this.fetchNewspapers()
  }
}
</script>

<style scoped>
</style>
