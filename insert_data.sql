LOCK TABLES `player_info_table` WRITE;
DELETE FROM `player_info_table`;
INSERT INTO `player_info_table` VALUES
('admin','Saina Nehwal','saina07082012.jpg',5,3,25,20,30,25,68,23,1.3,0.8,32,80,400,30,78,'Wang-v-Nehwal.mp4'),
('joga','Joga Rao','playerpic3.png',1,2,15,10,55,20,43,63,4.3,0.4,92,75,300,40,68,'Li-Xuerui-Wins-2012-Olympics.mp4');
UNLOCK TABLES;

LOCK TABLES `per_match_table` WRITE;
DELETE FROM `per_match_table`;
INSERT INTO `per_match_table` VALUES
('admin','Baun v/s Augustyn',12,23,15,50,70,5,1.2,1.3,23,80,402,30.5,70,'Baun-Augustyn-GrpG-LondonOlympics-2012.mp4','2017-07-12', 'Work on speed and try more movement of left arm'),
('admin','Chong Wei v/s',13,25,47,15,30,8,2.2,0.8,39,88,302,20.5,69,'Chong-Wei-Lee-Wins-Quarterfinals-2012-Olympics.mp4','2017-11-04', 'Avoid strain on left shoulder'),
('admin','Lin Dan v/s Lee Chong',22,13,25,40,30,8,2.2,0.8,39,88,302,20.5,69,'Lin-Dan-v-Lee-Chong-Wei-2012-Olympics.mp4','2017-02-14', 'Third match slow down'),
('admin','Li Xuerui Wins',52,13,25,10,30,8,2.2,0.8,39,88,302,20.5,69,'Li-Xuerui-Wins-2012-Olympics.mp4','2018-01-06', 'Fourth match slow down'),
('admin','Wang v/s Nehwal',22,13,25,40,30,8,2.2,0.8,39,88,302,20.5,69,'Wang-v-Nehwal.mp4','2018-09-24', 'Fifth match slow down'),
('joga','Baun Augustyn',20,35,25,20,42,55,2.9,0.4,49,72,240,40,65,'Baun-Augustyn-GrpG-LondonOlympics-2012.mp4','2018-06-12','you cannot hit many backhand shots may be your shoulder did not recover completely'),
('joga','Li Xuerui',15,25,35,25,56,62,3.4,0.9,59,62,300,30,70,'Li-Xuerui-Wins-2012-Olympics.mp4','2018-06-14','well you have recoverd completely'),
('joga','Wang vs Nehwal',25,30,35,10,46,63,2.4,0.3,56,52,320,20,62,'Wang-v-Nehwal.mp4','2018-06-24','your unable to play smashes try rotating your wrist everyday for atlest 100 times'),
('joga','Lin Dan Lee Chong Wei',15,20,30,35,70,23,1.6,0.3,52,62,400,25,68,'Lin-Dan-v-Lee-Chong-Wei-2012-Olympics.mp4','2018-06-20','your speed is lagging so have  a warmup before every match'),
('joga','Chong Wei Lee Quarterfinals',25,20,20,35,57,43,3.5,0.6,66,77,320,25,78,'Chong-Wei-Lee-Wins-Quarterfinals-2012-Olympics.mp4','2018-06-24','your heart rate is high maintain your diet and reduce weight');
UNLOCK TABLES;
