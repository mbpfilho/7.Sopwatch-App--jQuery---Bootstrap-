$(function(){
    //variables
        var mode=0;//app mode
        var timeCounter=0;//time counter
        var lapCounter=0;//lap counter
        var action;//variable for setInterval
        var lapNumber=0;//number of laps
        var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;//minutes seconds centiseconds for time and lap

    //on app show start and lap buttons
    hideshowButtons("#startButton","#lapButton")

    $("#startButton").click(function(){     //click on startButton
        mode=1;   //mode on
        hideshowButtons("#stopButton","#lapButton");        //show stop and lap buttons
        startAction();
        //start counter
    });
    
    $("#stopButton").click(function(){    //click on stopButton
        hideshowButtons("#resumeButton","#resetButton");        //show resume and reset buttons
        clearInterval(action);        //stop counter
    });

    $("#resumeButton").click(function(){     //click on resumeButton
        hideshowButtons("#stopButton","#lapButton");         //show stop and lap buttons
        startAction();         //start counter
    });    

    $("#resetButton").click(function(){     //click on resetButton
        location.reload();        //reload the page;
    });   


    $("#lapButton").click(function(){    //click on lap button
        if(mode){        //if mode is on
            clearInterval(action);    //stop action
            lapCounter=0;            //resetLap and print lap details
            addLap();
            startAction();            //start action
        }
    });   
   
    //functions
    function hideshowButtons(x,y){  //shows two buttons
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    function startAction(){
        action=setInterval(function(){
            timeCounter++;
            if(timeCounter==100*60*100){
                timeCounter=0;
            };
            lapCounter++;
            if(lapCounter==100*60*100){
                lapCounter=0;
            };
            updateTime();
        },10);

    }

    function updateTime(){  //convert counters to min, sec, centisec
        timeMinutes=Math.floor(timeCounter/6000);        //1min = 60*100centiseconds = 6000centiseconds
        timeSeconds=Math.floor((timeCounter%6000)/100);        //1sec=100centiseconds
        timeCentiseconds=(timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));

        lapMinutes=Math.floor(lapCounter/6000);        //1min = 60*100centiseconds = 6000centiseconds
        lapSeconds=Math.floor((lapCounter%6000)/100);        //1sec=100centiseconds
        lapCentiseconds=(lapCounter%6000)%100;
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }

    //format numbers
    function format(number){
        if(number<10){
            return'0'+number;
        }else{
            return number;
        }
    }

    function addLap(){    //print lap details inside lap box
        lapNumber++;
        var myLapDetails=
            '<div class="lap"><div class="laptimetitle">Lap '+lapNumber+'</div><div class="laptime"><span>'+format(lapMinutes)+'</span>:<span>'+format(lapSeconds)+'</span>:<span>'+format(lapCentiseconds)+'</span></div></div>';
        $(myLapDetails).prependTo("#laps");
    }

});