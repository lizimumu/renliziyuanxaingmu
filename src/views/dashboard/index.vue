<template>
  <div class="dashboard-container">
    <Upload-img @on-success="onsuccess1" />

    <Upload-img @on-success="onsuccess2" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  // async  created() {
  //   const res = await this.$store.dispatch('user/getUserInfo')
  //   console.log(res)
  // },
  methods: {
    onsuccess1(value) {
      console.log(123, value)
    },
    onsuccess2(value) {
      console.log(456, value)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
