$(function(){
    // 点击去注册账号的连接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录连接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从layui中获取form对象
     var form = layui.form
     var layer = layui.layer
     form.verify(
         {
            //  自定义了一个pwd校验规则
             'pwd': [
                /^[\S]{6,12}$/
                ,'密码必须6到12位，且不能出现空格'
              ] ,
            //   校验两次秘密是否一致
              repwd:function(value){
                //   通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 再进行等于判断
                // 判断失败返回一个提示消息
                var pwd = $('.reg-box [name=password]').val()
                if(pwd !== value){
                    return '两次密码不一致'
                }
              }
         }
     )

    //  监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
    // 阻止表单默认提交行为
    e.preventDefault()
    $.post('/api/reguser',{
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()
    },function(res){
        if(res.status !== 0){

            return layer.msg(res.message)
        }
        // layer.msg('注册成功,请登录')
        $('#link_login').click()
    })
})
// 监听登录提交事件
$('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'post',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !==0){
                return console.log('登录失败')
                // layer.msg('登录失败')
            }
            // layer.msg('登录成功')
            console.log('登录成功',res.token)
            // 将登录成功得到的token字符串保存到localStorage中
            localStorage.setItem('token',res.token)
            location.href = '/index.html'
        }
    })
})

})