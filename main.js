song = "";

function preload()
{
    song = loadSound("music.mp3");    
}

scorerightwrist = 0;
scoreleftwrist = 0;
rightwristX = 0;
leftwristX = 0;
rightwristY = 0;
leftwristY = 0;

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}

function modelloaded()
{
    console.log("Model has loaded");
}

function gotposes(results)
{
    if(results.length > 0)
    {
        scoreleftwrist = results[0].pose.keypoints[10].score;
        scorerightwrist = results[0].pose.keypoints[9].score;
        rightwristX = results[0].pose.rightWrist.x;
        leftwristX = results[0].pose.leftWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        leftwristY = results[0].pose.leftWrist.y;
        console.log(leftwristX+","+leftwristY);
        console.log(rightwristX+","+rightwristY);
    }
}

function draw()
{
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    if(scorerightwrist > 0.2)
    {
        circle(rightwristX,rightwristY,20);
        if(rightwristY > 0 && rightwristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightwristY > 100 && rightwristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightwristY > 200 && rightwristY <= 300)
        {
            document.getElementById("speed").innerHTML = "SPeed = 1.5x";
            song.rate(1.5);
        }
        else if(rightwristY > 300 && rightwristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x"
            song.rate(2);
        }
        else
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
            song.rate(2.5);
        }
    }

    if(scoreleftwrist > 0.2)
    {
        circle(leftwristX,leftwristY,30);
        number = Number(leftwristY);
        new_leftwristY = floor(number * 2);
        division = new_leftwristY / 1000;
        document.getElementById("volume").innerHTML = "Volume : " + division;
        song.setVolume(division);
    }
}

function play()
{
    song.play();
    song.rate(1);
    song.setVolume(1);    
}