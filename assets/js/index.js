$(function () {
    getUserInfo();
    //点击退出按钮 实现退出功能
    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
      // 提示用户是否确认退出
      layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
  
        // 关闭 confirm 询问框
        layer.close(index)
      })
    })
})
//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //渲染用户信息
            renderUserData(res.data)
        }
    })
}
//渲染用户信息
function renderUserData(user) {
    //如果有昵称就优先显示昵称
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp' + name)
    //头像
    if (user.user_pic) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.user-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        $('.user-avatar').html(name[0].toUpperCase())
    }

}