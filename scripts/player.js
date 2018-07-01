var json_file = "Wang-v-Nehwal";
var last_clicked = "none";
function filter(){
  var player = document.getElementById("select_player").selectedIndex;
  clear_json();
  switch(document.getElementById("select_shot").selectedIndex){
    case 1:
    if(player==1) populate_json("Backhand", "Top");
    else if(player==2) populate_json("Backhand", "Bottom");
    else populate_json("Backhand", "all");
    break;
    case 2:
    if(player==1) populate_json("Smash", "Top");
    else if(player==2) populate_json("Smash", "Bottom");
    else populate_json("Smash", "all");
    break;
    case 3:
    if(player==1) populate_json("Fronthand", "Top");
    else if(player==2) populate_json("Fronthand", "Bottom");
    else populate_json("Fronthand", "all");
    break;
    case 4:
    if(player==1) populate_json("Serve", "Top");
    else if(player==2) populate_json("Serve", "Bottom");
    else populate_json("Serve", "all");
    break;
    case 5:
    if(player==1) populate_json("Lob", "Top");
    else if(player==2) populate_json("Lob", "Bottom");
    else populate_json("Lob", "all");
    break;
    default:
    if(player==1) populate_json("all", "Top");
    else if(player==2) populate_json("all", "Bottom");
    else populate_json("all", "all");
    break;
  }
  clean_json();
}

function clear_json(){
  document.getElementById("rally_json").remove();
  var rally_json = document.createElement("div");
  var att1 = document.createAttribute("id");
  att1.value = "rally_json";
  rally_json.setAttributeNode(att1);
  var att2 = document.createAttribute("class");
  att2.value = "clip_frame colelem";
  rally_json.setAttributeNode(att2);
  document.getElementById("u1152").appendChild(rally_json);
}

function clean_json(){
  $.getJSON("output/"+json_file+".json", function(json){
    for(var i = 1; i < json.length; i++){
      var rally_elem = document.getElementById(json[i].Starting_frame-1);
      if(rally_elem !== null)
        if(rally_elem.nextElementSibling.className == "collapsible")
          rally_elem.remove();
    }
  });
}

function printChecked(){
  var items=document.getElementsByName('recommended');
  var jsn = []
  for(var i=0; i<items.length; i++){
    if(items[i].type=='checkbox' && items[i].checked==true){
      var obj = new Object();
      obj.name = (items[i].value).split(" ")[0];
      obj.link  = (items[i].value).split(" ")[1];
      var jsonString= JSON.stringify(obj);
      jsn.push(jsonString)
    }
  }
  // console.log(jsn);
}
function returnChecked(){
  var items=document.getElementsByName('selection');
  var jsn = [];
  for(var i=0; i<items.length; i++){
    if(items[i].type=='checkbox' && items[i].checked==true)
      jsn.push(items[i].value)
  }
  return jsn;
}

function recom_vid_config(i, json){
  var li = document.createElement("li");
  var a = document.createElement("a");
  var att = document.createAttribute("class");
  att.value = "rig-cell";
  a.setAttributeNode(att);
  var att1 = document.createAttribute("id");
  att1.value = json[i].link;
  a.setAttributeNode(att1);
  a.addEventListener("click", function(){
    json_file = this.id;
    document.getElementById("myVideo").remove();
    var new_vid = document.createElement("video");
    var att1 = document.createAttribute("id");
    att1.value = "myVideo";
    new_vid.setAttributeNode(att1);
    var att2 = document.createAttribute("width");
    att2.value = "600";
    new_vid.setAttributeNode(att2);
    var att3 = document.createAttribute("height");
    att3.value = "400";
    new_vid.setAttributeNode(att3);
    var att4 = document.createAttribute("controls");     
    new_vid.setAttributeNode(att4);
    var vid_src = document.createElement("source");
    var att5 = document.createAttribute("src");
    att5.value = "videos/"+this.id+".mp4";                          
    vid_src.setAttributeNode(att5);
    var att6 = document.createAttribute("type");     
    att6.value = "video/mp4";   
    vid_src.setAttributeNode(att6);
    new_vid.appendChild(vid_src);
    document.getElementById("u1212").appendChild(new_vid);
    document.getElementById("rally_json").remove();
    var rally_json = document.createElement("div");
    var att7 = document.createAttribute("class");
    att7.value = "clip_frame colelem";
    rally_json.setAttributeNode(att7);
    var att8 = document.createAttribute("id");     
    att8.value = "rally_json";                          
    rally_json.setAttributeNode(att8);
    document.getElementById("u1152").appendChild(rally_json);
    populate_json("all", "all");
  });
  var img = document.createElement("img");
  var att3 = document.createAttribute("class");     
  att3.value = "rig-img";                           
  img.setAttributeNode(att3);
  var att4 = document.createAttribute("src");       
  att4.value = "video_thumbnails/"+json[i].link+".png";
  img.setAttributeNode(att4);
  var span1 = document.createElement("span");
  var att5 = document.createAttribute("class");      
  att5.value = "rig-overlay";                          
  span1.setAttributeNode(att5);
  var span2 = document.createElement("span");
  var att6 = document.createAttribute("class");      
  att6.value = "rig-text";                          
  span2.setAttributeNode(att6);
  var desc = document.createTextNode(json[i].name);
  span2.appendChild(desc);
  a.appendChild(img);
  a.appendChild(span1);
  a.appendChild(span2);
  li.appendChild(a);
  return li;
}

function populate_json(shot_para, player_para){
  $.getJSON("output/"+json_file+".json", function(json){
    json.sort(function(a, b){
      var keyA = a.Rally_number, keyB = b.Rally_number;
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
    });
    var fr=json[0].frame_rate;
    var vid= document.getElementById("myVideo");
    for (var i = 1; i < json.length; i++) {
      var shot=json[i].Shots;
      var btn = document.createElement("button");
      var node = document.createTextNode("Rally number: " + i);
      btn.appendChild(node);
      var att = document.createAttribute("class");      
      att.value = "collapsible";                           
      btn.setAttributeNode(att);
      var att3 = document.createAttribute("id");      
      att3.value = json[i].Starting_frame-1;                         
      btn.setAttributeNode(att3);
      btn.addEventListener("click", function(){
        if(last_clicked !== "none")
          document.getElementById(last_clicked).nextElementSibling.style.maxHeight = null;
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          vid.pause();
          vid.currentTime=this.id/fr;
          content.style.maxHeight = content.scrollHeight + "px";
        }
        last_clicked = this.id;
      });
      var element = document.getElementById("rally_json");
      element.appendChild(btn);
      var para = document.createElement("div");
      var tbl = document.createElement("table");
      var tr=document.createElement('tr');
      var th1=document.createElement('th');
      var th2=document.createElement('th');
      var th3=document.createElement('th');
      var head1 = document.createTextNode("Shot Number");
      var head2 = document.createTextNode("Player");
      var head3 = document.createTextNode("Shot Type");
      th1.appendChild(head1);
      th2.appendChild(head2);
      th3.appendChild(head3);
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tbl.appendChild(tr);
      for(var j=0;j<shot.length;j++){
        curr_player = shot[j].Shot_type.split("_")[0];
        curr_shot = shot[j].Shot_type.split("_")[1];
        if((shot_para==curr_shot && player_para==curr_player)||(shot_para=="all" && player_para==curr_player)
          ||(shot_para==curr_shot && player_para=="all")||(shot_para=="all" && player_para=="all")){
          var tr=document.createElement('tr');
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
          var para_txt = document.createTextNode(shot[j].Shot_number);
          var para_txt2 = document.createTextNode(curr_player);
          var para_txt3 = document.createTextNode(curr_shot);
          td1.appendChild(para_txt);
          td2.appendChild(para_txt2);
          td3.appendChild(para_txt3);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tbl.appendChild(tr);
          para.appendChild(tbl);
          var att1 = document.createAttribute("class");     
          att1.value = "content";                           
          para.setAttributeNode(att1);
          element.appendChild(para);
          var att4 = document.createAttribute("id");       
          att4.value = shot[j].Starting_frame;                         
          tr.setAttributeNode(att4);
          tr.addEventListener("click", function(){
            vid.currentTime=this.id/fr;
            vid.play();
          });
        }
      }
    }
  });
  //document.getElementById("myVideo").scrollIntoView();
}

function compare_matches(data1){
  window.fetch("/compare", {method: 'POST', body: JSON.stringify(data1),
  headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(res => {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title:{
        text: "Playing Style Comparison"
      },  
      axisY: {
        title: "Style %",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC"
      },
      toolTip: {
        shared: true
      },
      data: res.points
    });
    chart.render();
    function toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  });
}



function match_avg(){
  window.fetch("/avg", {method: 'POST', body: JSON.stringify(["shivam"]),
  headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(res => {
    console.log(res);
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Forehand', res.forehand],
      ['Backhand', res.backhand],
      ['Lob', res.lob],
      ['Smash', res.smash],
      ]);
      var options = {'title':'Playing style', 'width':400, 'height':400};
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }
    document.getElementById("duration").innerHTML=res.duration;
    document.getElementById("weight").innerHTML=res.weight;
    document.getElementById("calories").innerHTML=res.calories;
    document.getElementById("speed").innerHTML=res.speed;
    document.getElementById("reaction").innerHTML=res.reaction;
    document.getElementById("heart_rate").innerHTML=res.heart_rate;
  });
}



function match_latest(){
  window.fetch("/latest", {method: 'POST', body: JSON.stringify(["shivam"]),
  headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(res => {
    console.log(res);
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Forehand', res.forehand],
      ['Backhand', res.backhand],
      ['Lob', res.lob],
      ['Smash', res.smash],
      ]);
      var options = {'title':'Playing style', 'width':400, 'height':400};
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }
    document.getElementById("duration").innerHTML=res.duration;
    document.getElementById("weight").innerHTML=res.weight;
    document.getElementById("calories").innerHTML=res.calories;
    document.getElementById("speed").innerHTML=res.speed;
    document.getElementById("reaction").innerHTML=res.reaction;
    document.getElementById("heart_rate").innerHTML=res.heart_rate;
    document.getElementById("doc_recom").innerHTML=res.doc_recom;
  });
}


window.onload = function(){

  // $.getJSON("recommendations/library.json", function(json) {
  //   for (var i = 0; i < json.length; i++) {
  //     var li = recom_vid_config(i, json);
  //     var chk = document.createElement("input");
  //     var att7 = document.createAttribute("name");       
  //     att7.value = "recommended";                           
  //     chk.setAttributeNode(att7);
  //     var att8 = document.createAttribute("type");      
  //     att8.value = "checkbox";                          
  //     chk.setAttributeNode(att8);
  //     var att9 = document.createAttribute("value");       
  //     att9.value = json[i].name+" "+json[i].link;
  //     chk.setAttributeNode(att9);
  //     li.appendChild(chk);
  //     var ul1 = document.getElementById("rig1");
  //     ul1.appendChild(li);
  //   }
  //   var btn = document.createElement("button");
  //   var att11 = document.createAttribute("class");      
  //   att11.value = "button";                          
  //   btn.setAttributeNode(att11);
  //   var att12 = document.createAttribute("onclick");       
  //   att12.value = "printChecked()";                           
  //   btn.setAttributeNode(att12);
  //   var desc = document.createTextNode("Recommend selected videos");
  //   btn.appendChild(desc);
  //   document.getElementById("u1011").appendChild(btn);
  // });

  // $.getJSON("recommendations/shivam_recommendations.json", function(json) {
  //   for (var i = 0; i < json.length; i++)
  //     document.getElementById("rig").appendChild(recom_vid_config(i, json));
  // });

  populate_json("all", "all");




  match_latest();




  var modal = document.getElementById('compare_popup');
  var btn = document.getElementById("compare_btn");
  var span = document.getElementsByClassName("close")[0];
  btn.onclick = function() {
    window.fetch("/match_list", {method: 'POST', body: JSON.stringify(["shivam"]),
    headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(res => {
      document.getElementById("select_matches").remove();
      var select_matches = document.createElement("div");
      var att1 = document.createAttribute("id");       
      att1.value = "select_matches";
      select_matches.setAttributeNode(att1);
      var arr = res.match_list;
      for (var i = 0; i < arr.length; i++) {
        var chk = document.createElement("input");
        var att2 = document.createAttribute("name");       
        att2.value = "selection";                           
        chk.setAttributeNode(att2);
        var att3 = document.createAttribute("type");      
        att3.value = "checkbox";                          
        chk.setAttributeNode(att3);
        var att4 = document.createAttribute("value");       
        att4.value = arr[i];
        chk.setAttributeNode(att4);
        select_matches.appendChild(chk);
        select_matches.appendChild(document.createTextNode(arr[i]));
        var br = document.createElement("br");
        var br2 = document.createElement("br");
        select_matches.appendChild(br);
        select_matches.appendChild(br2);
      }
      document.getElementById("select_matches_wrapper").appendChild(select_matches);
      modal.style.display = "block";
    });
  }
  span.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}
