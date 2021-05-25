<template>
  <div class="home">
    <BrandList msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BrandList from '@/components/BrandList.vue' // @ is an alias to /src

@Component({
  components: {
    BrandList
  }
})
export default class Home extends Vue {}
</script>
