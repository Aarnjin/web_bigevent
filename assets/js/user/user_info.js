$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称1-6个字符之间'
            }
        }
    })

    initUserInfo()

    $('#btnReset').on('click',function(e){
        // 阻止默认重置行为
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit',function(e){
        // 阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                //调用父页面中的方法重新渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })

})
// 初始化用户信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            console.log(res);
            // 调用form.val()快速赋值
            form.val('formUserInfo',res.data)
        }
    })
}
