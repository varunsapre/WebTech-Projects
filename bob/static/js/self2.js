$(document).ready(function()
{
	mini()
	$(".minimize").click(mini)
	$("#side_logout")
		.click(function(){
			$("#sidebar ul li").each(function(){$(this).css("opacity",'0.5')})
			$(this).css("opacity",'1')
			 	window.location.href ='/login'
		})
	$("#side_artist")
		.click(function(){
			$("#sidebar ul li").each(function(){$(this).css("opacity",'0.5')})
			$(this).css("opacity",'1')
			$("#main_container").load("/artists").hide().fadeIn(1500)
		})
	$("#side_album")
		.click(function(){
			$("#sidebar ul li").each(function(){$(this).css("opacity",'0.5')})
			$(this).css("opacity",'1')
			$("#main_container").load("/albums").hide().fadeIn(1500)
		})
	$("#side_song")
		.click(function(){
			$("#sidebar ul li").each(function(){$(this).css("opacity",'0.5')})
			$(this).css("opacity",'1')
			$("#main_container").load("/songs").hide().fadeIn(1500)
		})
	/*$(".brand-logo")
		.click(function(){
			$("#main_container").load("/splash").hide().fadeIn(1500)
		})
	*/
	function mini(){
		$("#sidebar")
			.css('width','3.75vw')
			.css(' -webkit-transition','width 0.03s')
			.css( 'transition', 'width 0.03s')
		$(".sidebar_icon")
			.css("height","2vw")
			.css("margin-bottom","1.25vw")
			.css("margin-left","0.5vw")

		$(".mini").css({
				"-webkit-transform": "rotate(180deg)",
				"-moz-transform": "rotate(180deg)",
				"transform": "rotate(180deg)" 
			    });
		$(".sidelist").each(function(){$(this).hide()})
		//$("#main_container").css("left","7.5vw")
		$(".minimize").addClass("maximize")
		$(".maximize").removeClass("minimize")
		$(".maximize").click(maxe)
	}
	
	function maxe(){
		$("#sidebar")
			.css('width','12vw')
		$(".sidebar_icon")
			.css("height","2vw")
			.css("margin-bottom","0")
			.css("margin-left","0")
		$(".mini").css({
			"-webkit-transform": "rotate(0deg)",
			"-moz-transform": "rotate(0deg)",
			"transform": "rotate(0deg)" 
		    });
		$(".sidelist").each(function(){$(this).show()})

		//$("#main_container").css("left","14vw")
		$(".maximize").addClass("minimize")
		$(".minimize").removeClass("maximize")
		$(".minimize").click(mini)
	}
});

