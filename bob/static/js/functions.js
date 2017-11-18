$("document").ready(function(){
    $('#btnsign').click(function() {
        $('#formsign').submit();
    });

    $('#btnlog').click(function(){
   		$('#loginform').submit();
    });
    
	$("#search").keyup(function(){
		//alert(obj2);
		obj2.getSongs();
	});

	$("#search").blur(function(e){
		$("#content").slideUp(200)
		$("#search").val("")
	});	
  	
});

    var Suggest = function()
	
	{
		this.timer  = null;
		temp = this;
		this.search = null;
		temp.container = document.getElementById("content");
		temp.container.style.zIndex = 10000;
		temp.container.setAttribute("class","z-depth-5");
		temp.container.style.display = "block";
		temp.container.style.backgroundColor = "white";
		temp.container.style.color = "#373737";
		temp.container.style.marginTop = "0";
		temp.container.style.maxHeight = "50vh";
		temp.container.style.textAlign = "center";
		temp.container.style.overflow = "auto";
		temp.container.style.position = "relative";
		this.getSongs = function()
		{
			if(this.timer)
			{
				//alert("clearing")
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(this.sendTerm,250);
		}
		
		this.sendTerm = function()
		{	
				
				temp.searchBox = $("#search")
				temp.search = $("#search").val()
				if(temp.search != "")
				{
					$.ajax({
						url: '/search',
						data: {'name':temp.search},
						type: 'GET',
						success: function(response) {
							var res = JSON.parse(response);
							temp.populateFood(res);
						},
						error: function(error) {
							console.log(error);
						}
					});
				}
				else
				{
					$("#content").slideUp(200);
				}

		},
		this.populateFood = function(r){
			temp.container.innerHTML = "";
			if(r.length == 0)
			{
				document.getElementById("search").style.borderColor = "red";
			}

			for(var i = 0;i<r.length;i++)
			{
				d = document.createElement("div");
				d.innerHTML = r[i];
				d.onmouseover = temp.setFood;
				d.onmouseout = temp.remove;
				d.addEventListener("click", temp.select,false);
				temp.container.appendChild(d);
			}

			$("#content").hide().slideDown(200)

		},
		this.setFood = function(e){
			document.getElementById("search").value = e.target.innerHTML;
			e.target.style.backgroundColor = "lightcoral";
			e.target.style.cursor = "pointer";
		},
		this.remove = function(e){
			document.getElementById("search").value = "";
			e.target.style.backgroundColor = "white";
		}
		this.select = function(e){
			//alert(e)
			var song_name = e.currentTarget.innerHTML.split(" ").join("%20");
			$("#search").val("")
			//alert(song_name)
			$("#main_container").load("/select/"+song_name).hide().fadeIn(1500);
			$("#content").slideUp(200);
		}
		
	}

    
	var obj2 = new Suggest()
	function server()
	{
		var source = new EventSource('/stream');
		source.addEventListener("received",function (event) 
			{
				sendNotification(event.data);
			},false)
	}
	function sendNotification(d)
	{
		if(! ('Notification' in window) )
		{
			alert('Sorry, your browser does not support notifications');
			return;
		}	
		
		if(d!="" || d!="\n")
		{
			Notification.requestPermission(function(permission){
			var notification = new Notification("Notification!",{body:d,icon:"../static/images/sp.png" ,dir:'auto'});
			});
		}
	}