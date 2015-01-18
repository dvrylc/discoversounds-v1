function research(t){$("#artist-input").val(t).trigger("enterKey")}function reset(){$(".artist").remove(),spinner.stop(),$("#artist-input").val("").focus()}var spinner,target,opts;$(document).ready(function(){opts={lines:8,length:1,width:8,radius:16,corners:1,rotate:0,direction:1,color:"#FFC107",speed:1,trail:25,shadow:!1,hwaccel:!0,className:"spinner",zIndex:2e9,top:"50%",left:"50%"},target=document.getElementsByTagName("body")[0],spinner=new Spinner(opts),$("#artist-input").focus()}),$("#artist-input").bind("enterKey",function(){$(this).blur(),spinner.stop(),spinner.spin(target),$(".error-message").hide(),$(".artist").remove();var t=encodeURIComponent(this.value);$.ajax({type:"GET",url:"https://api.spotify.com/v1/search?q="+t+"&type=artist&limit=1",dataType:"json",success:function(t){if(t.artists.items[0]){var e=t.artists.items[0].id;$.ajax({type:"GET",url:"https://api.spotify.com/v1/artists/"+e+"/related-artists",dataType:"json",success:function(t){var e=t.artists;if(e.length>0){for(var s=0;s<e.length;s++){var i="";try{i=e[s].images[0].url}catch(r){i="img/error.png"}$(".content").append('<div class="artist"><img src="'+i+'"><div class="layover"><h2>'+e[s].name+'</h2><a href="javascript:void(0)" onClick="research(\''+e[s].name+'\');"><img src="img/outlets/research.png" alt="New search" class="tooltip" title="New search"></a><a href="https://www.youtube.com/results?search_query='+encodeURIComponent(e[s].name)+'" alt="YouTube" target="_blank"><img src="img/outlets/youtube.png" alt="YouTube" class="tooltip" title="YouTube"></a><a href="https://play.spotify.com/search/'+encodeURIComponent(e[s].name)+'" alt="Spotify Web" target="_blank"><img src="img/outlets/spotify-web.png" alt="Spotify Web" class="tooltip" title="Spotify Web"></a><a href="spotify:search:'+encodeURIComponent(e[s].name)+'" alt="Spotify App" target="_blank"><img src="img/outlets/spotify-app.png" alt="Spotify App" class="tooltip" title="Spotify App"></a><a href="http://en.wikipedia.org/wiki/'+encodeURIComponent(e[s].name)+'" alt="Wikipedia" target="_blank"><img src="img/outlets/wikipedia.png" alt="Wikipedia" class="tooltip" title="Wikipedia"></a></div></div>')}var a=$(".artist").width();$(".artist").css("height",a+"px"),$(".artist img").each(function(){$(this).load(function(){$(this).addClass($(this).width()>=$(this).height()?"landscape":"portrait"),$(this).fadeIn()})}),$(".artist").hover(function(){$(".layover",this).fadeToggle("fast")}),$(".tooltip").tooltipster({position:"bottom",onlyOne:!0,speed:200,delay:0})}else $(".error-message").html("<h3>Error: No related artists were found.</h3>"),$(".error-message").show();spinner.stop()}})}else spinner.stop(),$(".error-message").html("<h3>Error: The artist that you entered was not found.</h3>"),$(".error-message").show()},error:function(){spinner.stop(),$(".error-message").html("<h3>Error: You have entered an invalid artist.</h3>"),$(".error-message").show()}})}),$("#artist-input").keyup(function(t){13===t.keyCode&&$(this).trigger("enterKey")});