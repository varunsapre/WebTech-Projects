tracks = new Array();
index = 0;
playing = false;

function obj(track,name1,length1){
	this.track = track;
	this.name1 = name1;
	this.length1 = length1;
}
$(document).ready(function(){
    $(".song_row").each(function(){
        id = $(this).attr("id");
        kids = $(this).children().text();
        kids = kids.split(" ");
        track = $.trim(kids[1]);
        name = "";
        for (i = 2;i<(kids.length)-2;i++)
        {
            name += kids[i]+" ";
        }
        name = $.trim(name);
        length = $.trim(kids[(kids.length)-2]);
        tracks[parseInt(track)]=new obj(track,name,length);
        //alert(track+" "+length+" "+name);
    })
})
trackCount = tracks.length-1;
mediaPath = "";
audio = $('#audio1').bind('play', function(){
        playing = true;
    }).bind('pause', function () {
        playing = false;
    }).get(0);


btnPrev = $('#btn_prev').click(function (event) {
    event.stopImmediatePropagation();
    index--;
    if(index>=0)
    {
        id_global = curr_song.parentNode.rows[index].id;
        mediaPath = id_global;
        playTrack(index);
    }
    else
    {
        index++;
        alert("No song before this.");
    }
    
});

btnNext = $('#btn_next').click(function (event) {
    event.stopImmediatePropagation();
    //alert($('tr').length);
    index++;
    if(index<($('tr').length)-1)
    {
        id_global = curr_song.parentNode.rows[index].id;
        mediaPath = id_global;
        playTrack(index);       
    }
    else
    {
        index--;
        alert("No song after this.");
    }

});

tr = $('.song_row').click(function () {
    //alert("CLICKED");
    var id = parseInt($(this).index());
    curr_song = this;
    //alert(curr_song.parentNode.rows[curr_song.rowIndex+1].id);
    mediaPath = this.id;
    //alert($('tr').length);
    playTrack(id);

});

loadTrack = function (id) {
    index = id;
    
    name1 = mediaPath.split("/");
   // alert(name1)
    name = name1[name1.length-1].split(".mp3")[0];
    cover = name1.slice(0,name1.length-1)

    cover = cover.join("/") + "/cover.jpg"
    if (cover.includes(' '))
    {
        cover = cover.split(' ').join('%20')
    }
    //cover = cover.replace(",","/")
   // alert(cover)
    document.getElementById("songName_player").innerHTML = name;
    document.getElementById("song_pic").src= cover;
    //document.getElementById("musicplayer").setAttribute('style',"background-image:url("+cover+")")
    audio.src = mediaPath;

};
playTrack = function (id) {
    loadTrack(id);
    audio.play();
};
//loadTrack(index);to view some other thing), the attacker 