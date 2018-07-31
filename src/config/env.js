/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl;
let routerMode;
const imgBaseUrl = 'https://fuss10.elemecdn.com';

if (process.env.NODE_ENV == 'development') {
	//baseUrl = 'http://221.195.137.135:8081/CRMNewMobile/';
	baseUrl = 'http://192.168.0.215:8080/CRMNewMobile/'
	//baseUrl = 'http://192.168.0.205:8080/CRMNewMobile/';
	routerMode = 'hash'
}else{
	//baseUrl = 'http://221.195.137.135:8081/CRMNewMobile/';
	baseUrl = 'http://192.168.0.205:8080/CRMNewMobile/';
	//baseUrl = 'http://192.168.0.215:8080/CRMNewMobile/'
	routerMode = 'hash'
}
export {
	baseUrl,
	routerMode,
	imgBaseUrl
}
