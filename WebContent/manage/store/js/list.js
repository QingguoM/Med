$(function(){
	var reqdata = {
			code : $('#medcode').val(),
			name : $('#medname').val(),
			operatorType : 0
	};
	var medRequest = new MedRequest("IN01",reqdata); 
	medRequest.callServer().done(function(resp){
		if(resp.RETCODE == '0000000'){
			render('content',resp.DATA);
			$('#query').on(function(reqobj){
				queryStoreOne(reqobj.id);
			});
			
		}else{
			layer.alert(resp.RETMSG,{yes:function(index){
				layer.closeAll();
				location.href="list.html";
			}});
		}
	}).fail(function(resp){
		layer.alert(resp.RETMSG,{yes:function(index){
			layer.closeAll();
			location.href="../index.html";
		}});
	});
});

/**
 * 详情某一库存订单
 */
//TODO
function queryStoreOne(reqobj){
	location.href="query.html";
	var reqdata = {
			id:reqobj.id
	};
	var medRequest = new MedRequest("IN01",reqdata); 
	medRequest.callServer().done(function(resp){
		/*layer.alert(resp.RETMSG,{yes:function(index){
			layer.closeAll();
			location.href="list.html";
		}});*/
		layer.alert();
	}).fail(function(resp){
		layer.alert(resp.RETMSG,{yes:function(index){
			layer.closeAll();
			location.href="list.html";
		}});
	});
}

/**
 * 删除某一库存订单
 */
function deleteStoreOne(reqobj){
	var reqdata = {
			id:reqobj.id,
			operatorType: 1
	};
	var medRequest = new MedRequest("IN01",reqdata); 
	medRequest.callServer().done(function(resp){
		//TODO
	}).fail(function(resp){
		layer.alert(resp.RETMSG,{yes:function(index){
			layer.closeAll();
			location.href="list.html";
		}});
	});
}