function printChecked(){
  var items=document.getElementsByName('recommended');
  var selectedItems="";
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
  console.log(jsn);
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
    $.getJSON("output/"+this.id+".json", function(json){
      populate_json(json);
    });
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

function populate_json(json){
  json.sort(function(a, b){
    var keyA = a.Rally_number, keyB = b.Rally_number;
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
  });
  var fr=json[0].frame_rate;
  var x = 0, y=0, set=0;
  var vid= document.getElementById("myVideo");
  for (var i = 1; i < json.length; i++) {
    var shot=json[i].Shots;
    var btn = document.createElement("button");
    if(i>1){
      if(x>20 || y>20){
        set++;
        x=0;
        y=0;
      }
      var prev_win = shot[0].Shot_type;
      var prev_win1 = prev_win.split("_")[0];
      var prev_win2 = prev_win.split("_")[1];
      if(set%2==0){
        if(prev_win == "Top_Serve" || (prev_win1 == "Bottom" && prev_win2 != "Serve")) x++;
        else y++;
      }else{
        if(prev_win == "Top_Serve" || (prev_win1 == "Bottom" && prev_win2 != "Serve")) y++;
        else x++;
      }
    }
    var node = document.createTextNode("Score: " + y + '-' + x);
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
    for(var j=0;j<shot.length;j++) {
      var tr=document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var para_txt = document.createTextNode(shot[j].Shot_number);
      var para_txt2 = document.createTextNode(shot[j].Shot_type.split("_")[0]);
      var para_txt3 = document.createTextNode(shot[j].Shot_type.split("_")[1]);
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

$.getJSON("recommendations/shivam_recommendations.json", function(json) {
  for (var i = 0; i < json.length; i++)
    document.getElementById("rig").appendChild(recom_vid_config(i, json));
});

$.getJSON("output/Wang-v-Nehwal.json", function(json){
  populate_json(json);
});