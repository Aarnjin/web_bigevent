$(function(){
    getUserInof()
    var layer = layui.layer
    // 点击按钮实现退出功能
    $('#btnLogout').on('click',function(){
    //    提示用户是否确认退出
    // layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 清空本地存储中的token
        localStorage.removeItem('token')
        location.href = '/login.html'
    //     layer.close(index);
    //   });

    })

})
// 获取用户基本信息
function getUserInof(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers就是请求配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token')||''

        // },
        success:function(res){
            if(res.status !== 0){
                // layui.layer.msg('获取用户信息失败')
                console.log('获取用户信息失败');
            }
            // 调用渲染用户头像
            else
             renderAvatar(res.data)
        },
        // 不论成功还是失败都会调用complete函数
        // complete:function(res){
        //     console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
    function  renderAvatar(user){
        // 获取用户名称
        var name = user.nickname || user.username
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp&nbsp'+name)
        // 按需渲染用户头像
        if(user.user_pic !== null){
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()
        }
        else{
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
    }
    }
}