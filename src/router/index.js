import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const main = r => require.ensure([], () => r(require('@/pages/main')), 'main')
const result = r => require.ensure([], () => r(require('@/pages/result')), 'result')


//工作日报模块
const Job = r => require.ensure([], () => r(require('@/pages/jobModule/job')), 'Job')
const otherP = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/other')), 'otherP')
const loanSchedul = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/loan_schedule')), 'loanSchedul')
const customerInput = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/customerInput')), 'customerInput')
const search = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/search')), 'search')
const personal = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/personal')), 'personal')
const state = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/state')), 'state')
const jobModul = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/job_modul')), 'jobModul')
const seeCustomer = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/seeCustomer')), 'seeCustomer')
const seeOther = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/seeOther')), 'seeOther')
const updateNewJob = r => require.ensure([], () => r(require('@/pages/jobModule/jobPages/updateNewJob')), 'updateNewJob')

//晨夕会模块
const morningS = r => require.ensure([], () => r(require('@/pages/morningSession/morningS')), 'morningS')
const morningSession = r => require.ensure([], () => r(require('@/pages/morningSession/morningSession')), 'morningSession')
const morningSessionfff = r => require.ensure([], () => r(require('@/pages/morningSession/morningSessionfff')), 'morningSessionfff')

//产品模块
const productMainPage = r => require.ensure([], () => r(require('@/pages/productModule/productMainPage')), 'productMainPage')
const productDetailPage = r => require.ensure([], () => r(require('@/pages/productModule/productDetailPage')), 'productDetailPage')

//消息模块
const Messages = r => require.ensure([], () => r(require('@/pages/messages/messages')), 'Messages')
const listDetail = r => require.ensure([], () => r(require('@/pages/messages/listDetail')), 'listDetail')
const Editor = r => require.ensure([], () => r(require('@/pages/messages/Editor')), 'Editor')
const Muban = r => require.ensure([], () => r(require('@/pages/messages/Muban')), 'Muban')

//目标达成模块

const Reachgoal = r => require.ensure([], () => r(require('@/pages/reachGoal/reachMain')), 'Reachgoal')
const GyList = r => require.ensure([], () => r(require('@/pages/reachGoal/guiyuan/GyList')), 'GyList')
const Manager = r => require.ensure([], () => r(require('@/pages/reachGoal/xiaodai/Manager')), 'Manager')
const DaiKuan = r => require.ensure([], () => r(require('@/pages/reachGoal/xiaodai/Daikuan')), 'DaiKuan')
const Fzx = r => require.ensure([], () => r(require('@/pages/reachGoal/fenzhongxin/fzx')), 'Fzx')


//客户

const client = r => require.ensure([], () => r(require('@/pages/client/clients')), 'client')
const clientBlackName = r => require.ensure([], () => r(require('@/pages/client/clientModule/clientBlackName')), 'clientBlackName')
const clientUsersManage = r => require.ensure([], () => r(require('@/pages/client/clientModule/clientUsersManage')), 'clientUsersManage')
const clientQianZai = r => require.ensure([], () => r(require('@/pages/client/clientModule/clientQianZai')), 'clientQianZai')
const clientFocus = r => require.ensure([], () => r(require('@/pages/client/clientModule/clientFocus')), 'clientFocus')
const clientGroup1 = r => require.ensure([], () => r(require('@/pages/client/clientModule/clientGroup1')), 'clientGroup1')
const clientGroup2 = r => require.ensure([], () => r(require('@/pages/client/clientModule/clientGroup2')), 'clientGroup2')
const clientGroup3 = r => require.ensure([], () => r(require('@/pages/client/clientModule/clientGroup3')), 'clientGroup3')

//零售客户
const clientInform = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientInform')), 'clientInform')
const clientCont = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientCont')), 'clientCont')
const clientjichu = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientjichu')), 'clientjichu')
const clientNew = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientNew')), 'clientNew')
const clientPj = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientPj')), 'clientPj')
const clientCunKuan = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientCunKuan')), 'clientCunKuan')
const clientGuQuan = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientGuQuan')), 'clientGuQuan')
const clientDaiKuan = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientDaiKuan')), 'clientDaiKuan')
const clientdanbao = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientdanbao')), 'clientdanbao')
const clientCredit = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientCredit')), 'clientCredit')
const clientSign = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientSign')), 'clientSign')


//客户基础信息的页面
const clientinfo1 = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientinfo1')), 'clientinfo1')
const clientinfo2 = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientinfo2')), 'clientinfo2')
const clientinfo3 = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientinfo3')), 'clientinfo3')
const clientinfo4 = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientinfo4')), 'clientinfo4')
const clientinfo5 = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientinfo5')), 'clientinfo5')


//零售客户业务信息
const clientYewuone = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientYewuone')), 'clientYewuone')
const clientYewutwo = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientYewutwo')), 'clientYewutwo')
const clientYewuthree = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientYewuthree')), 'clientYewuthree')
//客户价值
const clientgongxianone = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientgongxianone')), 'clientgongxianone')
const clientgongxiantwo = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientgongxiantwo')), 'clientgongxiantwo')

//零售客户营销
const clientYingone = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientYingone')), 'clientYingone')
const clientYingtwo = r => require.ensure([], () => r(require('@/pages/client/clientLS/clientYingtwo')), 'clientYingtwo')
//对公
const publicInform = r => require.ensure([], () => r(require('@/pages/client/publicS/publicInform')), 'publicInform')
const publicCont = r => require.ensure([], () => r(require('@/pages/client/publicS/publicCont')), 'publicCont')
//对公基础信息
const publicjichu = r => require.ensure([], () => r(require('@/pages/client/publicS/publicjichu')), 'publicjichu')
const credentials = r => require.ensure([], () => r(require('@/pages/client/publicS/credentials')), 'credentials')
const publicCunKuan = r => require.ensure([], () => r(require('@/pages/client/publicS/publicCunKuan')), 'publicCunKuan')
const publicGuQuan = r => require.ensure([], () => r(require('@/pages/client/publicS/publicGuQuan')), 'publicGuQuan')
const publicinfo1 = r => require.ensure([], () => r(require('@/pages/client/publicS/publicinfo1')), 'publicinfo1')
const publicDaiKuan = r => require.ensure([], () => r(require('@/pages/client/publicS/publicDaiKuan')), 'publicDaiKuan')
const publicgongxiantwo = r => require.ensure([], () => r(require('@/pages/client/publicS/publicgongxiantwo')), 'publicgongxiantwo')
const publicinfo2 = r => require.ensure([], () => r(require('@/pages/client/publicS/publicinfo2')), 'publicinfo2')
const publicYewuone = r => require.ensure([], () => r(require('@/pages/client/publicS/publicYewuone')), 'publicYewuone')
const publicYewutwo = r => require.ensure([], () => r(require('@/pages/client/publicS/publicYewutwo')), 'publicYewutwo')
const publicYewuthree = r => require.ensure([], () => r(require('@/pages/client/publicS/publicYewuthree')), 'publicYewuthree')
const publicgongxianone = r => require.ensure([], () => r(require('@/pages/client/publicS/publicgongxianone')), 'publicgongxianone')
const astronomyCustomers = r => require.ensure([], () => r(require('@/pages/client/publicS/astronomyCustomers')), 'astronomyCustomers')
const publiclawsuit = r => require.ensure([], () => r(require('@/pages/client/publicS/publiclawsuit')), 'publiclawsuit')

//设置
const Shezhi = r => require.ensure([], () => r(require('@/pages/shezhi/myplugin')), 'Shezhi')
//活动策划与发起
const activityMain = r => require.ensure([], () => r(require('@/pages/activityPlan/activityMain')), 'activityMain')
const activityDetail = r => require.ensure([], () => r(require('@/pages/activityPlan/activityDetail')), 'activityDetail')
const activityObj = r => require.ensure([], () => r(require('@/pages/activityPlan/activityObj')), 'activityObj')
const annex = r => require.ensure([], () => r(require('@/pages/activityPlan/annex')), 'annex')
const activityGuiding = r => require.ensure([], () => r(require('@/pages/activityPlan/activityGuiding')), 'activityGuiding')
const activityRules = r => require.ensure([], () => r(require('@/pages/activityPlan/activityRules')), 'activityRules')
const rewardDetail = r => require.ensure([], () => r(require('@/pages/activityPlan/rewardDetail')), 'rewardDetail')


//更多模块
const moreMainPage = r => require.ensure([], () => r(require('@/pages/moreModule/moreMainPage')), 'moreMainPage')
const ActivityList = r => require.ensure([], () => r(require('@/pages/moreModule/ActivityList')), 'ActivityList')
const moreInform = r => require.ensure([], () => r(require('@/pages/moreModule/moreInform')), 'moreInform')
const moreActivity = r => require.ensure([], () => r(require('@/pages/moreModule/moreActivity')), 'moreActivity')
const chooseckpage = r => require.ensure([], () => r(require('@/pages/moreModule/chooseckpage')), 'chooseckpage')
const chooseyxlrpage = r => require.ensure([], () => r(require('@/pages/moreModule/chooseYxlrpage')), 'chooseyxlrpage')
const choosepagedk = r => require.ensure([], () => r(require('@/pages/moreModule/choosepagedk')), 'choosepagedk')
const moreMarketing = r => require.ensure([], () => r(require('@/pages/moreModule/moreMarketing')), 'moreMarketing')

//更多模块中moreActivity中的路由

const moreActivityCont = r => require.ensure([], () => r(require('@/pages/moreModule/moreActivityCont')), 'moreActivityCont')
const moreActivityContDetail = r => require.ensure([], () => r(require('@/pages/moreModule/moreActivityContDetail')), 'moreActivityContDetail')
const moreLoans = r => require.ensure([], () => r(require('@/pages/moreModule/moreLoans')), 'moreLoans')
const moreLoansDetail = r => require.ensure([], () => r(require('@/pages/moreModule/moreLoansDetail')), 'moreLoansDetail')
const moreQianKe = r => require.ensure([], () => r(require('@/pages/moreModule/moreQianKe')), 'moreQianKe')
const morePurpose = r => require.ensure([], () => r(require('@/pages/moreModule/morePurpose')), 'morePurpose')
const moreMessage = r => require.ensure([], () => r(require('@/pages/moreModule/moreMessage')), 'moreMessage')
const moreTeam = r => require.ensure([], () => r(require('@/pages/moreModule/moreTeam')), 'moreTeam')
const morePurposePage = r => require.ensure([], () => r(require('@/pages/moreModule/morePurposePage')), 'morePurposePage')
const moreActivityHead = r => require.ensure([], () => r(require('@/components/common/moreComponents/moreActivityHead')), 'moreActivityHead')


//高管看板

const echartsBox = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBox')), 'echartsBox')
const echartsBoxA = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxA')), 'echartsBoxA')
const echartsBoxA1 = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxA1')), 'echartsBoxA1')
const echartsBoxAA1 = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxAA1')), 'echartsBoxAA1')
const echartsBoxAAA1 = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxAAA1')), 'echartsBoxAAA1')
const echartsBoxB = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxB')), 'echartsBoxB')
const echartsBoxBxq = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxBxq')), 'echartsBoxBxq')
const echartsBoxBB = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxBB')), 'echartsBoxBB')
const echartsBoxBBxq = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxBBxq')), 'echartsBoxBBxq')
const echartsBoxC = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxC')), 'echartsBoxC')
const echartsBoxCxq = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxCxq')), 'echartsBoxCxq')
const echartsBoxCC = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxCC')), 'echartsBoxCC')
const echartsBoxCCxq = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxCCxq')), 'echartsBoxCCxq')
const echartsBoxD = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxD')), 'echartsBoxD')
const echartsBoxDxq = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxDxq')), 'echartsBoxDxq')
const echartsBoxDD = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxDD')), 'echartsBoxDD')
const echartsBoxDDxq = r => require.ensure([], () => r(require('@/pages/topManagement/echartsBoxDDxq')), 'echartsBoxDDxq')


const toMainHeader = r => require.ensure([], () => r(require('@/pages/topManagement/toMainHeader')), 'toMainHeader')
const toMainHeader1 = r => require.ensure([], () => r(require('@/pages/topManagement/toMainHeader1')), 'toMainHeader1')
const toMainHeader2 = r => require.ensure([], () => r(require('@/pages/topManagement/toMainHeader2')), 'toMainHeader2')
const toMainHeader3 = r => require.ensure([], () => r(require('@/pages/topManagement/toMainHeader3')), 'toMainHeader3')
const toMainHeader4 = r => require.ensure([], () => r(require('@/pages/topManagement/toMainHeader4')), 'toMainHeader4')
const toMainHeader5 = r => require.ensure([], () => r(require('@/pages/topManagement/toMainHeader5')), 'toMainHeader5')
const topMain = r => require.ensure([], () => r(require('@/pages/topManagement/topMain')), 'topMain')


//接口出错显示的页面
const errPage = r => require.ensure([], () => r(require('@/components/tools/errPage')), 'errPage')

Vue.use(Router);
//Vue.http.options.emulateJSON = true;

export default new Router({
  linkActiveClass:'mui-active',
  //mode:'history',//history 必须配合后台数据请求,否则访问不到
  mode:'hash',
  //history:true,
  //saveScrollPosition:false,
  routes: [
    {path: '/', name: 'login', component: login},
    {path: '/main', name: 'mainPage',component: main},
    {path:'/result', name:'result', component:result},
    {path:'/job', name:'job', component:Job},
    {path:'/other', name:'other', component:otherP},
    {path:'/loan_schedule', name:'loanSchedul', component:loanSchedul},
    {path:'/customerInput', name:'customerInput', component:customerInput},
    {path:'/search', name:'search', component:search},
    {path:'/personal', name:'personal', component:personal},
    {path:'/state', name:'state', component:state},
    {path:'/jobModul', name:'jobModul', component:jobModul},
    //消息模块
    {path: '/messages', name: 'Messages', component: Messages},
    {path: '/listdetail', name: 'listDetail', component: listDetail},
    {path: '/editor', name: 'editor', component: Editor},
    {path: '/muban', name: 'muban', component: Muban},

    //设置

    {path: '/myplugin', name: 'myplugin', component: Shezhi},

    //客户
    {path: '/clients', name: 'clients', component: client},
    {path: '/clientBlackName', name:'clientBlackName',component:clientBlackName},
    {path: '/clientUsersManage', name:'clientUsersManage',component:clientUsersManage},
    {path: '/clientQianZai', name:'clientQianZai',component:clientQianZai},
    {path: '/clientFocus', name:'clientFocus',component:clientFocus},
    {path: '/clientGroup1',name: 'clientGroup1', component:clientGroup1},
    {path: '/clientGroup2',name: 'clientGroup2', component:clientGroup2},
    {path: '/clientGroup3',name: 'clientGroup3', component:clientGroup3},


    //零售客户
    {path: '/clientInform', name: 'clientInform', component: clientInform},
    {path: '/clientCont', name: 'clientCont', component: clientCont},
    {path: '/clientjichu', name: 'clientjichu', component: clientjichu},
    {path: '/clientNew', name: 'clientNew', component: clientNew},
    {path: '/clientPj', name: 'clientPj', component: clientPj},
    {path: '/clientCunKuan', name: 'clientCunKuan', component: clientCunKuan},
    {path: '/clientGuQuan', name: 'clientGuQuan', component: clientGuQuan},
    {path: '/clientDaiKuan', name: 'clientDaiKuan', component: clientDaiKuan},
    {path: '/clientdanbao', name: 'clientdanbao', component: clientdanbao},
    {path: '/clientCredit', name: 'clientCredit', component: clientCredit},
    {path: '/clientSign', name: 'clientSign', component: clientSign},

    //客户基础信息
    {path: '/clientinfo1', name: 'clientinfo1', component: clientinfo1},
    {path: '/clientinfo2', name: 'clientinfo2', component: clientinfo2},
    {path: '/clientinfo3', name: 'clientinfo3', component: clientinfo3},
    {path: '/clientinfo4', name: 'clientinfo4', component: clientinfo4},
    {path: '/clientinfo5', name: 'clientinfo5', component: clientinfo5},


    //客户业务信息

    {path: '/clientYewuone', name: 'clientYewuone', component: clientYewuone},
    {path: '/clientYewutwo', name: 'clientYewutwo', component: clientYewutwo},
    {path: '/clientYewuthree', name: 'clientYewuthree', component: clientYewuthree},
    //客户价值
    {path: '/clientgongxianone', name: 'clientgongxianone', component: clientgongxianone},
    {path: '/clientgongxiantwo', name: 'clientgongxiantwo', component: clientgongxiantwo},
    //零售客户营销
    {path: '/clientYingone', name: 'clientYingone', component: clientYingone},
    {path: '/clientYingtwo', name: 'clientYingtwo', component: clientYingtwo},
    //对公
    {path: '/publicInform', name: 'publicInform', component: publicInform},
    {path: '/publicCont', name: 'publicCont', component: publicCont},
    //对公客户基础
    {path: '/publicjichu', name: 'publicjichu', component: publicjichu},
    {path: '/credentials', name: 'credentials', component: credentials},
    {path: '/publicCunKuan', name: 'publicCunKuan', component: publicCunKuan},
    {path: '/publicGuQuan', name: 'publicGuQuan', component: publicGuQuan},
    {path: '/publicinfo1', name: 'publicinfo1', component: publicinfo1},
    {path: '/publicDaiKuan', name: 'publicDaiKuan', component: publicDaiKuan},
    {path: '/publicgongxiantwo', name: 'publicgongxiantwo', component: publicgongxiantwo},
    {path: '/publicinfo2', name: 'publicinfo2', component: publicinfo2},
    {path: '/publicYewuone', name: 'publicYewuone', component: publicYewuone},
    {path: '/publicYewutwo', name: 'publicYewutwo', component: publicYewutwo},
    {path: '/publicYewuthree', name: 'publicYewuthree', component: publicYewuthree},
    {path: '/publicgongxianone', name: 'publicgongxianone', component: publicgongxianone},
    {path: '/astronomyCustomers', name: 'astronomyCustomers', component: astronomyCustomers},
    {path: '/publiclawsuit', name: 'publiclawsuit', component: publiclawsuit},
    //目标达成
    {path: '/reachMain', name: 'reachmain', component: Reachgoal},
    {path: '/GyList', name: 'gylist', component: GyList},
    {path: '/Manager', name: 'manager', component: Manager},
    {path: '/Daikuan', name: 'daikuan', component: DaiKuan},
    {path: '/Fzx', name: 'fzx', component: Fzx},

    //产品
    {path: '/productMainPage', name: 'productMainPage', component: productMainPage},
    {path: '/productDetailPage', name: 'productDetailPage', component: productDetailPage},

    {path: '/morningSession', name: 'morningSession', component: morningSession},
    {path: '/morningSessionfff', name: 'morningSessionfff', component: morningSessionfff},
    {path: '/morningS', name: 'morningS', component: morningS},
    {path: '/seeCustomer', name: 'seeCustomer', component: seeCustomer},
    {path: '/seeOther', name: 'seeOther', component: seeOther},
    {path: '/updateNewJob', name: 'updateNewJob', component: updateNewJob},

    //活动策划与发起
    {path: '/activitymain', name: 'activityMain', component: activityMain},
    {path: '/activityDetail', name: 'activityDetail', component: activityDetail},
    {path: '/activityObj', name: 'activityObj', component: activityObj},
    {path: '/annex', name: 'annex', component: annex},
    {path: '/activityGuiding', name: 'activityGuiding', component: activityGuiding},
    {path: '/activityRules', name: 'activityRules', component: activityRules},
    {path: '/rewardDetail', name: 'rewardDetail', component: rewardDetail},

    //高管看板
    {path: '/topMain', name: 'topMain', component: topMain},
    {path: '/toMainHeader', name: 'toMainHeader', component: toMainHeader},
    {path: '/toMainHeader1', name: 'toMainHeader1', component: toMainHeader1},
    {path: '/toMainHeader2', name: 'toMainHeader2', component: toMainHeader2},
    {path: '/toMainHeader3', name: 'toMainHeader3', component: toMainHeader3},
    {path: '/toMainHeader4', name: 'toMainHeader4', component: toMainHeader4},
    {path: '/toMainHeader5', name: 'toMainHeader5', component: toMainHeader5},
    {path: '/echartsBox', name: 'echartsBox', component: echartsBox},
    {path: '/echartsBoxA', name: 'echartsBoxA', component: echartsBoxA},
    {path: '/echartsBoxA1', name: 'echartsBoxA1', component: echartsBoxA1},
    {path: '/echartsBoxAA1', name: 'echartsBoxAA1', component: echartsBoxAA1},
    {path: '/echartsBoxAAA1', name: 'echartsBoxAAA1', component: echartsBoxAAA1},
    {path: '/echartsBoxB', name: 'echartsBoxB', component: echartsBoxB},
    {path: '/echartsBoxBxq', name: 'echartsBoxBxq', component: echartsBoxBxq},
    {path: '/echartsBoxBB', name: 'echartsBoxBB', component: echartsBoxBB},
    {path: '/echartsBoxBBxq', name: 'echartsBoxBBxq', component: echartsBoxBBxq},
    {path: '/echartsBoxC', name: 'echartsBoxC', component: echartsBoxC},
    {path: '/echartsBoxCxq', name: 'echartsBoxCxq', component: echartsBoxCxq},
    {path: '/echartsBoxCC', name: 'echartsBoxCC', component: echartsBoxCC},
    {path: '/echartsBoxCCxq', name: 'echartsBoxCCxq', component: echartsBoxCCxq},
    {path: '/echartsBoxD', name: 'echartsBoxD', component: echartsBoxD},
    {path: '/echartsBoxDxq', name: 'echartsBoxDxq', component: echartsBoxDxq},
    {path: '/echartsBoxDD', name: 'echartsBoxDD', component: echartsBoxDD},
    {path: '/echartsBoxDDxq', name: 'echartsBoxDDxq', component: echartsBoxDDxq},

    //更多模块
    {path: '/moreMainPage', name: 'moreMainPage', component: moreMainPage},
    {path: '/ActivityList', name: 'ActivityList', component: ActivityList},
    {path: '/moreInform', name: 'moreInform', component: moreInform},
    {path: '/moreMarketing', name: 'moreMarketing', component: moreMarketing},
    {path: '/morePurposePage', name: 'morePurposePage', component: morePurposePage},
    {path: '/moreMessage', name: 'moreMessage', component: moreMessage},
    {path: '/chooseckpage', name: 'chooseckpage', component: chooseckpage},
    {path: '/chooseyxlrpage', name: 'chooseyxlrpage', component: chooseyxlrpage},
    {path: '/choosepagedk', name: 'choosepagedk', component: choosepagedk},
    {path: '/moreActivityHead', name: 'moreActivityHead', component: moreActivityHead},
    {path: '/moreActivityContDetail', name: 'moreActivityContDetail', component: moreActivityContDetail},
    {path: '/moreLoansDetail', name: 'moreLoansDetail', component: moreLoansDetail},

    {path: '/moreActivity', name: 'moreActivity', component: moreActivity,

      redirect:'/moreActivity/moreActivityCont',
      children:[
        {path: 'moreActivityCont', name: 'moreActivityCont', component: moreActivityCont},
        {path: 'moreLoans', name: 'moreLoans', component: moreLoans},
        {path: 'morePurpose', name: 'morePurpose', component: morePurpose},
        {path: 'moreQianKe', name: 'moreQianKe', component: moreQianKe},
        {path: 'moreTeam', name: 'moreTeam', component: moreTeam},

      ],

    },

//接口报错页面
    {path: '/errPage', name: 'errPage', component: errPage},
  ]
})

