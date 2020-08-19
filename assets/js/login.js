$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();

    })
    //自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能有空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })
    //提交表单事件
    $('#form-reg').submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'http://ajax.frontend.itheima.net/api/reguser',
            data:{
                username:$('#form-reg input[name=username]').val(),
                password:$('#form-reg input[name=password]').val(),
            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')

                //手动触发去登录的点击事件
                $('#link_login').click();
                //重置表单
                $('#form-reg')[0].reset();
            }
        })
    })
    //登录功能
    var layer = layui.layer;
    $('#form-login').on('submit',function(e){
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            method:"POST",
            url:'/api/login',
            data: $('#form-login').serialize(),
            success: function(res){
                // console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')

                //保存token（用于有权限接口的身份认证）到本地存储
                localStorage.setItem('token',res.token);
                //跳转到主页
                location.href = '/index.html'

            }
        })
    })

})