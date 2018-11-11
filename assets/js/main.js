$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCDZIhVwZNYEw1rkAbXOzIV8WHWx5LNavs",
        authDomain: "my-amazing-thing-48204.firebaseapp.com",
        databaseURL: "https://my-amazing-thing-48204.firebaseio.com",
        projectId: "my-amazing-thing-48204",
        storageBucket: "my-amazing-thing-48204.appspot.com",
        messagingSenderId: "777929959361"
    };

    firebase.initializeApp(config);

    var trainData = firebase.database();

    $('#newTrain').click(function(){
		var trainName = $('#trainName-input').val().trim();
		var destination = $('#destination-input').val().trim();
		var startTime = moment($('#startTime-input').val().trim(), 'HH:mm').format('X');
        var frequency = $('#frequency-input').val();
        
        var newTrain = {
			name: trainName,
			destination: destination,
			startTime: startTime,
			frequency: frequency
		}

		trainData.ref().push(newTrain);

			$('#trainName-input').val("");
			$('#destination-input').val("");
			$('#startTime-input').val("");
			$('#frequency-input').val("");
    })
    trainData.ref().on('child_added', function(snapshot){
        var trainName = snapshot.val().name; 
        var destination = snapshot.val().destination; 
        var frequency = snapshot.val().frequency; 
        var startTime = snapshot.val().startTime; 

        var remainder = moment().diff(moment.unix(startTime),"minutes")%frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes,'m').format('hh:mm A');

        $('#schedule').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${frequency}</td><td>${arrival}</td><td>${minutes}</td>`)
        })
        $('#add').click(function(){
            if($('#newTrainSchedule').attr('data-status') === 'hide') {
                $('#newTrainSchedule').attr('data-status', 'show').css({'visibility': 'visible', 'height': '480px'});
                $('#symbol').removeClass('fa fa-plus').addClass('fa fa-close');
            } else {
                $('#newTrainSchedule').attr('data-status', 'hide').css({'visibility': 'hidden', 'height': '0px'});
                $('#symbol').removeClass('fa fa-close').addClass('fa fa-plus');
            }
        });
    
        function actualTime() {
            var sec = 1;	
            time = moment().format('HH:mm:ss');
            searchTime = moment().format('HH:mm');
                $('#actualTime').html(time);
    
                t = setTimeout(function() {
                    actualTime();
                }, sec * 1000);	
        }
        actualTime(); 
    });
