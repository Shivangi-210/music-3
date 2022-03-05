    song = "";
    leftWristX = 0;
    leftWristY = 0;
    rightWristX = 0;
    rightWristY = 0;
    scoreLeftWrist = 0;
    scoreRightWrist = 0;

    function setup(){
        canvas = createCanvas(600,500);
        canvas.center();
        video = createCapture(VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video,ml);
        poseNet.on("pose", gotPoses);
    }

    function preload(){
        song = loadSound("ilmb.mp3");
    }

    function draw(){
        image(video,0,0,600,500);
        fill("pink");
        stroke("blue");
        if(scoreLeftWrist > 0.2){
           circle(leftWristX,leftWristY,20);
          no = Number(leftWristY);
          rd = floor(no);
          volume = rd/500;
          document.getElementById("volume").innerHTML = "volume = "+ volume;
          song.setVolume(volume);
        }
        if(scoreRightWrist > 0.2){
            circle(rightWristX,rightWristY,20);
            if(rightWristY > 0 && rightWristY <=100){
               document.getElementById("speed").innerHTML = "Speed = 0.5 X";
               song.rate(0.5); 
            }
            else if(rightWristY > 100 && rightWristY <=200){
                document.getElementById("speed").innerHTML = "Speed = 1 X";
                song.rate(1); 
             }
             else if(rightWristY > 200 && rightWristY <=300){
                document.getElementById("speed").innerHTML = "Speed = 1.5 X";
                song.rate(1.5); 
             }
             else if(rightWristY > 300 && rightWristY <=400){
                document.getElementById("speed").innerHTML = "Speed = 2 X";
                song.rate(2); 
             }
             else if(rightWristY > 400 ){
                document.getElementById("speed").innerHTML = "Speed = 2.5 X";
                song.rate(2.5); 
             }
        }
    }

    function p(){
        song.play();
        song.setVolume(1);
        song.rate(1);
    }

    function s(){
        song.stop();
        
    }

   function ml(){
        console.log("poseNet is loaded :D");
    }

    function gotPoses(result){
        if(result.length > 0){
           console.log(result);
           scoreRightWrist= result[0].pose.keypoints[10].score;
           scoreLeftWrist = result[0].pose.keypoints[9].score;
           leftWristX = result[0].pose.leftWrist.x;
           leftWristY = result[0].pose.leftWrist.y;
           rightWristX = result[0].pose.rightWrist.x;
           rightWristY = result[0].pose.rightWrist.y;
        }
    }

    