//封装方法  隐藏和显示
function addMask (id,content,masks){
	id.click(function(){
		content.slideDown()
		masks.css("display","block");
	})
}
function deleteMask (id,content,masks){
	id.click(function(){
		content.slideUp()
		setTimeout(function(){
			masks.css("display","none")
		},200)
	})
}
