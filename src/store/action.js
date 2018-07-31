import {getTestData} from '../service/getData'

import {TEST_DATA} from './mutation-types.js'

import  axios from 'axios'



export default {


	// async getUserInfo({
	// 	commit,
	// 	state
	// }) {
	// 	let res = await getUser();
	// 	commit(GET_USERINFO, res)
	// },
	// async saveAddress({
	// 	commit,
	// 	state
	// }) {
    //
	// 	if(state.removeAddress.length > 0) return;
    //
	// 	let addres = await getAddressList(state.userInfo.user_id);
	// 	commit(SAVE_ADDRESS, addres);
	// },
  async [TEST_DATA]({commit,state}){

    console.log(params);
    let url = 'designHRFB/getSys.action';
    let params ={projectFlag : 'kk'};
      await getTestData(url,params).then((res)=>{
         if(res.status==1001)
         {
           commit(TEST_DATA,res.data);
         }
    });

  },
}
// export const getTopics = ({ dispatch }, params) => {
//   Api.getTopics(params).then(response => {
//     console.log(response.data)
//     dispatch(types.GET_TOPICS_SUCCESS, response.data)
//   }, err => {
//     console.log(err)
//     dispatch(types.GET_TOPICS_FAIL, err)
//   })
// }
