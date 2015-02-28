var $ = jQuery.noConflict();
$(function(){
    $('.form').find('input, select, textarea').on('touchstart mousedown click', function(e){
        e.stopPropagation();
    })
})
var swiperParent = new Swiper('.swiper-parent',{
	pagination: '',
	paginationHide:true,
	allowSwipeToPrev:false,
	allowSwipeToNext:false,
	paginationClickable: true,
	onSlideChangeEnd : function() {
	  //Do something when you touch the slide
	  if (swiperParent.activeIndex != 0){
	  $('#header').animate({'top':'0px'},400);
	  }
	  if (swiperParent.activeIndex == 0){
	  $('#header').animate({'top':'-100px'},400);
	  }  
	}
})

$('.menu').find('li a').each(function (i) {
	var pageId = $(this).parent().attr('page-id');
	if(pageId == 'category-list'){
		$(this).attr('onclick', 'swiperParent.swipeTo(3)');
	}else{
		$(this).attr('onclick', 'swiperParent.swipeTo(' + pageId + ')');	
	}
    
});

//Scroll Containers
function swipernested(){
	$('.swiper-nested').each(function(){
		var swipernested = $(this).swiper({
			mode:'vertical',
			scrollContainer: true,
			mousewheelControl: true,
			updateOnImagesReady:true,
			scrollbar: {
				container:$(this).find('.swiper-scrollbar')[0]
			}
		})

		$(".scrolltop").click(function() {					  
			swipernested.swipeTo(0);
		})
		$(".trigger").click(function(){
			function fixheighttrigger()
			{
				swipernested.reInit();
				setTimeout(fixheighttrigger, 1000);
			}
			setTimeout(fixheighttrigger, 1000);	
		});
		$(".trigger_blog").click(function(){
			function fixheighttoogle()
			{
				swipernested.reInit();
				setTimeout(fixheighttoogle, 1000);
			}
			setTimeout(fixheighttoogle, 1000);
		});
		$(".tabsmenu li").click(function(){
			function fixheight()
			{
				swipernested.reInit();
				setTimeout(fixheight, 1000);
			}
	        setTimeout(fixheight, 1000);
		});
		$("#loadMore").click(function(){
			function fixheightposts()
			{
				swipernested.reInit();
				setTimeout(fixheightposts, 1000);
			}
	        setTimeout(fixheightposts, 1000);
		});
		
		$(".post_details_page li").hide();
		$(".posts li").click(function(){
		
			p_ID = this.id;
			
			$(".post_details_page").find("li").each(function() { 
				if(this.id == p_ID)
				{
					$(".posts_archive_page").hide(); 
					var detailspostid = $(".post_details_page li#" + this.id);
					detailspostid.show();
					swipernested.reInit();
					swipernested.swipeTo(0);
					$('.backtoblog').click(function(){
						 detailspostid.hide();
						 $(".posts_archive_page").show();
						 swipernested.reInit();
					});
					
				}
		
				
			});
		
		});

		
	})	
}
swipernested();

$('.gohome').click(function(){
 	swiperParent.swipeTo(0);
});
jQuery(function($) {
	$("#CommentForm").validate({
		submitHandler: function(form) {
		ajaxContact(form);
		return false;
	}
});
$(".swipebox").swipebox();
});
$(function() {
	generateCategoryPage();
	generateCategoryList()


	$('#tabsmenu').tabify();
	$(".videocontainer").fitVids();
	$(".toggle_container").hide();
	$(".toggle_container_blog").hide();
	$(".trigger").click(function(){
	   $(this).toggleClass("active").next().slideToggle("slow");
		return false;
	});
	$(".trigger_blog").click(function(){
		$(this).toggleClass("activeb").next().slideToggle("slow");
		return false;
	});
	$(".post_more").click(function(){
		$(this).toggleClass("activep").next().slideToggle("slow");
		return false;
	});
});
/*html generate class*/
function generateCategoryPage(){
	category = getCategory();
	var el = $('.menu');
	var html ='';
	html += '<ul>';
	for(i=0; i<category.length; i++){
		html += '<li page-id="category-list">';
		html += '<a href="#" onclick="generatePostList('+category[i].id+')">';
		html += '<img src="'+category[i].icon+'" alt="" title="">';
		html += '<span>'+category[i].title+'</span></a>';
		html += '</li>';
	}
	html += '</ul>';
	el.append(html);
}
function generateCategoryList(){
	var el = $('.listing_detailed');
	var html ='';
	for(i=0; i<category.length; i++){
		html += '<li page-id="'+category[i].id+'">';
		html += '<a href="#">'+category[i].title+'</a>';
		html += '</li>';
	}
	el.html(html);
}
function generatePostList(cat_id){
	$('.goback').hide();
	articles = getArticles(cat_id);
	var el = $('.post-list');
	var html ='';
	for(i=0; i<articles.length; i++){
		html += '<li post-id="'+articles[i].id+'">\
			<div class="post-title"><img src="images/noImage-p.jpg" ><span>'+articles[i].title+'</span></div>\
			<div class="full-img">\
				<img src="images/content-img/'+articles[i].photo_file_name+'">\
				<div class="image-caption">'+articles[i].title+'</div>\
			</div>\
		</li>'
	}
	el.html(html);
	$('.post-list').click(function(){
		var postId = $(this).attr('post-id');
		swiperParent.swipeTo(2);
		$('.goback').show();
		$('.goback').click(function(){
		 	swiperParent.swipeTo(1);
		 	$('.goback').hide();
		});
	})

	var swiperpost = $('.swiper-post').swiper({
			mode:'vertical',
			scrollContainer: true,
			mousewheelControl: true,
			scrollbar: {
				container:$('.swiper-post').find('.swiper-scrollbar')[0]
			}
		})
	swiperParent.swipeTo(1);
	
}

/*json parse class*/
function getCategory(){
	var category = data.categories;
	return category;
}
function getArticles(cat_id){
	var articles = data.articles;
	return articles;
}
