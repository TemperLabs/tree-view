import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import axios from 'axios'
import { IBrand, IBrandRaw } from '@/interfaces/brand'

const API_URL = 'https://recruting-test-api.herokuapp.com/api/v1/'

@Module({ namespaced: true })
class TreeView extends VuexModule {
  public dataList: Array<IBrand> = []

  get DataListGetter (): Array<IBrand> {
    return this.dataList
  }

  get shortListGetter (): Array<IBrand> {
    const result = this.dataList.reduce((newArr:Array<IBrand>, currentBrand:IBrand) => {
      if (currentBrand.main && (newArr).length <= 5) {
        newArr.push(currentBrand)
      }
      return newArr
    }, [])
    if (!result) {
      return this.dataList.slice(0, 4)
    } else return result
  }

  @Mutation
  public SET_DATA_LIST (data: Array<IBrand>): void {
    this.dataList = data
  }

  @Mutation
  public DELETE_DATA_ITEM (index: number): void {
    this.dataList.splice(index, 1)
  }

  @Mutation
  public UPDATE_DATA_ITEM (adaptedData :IBrand): void {
    const foundIndex = this.dataList.findIndex((element: { id: string }) => element.id === adaptedData.id)
    this.dataList[foundIndex] = { id: adaptedData.id, title: adaptedData.title, main: adaptedData.main }
  }

  @Action
  public async updateDataItem (uploadData : IBrand): Promise<void> {
    console.log('uploadData')
    console.log(uploadData)
    const response = axios.put(`${API_URL}brand/${uploadData.id}`, { title: uploadData.title, main: uploadData.main }).catch((err) => {
      console.log(`error on updating Data item: ${err}`)
      throw new Error(err)
    })

    if (response) {
      const { data: updatedData } = await response
      const {
        _id: id,
        title,
        main
      } = updatedData
      const adaptedData = {
        id,
        title,
        main
      }
      console.log('adaptedData')
      console.log(adaptedData)
      this.context.commit('UPDATE_DATA_ITEM', adaptedData)
    }
  }

  @Action
  public async resetFrontDB (): Promise<void> {
    axios.get(`${API_URL}front/resetDB`).catch((err) => {
      console.log(`error on reseting DB: ${err}`)
      throw new Error(err)
    }).then((response) => {
      console.log(response)
    })
  }

  @Action
  public async deleteDataItem (id: string): Promise<void> {
    const response = await axios.delete(`${API_URL}brand/${id}`).catch((err) => {
      console.log(`error on deleting item: ${err}`)
      throw new Error(err)
    })
    if (response) {
      const index = this.context.state.dataList.findIndex((element: { id: string }) => element.id === id)
      if (index > -1) { this.context.commit('DELETE_DATA_ITEM', index) }
    }
  }

  @Action
  public async getDataList (): Promise<void> {
    const { data } = await axios.get(`${API_URL}brands`).catch((err) => {
      console.log(`we'v got ${err}`)
      throw new Error(err)
    })
    if (data) {
      const adaptedData = data.map((item: IBrandRaw) => {
        const {
          _id,
          title,
          main
        } = item
        return {
          id: _id,
          title,
          main
        }
      })
      this.context.commit('SET_DATA_LIST', adaptedData)
    }
  }
}

export default TreeView
