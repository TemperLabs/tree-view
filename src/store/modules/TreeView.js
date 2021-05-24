import { __decorate } from "tslib";
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import axios from 'axios';
const API_URL = 'https://recruting-test-api.herokuapp.com/api/v1/';
let TreeView = class TreeView extends VuexModule {
    constructor() {
        super(...arguments);
        this.dataList = [];
    }
    get dataListed() {
        return this.dataList;
    }
    SET_DATA_LIST(data) {
        this.dataList = data;
    }
    DELETE_DATA_ITEM(index) {
        console.log(index);
        this.dataList.splice(index, 1);
        console.log(this.dataList);
    }
    async resetFrontDB() {
        axios.get(`${API_URL}front/resetDB`).catch((err) => {
            console.log(`error on reseting DB: ${err}`);
            throw new Error(err);
        }).then((response) => {
            console.log(response);
        });
    }
    async deleteDataItem(id) {
        const response = await axios.delete(`${API_URL}brand/${id}`).catch((err) => {
            console.log(`error on deleting item: ${err}`);
            throw new Error(err);
        });
        if (response) {
            const index = this.context.state.dataList.findIndex((element) => element.id === id);
            if (index > -1) {
                this.context.commit('DELETE_DATA_ITEM', index);
            }
        }
    }
    async getDataList() {
        const { data } = await axios.get(`${API_URL}brands`).catch((err) => {
            console.log(`we'v got ${err}`);
            throw new Error(err);
        });
        if (data) {
            const adaptedData = data.map((item) => {
                const { _id, title, main } = item;
                const adaptedItem = {
                    id: _id,
                    title,
                    main
                };
                return adaptedItem;
            });
            this.context.commit('SET_DATA_LIST', adaptedData);
        }
    }
};
__decorate([
    Mutation
], TreeView.prototype, "SET_DATA_LIST", null);
__decorate([
    Mutation
], TreeView.prototype, "DELETE_DATA_ITEM", null);
__decorate([
    Action
], TreeView.prototype, "resetFrontDB", null);
__decorate([
    Action
], TreeView.prototype, "deleteDataItem", null);
__decorate([
    Action
], TreeView.prototype, "getDataList", null);
TreeView = __decorate([
    Module({ namespaced: true })
], TreeView);
export default TreeView;
//# sourceMappingURL=TreeView.js.map