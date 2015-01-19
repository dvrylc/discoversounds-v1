function research(t){$("#artist-input").val(t).trigger("enterKey")}function reset(){$(".artist").remove(),spinner.stop(),$("#artist-input").val("").focus()}var spinner,target,opts;$(document).ready(function(){opts={lines:8,length:1,width:8,radius:16,corners:1,rotate:0,direction:1,color:"#FFC107",speed:1,trail:25,shadow:!1,hwaccel:!0,className:"spinner",zIndex:2e9,top:"50%",left:"50%"},target=document.getElementsByTagName("body")[0],spinner=new Spinner(opts),$("#artist-input").focus()}),$("#artist-input").bind("enterKey",function(){$(this).blur(),spinner.stop(),spinner.spin(target),$(".error-message").hide(),$(".artist").remove();var t=this.value.trim(),e=encodeURIComponent(t);$.ajax({type:"GET",url:"https://api.spotify.com/v1/search?q="+e+"&type=artist&limit=5",dataType:"json",success:function(e){var r=null;if(e.artists.items[0])for(var s=0;s<e.artists.items.length;s++)e.artists.items[s].name.toUpperCase()===t.toUpperCase()&&(r=e.artists.items[s].id);null!==r?$.ajax({type:"GET",url:"https://api.spotify.com/v1/artists/"+r+"/related-artists",dataType:"json",success:function(t){var e=t.artists;if(e.length>0){for(var r=0;r<e.length;r++){var s="";try{s=e[r].images[0].url}catch(a){s="img/error.png"}$(".content").append('<div class="artist"><img src="'+s+'"><div class="layover"><h2>'+e[r].name+'</h2><a href="javascript:void(0)" onClick="research(\''+e[r].name+'\');"><img src="img/outlets/research.png" alt="New search" class="tooltip" title="New search"></a><a href="https://www.youtube.com/results?search_query='+encodeURIComponent(e[r].name)+'" alt="YouTube" target="_blank"><img src="img/outlets/youtube.png" alt="YouTube" class="tooltip" title="YouTube"></a><a href="http://en.wikipedia.org/wiki/'+encodeURIComponent(e[r].name)+'" alt="Wikipedia" target="_blank"><img src="img/outlets/wikipedia.png" alt="Wikipedia" class="tooltip" title="Wikipedia"></a><br><a href="spotify:search:'+encodeURIComponent(e[r].name)+'" alt="Spotify" target="_blank"><img src="img/outlets/spotify.png" alt="Spotify" class="tooltip" title="Spotify"></a><a href="http://www.rdio.com/artist/'+encodeURIComponent(e[r].name)+'" alt="Rdio" target="_blank"><img src="img/outlets/rdio.png" alt="Rdio" class="tooltip" title="Rdio"></a><a href="http://grooveshark.com/#!/'+e[r].name.split(" ").join("_")+'" alt="Grooveshark" target="_blank"><img src="img/outlets/grooveshark.png" alt="Grooveshark" class="tooltip" title="Grooveshark"></a></div></div>')}var i=$(".artist").width();$(".artist").css("height",i+"px"),$(".artist img").each(function(){$(this).load(function(){$(this).addClass($(this).width()>=$(this).height()?"landscape":"portrait"),$(this).fadeIn()})}),$(".artist").hover(function(){$(".layover",this).fadeToggle("fast")}),$(".tooltip").tooltipster({position:"bottom",onlyOne:!0,speed:200,delay:0})}else $(".error-message").html("<h3>Error: No related artists were found.</h3>"),$(".error-message").show();spinner.stop()}}):(spinner.stop(),$(".error-message").html("<h3>Error: The artist that you entered was not found.</h3>"),$(".error-message").show())},error:function(){spinner.stop(),$(".error-message").html("<h3>Error: You have entered an invalid artist.</h3>"),$(".error-message").show()}})}),$("#artist-input").keyup(function(t){13===t.keyCode&&$(this).trigger("enterKey")});