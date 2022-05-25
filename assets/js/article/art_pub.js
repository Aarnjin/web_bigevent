$(function(){
    var layer = layui.layer
    var form = layui.form
    // 定义加载文章分类的方法
    initCate()
    function initCate(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                //调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)

                //通知layui重新渲染表单区域的ui结构
                form.render()
            }

        })
    }

    // 调用initEditor方法初始化富文本编辑器
    initEditor()


})