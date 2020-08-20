var baseUrl = 'http://ajax.frontend.itheima.net';

$.ajaxPrefilter(function (options) {
    options.url = baseUrl + options.url;
    //对需要权限的接口配置头信息
    if(options.url.indexOf('/my/')!== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})