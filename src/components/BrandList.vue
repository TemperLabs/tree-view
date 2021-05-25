<template>
  <div>
    <div>
    </div>
    <div class="data__list">
      <brand-item v-for="(item) in shortListGetter"
                  :brand="item"
                  :key="item.id" class="data__item"/>
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
export default class BrandList extends Vue {
  @TreeView.State
  public dataList!: Array<IBrand>

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

  @TreeView.Getter
  public shortListGetter!: Array<IBrand>

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
