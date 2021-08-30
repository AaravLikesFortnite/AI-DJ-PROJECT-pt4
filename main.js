LWY=0;
LWX=0;

RWY=0;
RWX=0;

SLW=0;

Songs="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3")
}

function setup(){
    canvas=createCanvas(450,450);
    canvas.position(425,158);

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Model Loaded");
}

function gotPoses(result){
    if(result.length>0){
        console.log(result);

        SLW=result[0].pose.keypoints[9].score;
        LWY=result[0].pose.leftWrist.y;
        LWX=result[0].pose.leftWrist.x;
        console.log("Left wrist x="+LWX+", and left wrist y="+LWY);

        RWY=result[0].pose.rightWrist.y;
        RWX=result[0].pose.rightWrist.x;
        console.log("Right wrist x="+RWX+", and right wrist y="+RWY);

    }
}

function draw(){
    image(video,0,0,450,450);

    Songs=song1.isPlaying();

    fill("#ff0000");
    stroke("#ff0000");

    if(SLW>0.2){
        fill("#ff0000");
        stroke("#ff0000");
        circle(LWX-100,LWY,20);

        song2.stop() ;

        if(Songs="false"){
            song1.play();

            document.getElementById("song_name").innerHTML="Harry Potter Theme Song (REMIX)";
        }
    }
}