var video = document.getElementById("video");
var videoSrcInHls = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

document.getElementById("button2").onclick = function() {fillStats()};

if(Hls.isSupported()) {
  var hls = new Hls();
  document.getElementById("format").innerHTML = "";
}
else{
  error();
}

playVideo();

function playVideo(){
  //resetStats();
  hls.loadSource(videoSrcInHls);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED,function() {
    console.log("manifest loaded, found " + data.levels.length + " quality level");
    video.play();
  });
} 
  
function addSourceToVideo(element, src, type) {
  var source = document.createElement('source');
  source.src = src;
  source.type = type;
  element.appendChild(source);
}

function resetStats(){
  error("");
  document.getElementById("bitrate").innerHTML = "Bitrate: "; 
  document.getElementById("height").innerHTML = "Height: ";
  document.getElementById("width").innerHTML = "Width: ";
  document.getElementById("videoCodec").innerHTML = "Video codec ";
  document.getElementById("audioCodec").innerHTML = "Audio codec: ";
}

function fillStats(lev){
    error("loading new resolution");
    hls.on(Hls.Events.LEVEL_SWITCHED,function() {
    try{
      console.log(lev);
      document.getElementById("bitrate").innerHTML = "Bitrate: " + hls.levels[lev].bitrate;
      document.getElementById("height").innerHTML = "Height: " + hls.levels[lev].height;
      document.getElementById("width").innerHTML = "Width: " + hls.levels[lev].width;
      document.getElementById("videoCodec").innerHTML = "Video codec " + hls.levels[lev].videoCodec;
      document.getElementById("audioCodec").innerHTML = "Audio codec: " + hls.levels[lev].audioCodec;
      error("");
    }
    catch{
      error("Unable to read video properties");
    }
    });
 }

function choice(){
  var selected = document.getElementById('dropdown-content').value;
  resetStats();
  if ( selected == "P" ){
    document.getElementById("title").innerHTML = "Parkour";
    videoSrcInHls = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
    document.getElementById("userinput").value = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
    playVideo();
  }   
  else if( selected == "B" ){
    document.getElementById("title").innerHTML = "Big Buck Bunny";
    videoSrcInHls = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
    document.getElementById("userinput").value = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
    playVideo();
  }
  else if ( selected == "H" ){
    document.getElementById("title").innerHTML = "Dunno";
    videoSrcInHls = "https://playertest.longtailvideo.com/adaptive/artbeats/manifest.m3u8";
    document.getElementById("userinput").value = "https://playertest.longtailvideo.com/adaptive/artbeats/manifest.m3u8";
    playVideo();
  }
  else{
    document.getElementById("title").innerHTML = "";
    document.getElementById("userinput").value = "";
    resetStats();
  }
}

function choiceButton(){
  var selected = document.getElementById('dropdown-content').value;
  if( selected == "custom" ){
    var userInput = document.getElementById("userinput");
    if (userInput && userInput.value) {
      videoSrcInHls = userInput.value;
      playVideo();
    }
    else{
      error("This file is not supported or browser do not support HLS");
    }
  }
  else{
    error("Check 'Custom URL' in 'Check content' :)");
  }
}

function error(name){
  document.getElementById("format").innerHTML = name;
}