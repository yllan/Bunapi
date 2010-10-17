{	
	name : "rockman",
	actions : {
		appear : "appear.png",
		landing : ["land-1.png", "land-2.png"],
		stand : "stand.png",
		stand_right: {
			image: "stand.png",
			effect: "reflect"
		},
		wink : { 
			image : "wink.png",
			duration : 0.2
		},
		run : {
			image : ["run-1.png", "run-2.png", "run-3.png", "run-2.png"],
			duration : 4,
			begin : function() { stage.moveLeft(100, 4); },
			fps : 4
		},

		run_right : {
			image : ["run-1.png", "run-2.png", "run-3.png", "run-2.png"],
			effect: "reflect",
			duration : 4,
			begin : function() { stage.moveRight(100, 4); },
			fps : 4
		}

	}
}
