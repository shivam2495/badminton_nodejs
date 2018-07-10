var json_file, curr_user;

function filter(){
  var player = document.getElementById("select_player").selectedIndex;
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

function clean_json(){
  $.getJSON("output/"+json_file+".json", function(json){
    for(var i = 1; i < json.length; i++){
      var rally_elem = document.getElementById(json[i].Starting_frame-1);
      if(rally_elem !== null && rally_elem.nextElementSibling !== null)
        if(rally_elem.nextElementSibling.className === "collapsible")
          rally_elem.remove();
    }
  });
}

function populate_json(shot_para, player_para){
  document.getElementById("rally_json").remove();
  var rally_json = document.createElement("div");
  var att1 = document.createAttribute("id");
  att1.value = "rally_json";
  rally_json.setAttributeNode(att1);
  var att2 = document.createAttribute("class");
  att2.value = "clip_frame colelem";
  rally_json.setAttributeNode(att2);
  document.getElementById("u1152").appendChild(rally_json);
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
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          vid.pause();
          vid.currentTime=this.id/fr;
          content.style.maxHeight = content.scrollHeight + "px";
        }
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
}

function repaint_video(src){
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
  att5.value = "videos/"+src;
  vid_src.setAttributeNode(att5);
  new_vid.appendChild(vid_src);
  document.getElementById("u1212").appendChild(new_vid);
  json_file = src.split('.')[0];
  populate_json("all", "all");
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
    repaint_video(this.id);
    document.getElementById("myVideo").scrollIntoView();
  });
  var img = document.createElement("img");
  var att3 = document.createAttribute("class");
  att3.value = "rig-img";
  img.setAttributeNode(att3);
  var att4 = document.createAttribute("src");
  att4.value = "video_thumbnails/"+(json[i].link).split('.')[0]+".png";
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

function compare_selected_matches(data1){
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
    var chart1 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      title:{
        text: "Stats Comparison"
      },  
      axisY: {
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC"
      },
      toolTip: {
        shared: true
      },
      data: res.stats
    });
    chart1.render();
    function toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else {
        e.dataSeries.visible = true;
      }
      chart.render();
      chart1.render();
    }
  });
  past_popup.style.display='none';
  compare_popup.style.display='none';
  single_pie.style.display='none';
  chartContainer.style.display='block';
  chartContainer1.style.display='block';
}

function match_avg(){
  window.fetch("/avg", {method: 'POST', body: JSON.stringify([curr_user]),
  headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(res => {
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
      var options = {'title':'Playing style', 'width':500, 'height':300};
      var chart = new google.visualization.PieChart(piechart);
      chart.draw(data, options);
    }
    duration.innerHTML=res.duration;
    weight.innerHTML=res.weight;
    calories.innerHTML=res.calories;
    speed.innerHTML=res.speed;
    reaction.innerHTML=res.reaction;
    heart_rate.innerHTML=res.heart_rate;
  });
  past_popup.style.display='none';
  compare_popup.style.display='none';
  single_pie.style.display='block';
  chartContainer.style.display='none';
  chartContainer1.style.display='none';
}

function match_compare(){
  window.fetch("/match_list", {method: 'POST', body: JSON.stringify([curr_user]),
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
      select_matches.appendChild(document.createTextNode(" "+arr[i]));
      select_matches.appendChild(document.createElement("br"));
      select_matches.appendChild(document.createElement("br"));
    }
    document.getElementById("select_matches_wrapper").appendChild(select_matches);
  });
  past_popup.style.display='none';
  compare_popup.style.display='block';
  single_pie.style.display='none';
  chartContainer.style.display='none';
  chartContainer1.style.display='none';
}

function match_latest(){
  window.fetch("/latest", {method: 'POST', body: JSON.stringify([curr_user]),
  headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(res => {
    repaint_video(res.video_link);
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
      var options = {'title':'Playing style', 'width':500, 'height':300};
      var chart = new google.visualization.PieChart(piechart);
      chart.draw(data, options);
    }
    duration.innerHTML=res.duration;
    weight.innerHTML=res.weight;
    calories.innerHTML=res.calories;
    speed.innerHTML=res.speed;
    reaction.innerHTML=res.reaction;
    heart_rate.innerHTML=res.heart_rate;
    doc_recom.innerHTML=res.doc_recom;
  });
  past_popup.style.display='none';
  compare_popup.style.display='none';
  single_pie.style.display='block';
  chartContainer.style.display='none';
  chartContainer1.style.display='none';
}

function match_past() {
  window.fetch("/match_list", {method: 'POST', body: JSON.stringify([curr_user]),
  headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(res => {
    document.getElementById("select_matches2").remove();
    var select_matches2 = document.createElement("ul");
    var att1 = document.createAttribute("id");
    att1.value = "select_matches2";
    select_matches2.setAttributeNode(att1);
    var att2 = document.createAttribute("style");
    att2.value = "list-style-type:none";
    select_matches2.setAttributeNode(att2);
    var arr = res.match_list;
    for (var i = 0; i < arr.length; i++) {
      var li = document.createElement("li");
      var att3 = document.createAttribute("id");
      att3.value = res.match_link_list[i];
      li.setAttributeNode(att3);
      var att4 = document.createAttribute("style");
      att4.value = "cursor: pointer;";
      li.setAttributeNode(att4);
      li.appendChild(document.createTextNode(arr[i]));
      li.addEventListener("click", function(){
        window.fetch("/past", {method: 'POST', body: JSON.stringify([this.id]),
        headers: {'Content-Type': 'application/json'}}).then(res1 => res1.json()).then(res1 => {
          repaint_video(res1.video_link);
          google.charts.load('current', {'packages':['corechart']});
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Forehand', res1.forehand],
            ['Backhand', res1.backhand],
            ['Lob', res1.lob],
            ['Smash', res1.smash],
            ]);
            var options = {'title':'Playing style', 'width':500, 'height':300};
            var chart = new google.visualization.PieChart(piechart);
            chart.draw(data, options);
          }
          duration.innerHTML=res1.duration;
          weight.innerHTML=res1.weight;
          calories.innerHTML=res1.calories;
          speed.innerHTML=res1.speed;
          reaction.innerHTML=res1.reaction;
          heart_rate.innerHTML=res1.heart_rate;
          doc_recom.innerHTML=res1.doc_recom;
        });
        past_popup.style.display='none';
        compare_popup.style.display='none';
        single_pie.style.display='block';
        chartContainer.style.display='none';
        chartContainer1.style.display='none';
      });
      select_matches2.appendChild(li);
      select_matches2.appendChild(document.createElement("br"));
      select_matches2.appendChild(document.createElement("br"));
    }
    document.getElementById("select_matches_wrapper2").appendChild(select_matches2);
  });
  past_popup.style.display='block';
  compare_popup.style.display='none';
  single_pie.style.display='none';
  chartContainer.style.display='none';
  chartContainer1.style.display='none';
}

window.onload = function(){
  curr_user = document.getElementById("uname").innerHTML;

  $.getJSON("recommendations/library.json", function(json) {
    for (var i = 0; i < json.length; i++) {
      var li = recom_vid_config(i, json);
      var chk = document.createElement("input");
      var att7 = document.createAttribute("name");
      att7.value = "recommended";
      chk.setAttributeNode(att7);
      var att8 = document.createAttribute("type");
      att8.value = "checkbox";
      chk.setAttributeNode(att8);
      var att9 = document.createAttribute("value");
      att9.value = json[i].name+" "+json[i].link;
      chk.setAttributeNode(att9);
      li.appendChild(chk);
      var ul1 = document.getElementById("rig1");
      ul1.appendChild(li);
    }
    var btn = document.createElement("button");
    var att11 = document.createAttribute("class");
    att11.value = "button";
    btn.setAttributeNode(att11);
    var att12 = document.createAttribute("onclick");
    att12.value = "printChecked()";
    btn.setAttributeNode(att12);
    var desc = document.createTextNode("Recommend selected videos");
    btn.appendChild(desc);
    document.getElementById("u1011").appendChild(btn);
  });

  $.getJSON("recommendations/"+curr_user+"_recommendations.json", function(json) {
    for (var i = 0; i < json.length; i++)
      document.getElementById("rig").appendChild(recom_vid_config(i, json));
  });

  match_latest();
}