$(function(){
    //获取文章分类列表
    initArtCateList()


    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var thmlStr = template('tpl-table',res)
                $('tbody').html(thmlStr)
            }
        })
    }
    // 为添加类别按钮绑定点击事件
    var index=null
    $('#btnAddCate').on('click',function(){
    
        var layer = layui.use('layer', function(){
           
            return layui.layer
          }); 
          index = layer.open({
            type:1,
            area:['500px','250px'],
            title:'添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    // 通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/adddcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                // 根据索引关闭弹出 层
                layer.close(index)
            }
        })
    })

})