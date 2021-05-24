<template>
  <div>
    <div>
      <div class="username"></div>
<!--      <input @keydown="getDataList"/>-->
    </div>
    <div class="data__list">
      <brand-item v-for="(item, index) in DataListGetter"
                  :brand="item"
                  :key="index" class="data__item"/>
    </div>
    <footer>
      <button @click="resetFrontDB">RESET DB</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IBrand } from '@/interfaces/brand'
import BrandItem from '@/components/BrandItem.vue'

const TreeView = namespace('treeview')

@Component({
  components: {
    BrandItem
  }
})
export default class HelloWorld extends Vue {
  @TreeView.Action
  public resetFrontDB!: () => void

  @TreeView.Action
  public deleteDataItem!: (id: string) => void

  @TreeView.Action
  public getDataList!: () => void

  @TreeView.Action
  public updateDataItem!: () => void

  @TreeView.Getter
  public DataListGetter!: Array<IBrand>

  created (): void {
    this.getDataList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.data__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
}

</style>
