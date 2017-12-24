//轮播
$(()=>{
var $ulImgs=$("#banner>.banner-img"),
		$ulInds=$("#banner>.indicators"),
	  LIWIDTH=960,INTERVAL=500,WAIT=3000,
	  moved=0,timer=null,canMove=true;
$.get("data/routes/products/getCarousel.php")
	.then(data=>{
	var html="";
	for(var c of data){
		html+=`
			<li>
				<a href="${c.href}" title="${c.title}">
					<img src="${c.img}">
				</a>
			</li> 	
		`;
	}
	html+=`
		<li>
			<a href="${data[0].href}" title="${data[0].title}">
				<img src="${data[0].img}">
			</a>
		</li> `;
	$ulImgs.html(html)
		 .css("width",(data.length+1)*LIWIDTH);
	$ulInds.html("<li></li>".repeat(data.length))
		     .children().first().addClass("hover");
	function autoMove(){
		if(canMove){
			if(moved==data.length){//先判断是否最后一张
				moved=0;//将moved归0
				$ulImgs.css("left",0);//将ul的left瞬间归0
			}
			timer=setTimeout(()=>{//先等待WATI秒
				move(1,autoMove);
			},WAIT);
		}
	}
	autoMove();
	$("#banner").hover(
		()=>{//关闭轮播的开关变量
			canMove=false;
			clearTimeout(timer);//停止等待
			timer=null;
		},
		()=>{//打开轮播开关，启动自动轮播
			canMove=true;
			autoMove();
		}
	);
	$ulInds.on("click","li",e=>{
		moved=$(e.target).index();
		$ulImgs.stop(true).animate({
			left:-LIWIDTH*moved
		},INTERVAL);
		$ulInds.children(":eq("+moved+")")
					.addClass("hover")
					.siblings().removeClass("hover");
	});
	function move(dir,callback){
		moved+=dir;//按照方向增减moved
		//如果moved没有到头
		if(moved<data.length){
			//让ulInds中moved位置的li设置hover
			$ulInds.children(":eq("+moved+")")
						.addClass("hover")
						.siblings().removeClass("hover");
		}else{//否则，如果到头了
			//让ulInds中第一个li设置为hover
			$ulInds.children(":eq(0)")
						.addClass("hover")
						.siblings().removeClass("hover");
		}
		//先清除ulImgs上动画，让ulImgs移动到新的left位置
		$ulImgs.stop(true).animate({
			//新的left位置永远等于-LIWIDTH*moved
			left:-LIWIDTH*moved
		},INTERVAL,callback);
	}
	$("#banner>[data-move=right]").click(()=>{
		if(moved==data.length){
			moved=0;
			$ulImgs.css("left",0);
		}
		move(1);
	});
	$("#banner>[data-move=left]").click(()=>{
		//如果是第一张
		if(moved==0){//就跳到最后一张
			moved=data.length;
			$ulImgs.css("left",-LIWIDTH*moved);
		}
		move(-1);
	})
})
});
//楼层
$(()=>{
	//加载首页商品
	$.get("data/routes/products/index_product.php")
	.then(products=>{
		var html="";
		//遍历recommended数组中的每个商品
		for(var i=0;i<products.recommended.length;i++){
			var p=products.recommended[i];
			if(i<2){
				html+=`
					<div>
						<div class="desc">
							<p class="name">${p.title}</p>
							<p class="details">${p.details}</p>
							<p class="price">¥${p.price}</p>
							<a href="${p.href}" class="view">查看详情</a>
						</div>
						<img src="${p.pic}">
					</div> 
				`;
			}else if(i==2){
				html+=`
					<div>
						<div class="desc">
							<p class="name">${p.title}</p>
							<p class="price">¥${p.price}</p>
							<a href="${p.href}" class="view">查看详情</a>
						</div>
						<img src="${p.pic}">
					</div>	
				`
			}else{
				html+=`
					<div class="product">
						<img src="${p.pic}">
						<p class="name">${p.title}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}">查看详情</a>
					</div>	
				`			
			}
		}
		//遍历结束后
		//设置id为f1下的class为floor-content的div的内容为html
		document.querySelector("#f1>.floor-content")
			      .innerHTML=html;
		html="";
		for(var i=0;i<products.new_arrival.length;i++){
			var p=products.new_arrival[i];
			if(i<2){
				html+=`
					<div>
						<div class="desc">
							<p class="name">${p.title}</p>
							<p class="details">${p.details}</p>
							<p class="price">¥${p.price}</p>
							<a href="${p.href}" class="view">查看详情</a>
						</div>
						<img src="${p.pic}">
					</div> 
				`;
			}else if(i==2){
				html+=`
					<div>
						<div class="desc">
							<p class="name">${p.title}</p>
							<p class="price">¥${p.price}</p>
							<a href="${p.href}" class="view">查看详情</a>
						</div>
						<img src="${p.pic}">
					</div>	
				`
			}else{
				html+=`
					<div class="product">
						<img src="${p.pic}">
						<p class="name">${p.title}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}">查看详情</a>
					</div>	
				`			
			}
		}
		//遍历结束后
		//设置id为f2下的class为floor-content的div的内容为html
		document.querySelector("#f2>.floor-content")
			      .innerHTML=html;
		html="";
		for(var i=0;i<products.top_sale.length;i++){
			var p=products.top_sale[i];
			if(i<2){
				html+=`
					<div>
						<div class="desc">
							<p class="name">${p.title}</p>
							<p class="details">${p.details}</p>
							<p class="price">¥${p.price}</p>
							<a href="${p.href}" class="view">查看详情</a>
						</div>
						<img src="${p.pic}">
					</div> 
				`;
			}else if(i==2){
				html+=`
					<div>
						<div class="desc">
							<p class="name">${p.title}</p>
							<p class="price">¥${p.price}</p>
							<a href="${p.href}" class="view">查看详情</a>
						</div>
						<img src="${p.pic}">
					</div>	
				`
			}else{
				html+=`
					<div class="product">
						<img src="${p.pic}">
						<p class="name">${p.title}</p>
						<p class="price">¥${p.price}</p>
						<a href="${p.href}">查看详情</a>
					</div>	
				`			
			}
		}
		//遍历结束后
		//设置id为f1下的class为floor-content的div的内容为html
		document.querySelector("#f3>.floor-content")
			      .innerHTML=html;

    var $divLift=$("#lift"),
			  $floors=$(".floor");
		//当所有楼层加载完成后
		$(window).scroll(()=>{
			var scrollTop=$(window).scrollTop();
			/*********确定电梯按钮列表是否显示*********/
			//任意元素距body顶部的总距离
			var offsetTop=$("#f1").offset().top;
			if(offsetTop<scrollTop+innerHeight/2)
				$divLift.show();
			else
				$divLift.hide();
			/******具体显示哪个电梯按钮*************/
			for(var f of $floors){
				var $f=$(f);
				var offsetTop=$f.offset().top;
				if(offsetTop<scrollTop+innerHeight/2){
					//找到该楼层对应的li按钮
					var i=$floors.index($f);
					var $li=
						$divLift.find(".lift_item:eq("+i+")");
					//为li添加lift_item_on class
					$li.addClass("lift_item_on")
						//为其兄弟去掉lift_item_on class
						.siblings()
							.removeClass("lift_item_on");
				}
			}
		});
		$divLift.on("click",".lift_item",function(){
			var $li=$(this);//this->li
			if(!$li.is(":last-child")){
				var i=$li.index();//找当前li对应的楼层
				var offsetTop=$floors.eq(i).offset().top;
				//$(window).scrollTop(offsetTop-70)
				//在HTML元素上调用animate
				//document.body.scrollTop||
        //document.documentElement.scrollTop
				$("html,body").stop(true).animate({
					scrollTop:
						$("#header-top").is(".fixed_nav")?
								offsetTop-80:offsetTop-80-80
				},500);
			}else
				$("html,body").stop(true).animate({
					scrollTop:0
				},500);
		})
	})
})//();