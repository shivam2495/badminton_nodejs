LOCK TABLES `per_match_table` WRITE;
DELETE FROM `per_match_table`;
INSERT INTO `per_match_table` VALUES
('shivam','Baun-Augustyn-GrpG-LondonOlympics-2012',12,23,15,50,70,5,1.2,1.3,23,80,402,30.5,70,'Baun-Augustyn-GrpG-LondonOlympics-2012.mp4','2017-07-12', 'Work on speed and try more movement of left arm'),
('shivam','Chong-Wei-Lee-Wins-Quarterfinals-2012-Olympics',22,13,25,40,30,8,2.2,0.8,39,88,302,20.5,69,'Chong-Wei-Lee-Wins-Quarterfinals-2012-Olympics.mp4','2017-11-04', 'Avoid strain on left shoulder'),
('shivam','Lin-Dan-v-Lee-Chong-Wei-2012-Olympics',22,13,25,40,30,8,2.2,0.8,39,88,302,20.5,69,'Lin-Dan-v-Lee-Chong-Wei-2012-Olympics.mp4','2017-02-14', 'Third match slow down'),
('shivam','Li-Xuerui-Wins-2012-Olympics',22,13,25,40,30,8,2.2,0.8,39,88,302,20.5,69,'Li-Xuerui-Wins-2012-Olympics.mp4','2018-01-06', 'Fourth match slow down'),
('shivam','Wang-v-Nehwal',22,13,25,40,30,8,2.2,0.8,39,88,302,20.5,69,'Wang-v-Nehwal.mp4','2018-09-24', 'Fifth match slow down');
UNLOCK TABLES;
