import Vue from 'vue'
import Vuex from 'vuex'
import getter from './getters'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex);

// 变量声明
const state = {
  fullscreenLoading:false,//加载框
  totalPrice:0,
  resultData :[],
  isSuccess:false,
  selectArray:[],
  unm:'',
  pswd:'',
  sion:{},
  moreTabIndex:"0",
  echartData :[],
  produceSortType:"",//产品排序种类
  produceMultiSel:{},//产品筛选多条件
  markingckdata:[],//营销模块选择存款客户
  markingdkdata:[],//营销模块选择贷款客户
  markingyxlrdata:[],//营销模块选择意向录入客户
  activeName:"0",
  activeNamelength:"0",
  marktingId:"",//营销模块每一次选择的客户id都存在这里 然后各个页面去取
  activityTypeDeposit:"",//存款
  activityTypeLoans:'',//贷款
  activityTypeGuest:'',//潜客
  activityTypeTb:'',//团建
  activityTypeRests:'',//意向录入其他
  listData: '',//高管看板柱状图头部数据
  htmlWrap:'' //营销附件回显html标签集

};

export default new  Vuex.Store({
  state,
  getter,
  mutations,
  actions
});




