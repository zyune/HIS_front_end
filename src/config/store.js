import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const module = {
// 应用初始状态
    state :{
        inspectionPatient: {},
        useTemplateData:{
            chiefComplaint:""
        },
        loginUser:{

        }
    },
// 定义所需的 mutations
    mutations : {
        setInspectionPatient(state,data) {
            state.inspectionPatient = data;
        },
        setuseTemplateData(state,data) {
            state.useTemplateData = data;
        },
        setLoginUser(state,data) {
            state.loginUser = data;
        }
    },
    getters: {
        getInspectionPatient(state) {
            return state.inspectionPatient;
        },
        getuseTemplateData(state) {
            return state.useTemplateData;
        },getLoginUser(state) {
            return state.loginUser;
        }

    }

};

// 创建 store 实例
const store = new Vuex.Store(module);
export  default  store;