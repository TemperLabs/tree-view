<template>
  <div class="brand">
    <div v-if="!isEditing" class="brand__field-wrap">
      <span class='brand__field-text' @dblclick="enableEditing">- {{ brand.title }}</span>
      <span class='brand__field-text' @dblclick="enableEditing">- {{ brand.main }}</span>
      <button @click="enableEditing"> Edit</button>
      <div class="close" @click="deleteDataItem(brand.id)"/>
    </div>
    <div v-if="isEditing" class="field-wrap">
      {{tempTitle}} {{tempMain}}
      <input
          v-model="tempTitle"
          @keyup.enter="saveEdit({id:brand.id, title:tempTitle, main:tempMain})"
          @keyup.escape="disableEditing"
      />
      <input
          v-model="tempMain"
          type="checkbox"
          @keyup.enter="saveEdit({id:brand.id, title:tempTitle, main:tempMain})"
          @keyup.escape="disableEditing"
      />
      <button @click="disableEditing">Cancel</button>
      <button @click="saveEdit({id:brand.id, title:tempTitle, main:tempMain})">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IBrand } from '@/interfaces/brand'

const TreeView = namespace('treeview')

@Component
export default class BrandItem extends Vue {
  @Prop() readonly brand!: IBrand

  @VModel tempTitle!: string
  @VModel tempMain!: boolean
  public isEditing = false

  @TreeView.Action
  public deleteDataItem!: (id: string) => void

  @TreeView.Action
  public updateDataItem!: (brand: IBrand) => void

  public disableEditing (): void {
    this.tempTitle = null
    this.isEditing = false
  }

  public saveEdit (brand: IBrand): void {
    this.disableEditing()
    console.log('brand on save')
    console.log(brand)
    this.updateDataItem(brand)
  }

  public enableEditing (): void {
    this.tempTitle = this.brand.title
    this.tempMain = this.brand.main
    this.isEditing = true
  }
}
</script>
<style lang="scss">
.brand {
  display: flex;
  position: relative;
  align-items: flex-start;
  border: 1px solid black;
  margin: 5px 5px 15px 5px;
  font-size: 16px;
  font-weight: 600;
  background-color: #ffffbb;
  flex: 1 1 auto;
  flex-direction: row;
  padding: 16px 36px 16px 16px;
  max-width: 240px;

  &__field-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__field-text:first-child {
    margin-bottom: 10px;
  }
}

.close {
  position: absolute;
  right: 8px;
  bottom: 0px;
  width: 20px;
  height: 20px;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &:after, &:before {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

}
</style>
