<template>
  <div>
    <div>
      <div class="username"></div>
<!--      <input @keydown="getDataList"/>-->
    </div>
    <div class="data__list">
      <div v-for="(item, index) in DataListGetter" :key="index" class="data__item">
        <span class="data__text">{{ item.id }}</span>
        <div class="field">
          <div v-if="!isEditing">
            <span class='field-text' @dblclick="enableEditing">{{todoItem.title}}</span>
          </div>
          <div v-if="isEditing">
            <input
                v-model="tempTitle"
                class="todo-item-input"
                ref="todoInput"
                @keyup.enter="saveEdit({todoItem:todoItem, todoListID, tempTitle})"
                @keyup.escape="disableEditing"
                v-click-outside="disableEditing"/>
            <button @click="disableEditing"> Cancel </button>
            <button @click="saveEdit({todoItem:todoItem, todoListID, tempTitle})"> Save </button>
          </div>
        </div>
        <span class="data__text">{{ item.title }}</span>

        <span class="data__text">{{ item.main }}</span>
        <div class="close" @click="deleteDataItem(item.id)"/>
      </div>
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

const TreeView = namespace('treeview')

@Component
export default class HelloWorld extends Vue {
  public tempTitle = ''

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

//   public saveEdit(payload): void => {
//     this.disableEditing()
//     this.$store.dispatch('saveTodoItem', payload)
//   }
//
// public enableEditing(): void {
//     this.tempTitle = this.todoItem.title
//     this.isEditing = true
//     this.$nextTick(() => {
//       this.$refs.todoInput.focus()
//     })
//   }

  public disableEditing(): void {
    this.tempTitle = null
    this.isEditing = false
  }

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

.data__item {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 auto;
  border: 1px solid black;
  margin: 0 5px 15px 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  background-color: #ffffbb;
}

.field {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
}

.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 20px;
  height: 20px;
  opacity: 0.3;
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
