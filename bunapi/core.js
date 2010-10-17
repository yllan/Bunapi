var queue = new function() {
	this.q = [];
	this.push = function(job, asynchronous) {
		if (asynchronous == undefined || asynchronous == false)
			this.q.push(function () {job();
			setTimeout(function(){queue.deque()}, 1);
			});
		else
			this.q.push(job); // job need to call deque manually!
	}
	
	this.deque = function() {
		if (this.q.length <= 0) return;
		j = this.q.shift();
		j();
	}
}

var stage = new function() {
	this.display = function(baseURL, name, action, duration) {
		$("#stage").removeClass().addClass(name);
		var img = new Image();
		var backgroundImage = baseURL + "/" + action.image;
		function loaded() {
			var s = $("#stage");
			var h = this.height;
			var w = this.width;
			var offset = s.offset();
			
			if (s.height() == 0) h = 0;
			if (s.width() == 0) w = 0;
			
			var newOffset = {top: offset.top + s.height() - h, left: offset.left + (s.width() - w) / 2}
			s.offset(newOffset);
			s.height(this.height);
			s.width(this.width);
			s.css("background-image", "url(" + backgroundImage + ")");
			if (duration != undefined) {
				setTimeout(function () {queue.deque()}, duration * 1000);
			} else {
				setTimeout(function () {queue.deque()}, 1);
			}
		}

		img.onload = loaded;
		img.src = backgroundImage;
	}
	
	this.animate = function(baseURL, name, action, fps) {
		var s = $("#stage").removeClass().addClass(name);
		if (fps == undefined) fps = 1;
		this.animate_iter(baseURL, name, action, fps, 0);
		setTimeout(function() {queue.deque()}, 1);
	}
	
	this.animate_iter = function(baseURL, name, action, fps, index) {
		if (!$("#stage").hasClass(name)) return;
		if (action.frame_hook != undefined) {
			action.frame_hook();
		}


		var img = new Image();
		var backgroundImage = baseURL + "/" + action.image[index];
		var next_index = index + 1;
		if (next_index >= action.image.length)
			next_index = 0;
		function loaded() {
			var s = $("#stage");
			var h = this.height;
			var w = this.width;
			var offset = s.offset();
			var newOffset = {top: offset.top + s.height() - h, left: offset.left + (s.width() - w) / 2}
			s.offset(newOffset);
			s.height(h);
			s.width(w);
			s.css("background-image", "url(" + backgroundImage + ")");
			
			setTimeout(function () {stage.animate_iter(baseURL, name, action, fps, next_index)},  1000.0 / fps);
		}
		img.onload = loaded;
		img.src = backgroundImage;
		
	}
	
	this.position = function() {
		var s = $('#stage');
		var leftPosition = Math.floor(Math.random() * ($('body').width() - s.width()));
		s.css("position", "absolute");

		s.offset({ top: 0, left: leftPosition });
	}
	
	this.fall = function(duration) {
		if (duration == undefined)
			duration = 1;
		var s = $('#stage');
		var t = $('body').height() - s.height();
		s.animate({top: t}, duration * 1000 - 10);
	}

	this.moveLeft = function(distance, duration, callback) {
		if (distance == undefined) distance = 5;
		if (duration == undefined) duration = 1;
		if (callback == undefined) callback = new function () {};
		var s = $('#stage');
		var offset = s.offset();
		if (offset.left - distance < 0) distance = offset.left;
		s.animate({left: offset.left - distance}, duration * 1000 - 10);
	}

	this.moveRight = function(distance, duration, callback) {
		if (distance == undefined) distance = 5;
		if (duration == undefined) duration = 1;
		if (callback == undefined) callback = new function () {};
		var s = $('#stage');
		var offset = s.offset();
		if (offset.left + distance + s.width() > $('body').width()) distance = $('body').width() - offset.left - s.width();
		s.animate({left: offset.left + distance}, duration * 1000 - 10);
	}
	
	this.reflectHorizan = function() {
		$('#stage').css("-webkit-transform", "scale(-1, 1)");
	}

	this.normalHorizan = function() {
		$('#stage').css("-webkit-transform", "");
	}


}

var director = new function() {
	this.actor = {
		"name" : "default",
		"actions" : {
			"appear" : {
				"image" : "appear.png",
				"duration" : 0.5,
				"begin" : function() {
					stage.position();
					stage.fall(0.5);
				},
				"next_action" : "landing"
			},
			"landing" : {
				"image" : "landing.png",
				"duration" : 0.3
			},
			"*" : {
				"duration" : 5
			}
		}
	};
	this.candidates;
	
	this.updateActor = function(actor) {
		if (actor.name != undefined)
			this.actor.name = actor.name;
		if (actor.actions != undefined) {
			var self = this;
			$.each(actor.actions, function(key, value) {
				var newAction = self.actor.actions[key];
				if (newAction == undefined) {
					newAction = $.extend(true, {}, self.actor.actions["*"]);
				}

				/* Shortcut for image. */
				if (typeof(value) == "string" || $.isArray(value)) {
					newAction.image = value;
				} else if (typeof(value) == "object") {
					newAction = $.extend(true, newAction, value);
				}
				self.actor.actions[key] = newAction;
			});
		}
		
		/* Copy the action to candidate */
		director.candidates = [];
		$.each(this.actor.actions, function(name, action) {
			if (name == 'appear') return;
			if (name == 'landing') return;
			if (name == '*') return;
			director.candidates.push(name);
		});
	}
	
	this.baseURL = "";
		
	this.start = function() {
		this.act("appear");
		setTimeout(function() {queue.deque()}, 1);
	}

	this.pickNextAction = function() {
		var idx = Math.floor(Math.random() * director.candidates.length);
		setTimeout(function(){director.act(director.candidates[idx])}, 1);
	}

	this.act = function(actionName) {
/* 		console.log("act:" + actionName); */
		var action = this.actor.actions[actionName];
		if (action == undefined) return false;

		if (action.effect == "reflect") {
			stage.reflectHorizan();
		} else {
			stage.normalHorizan();
		}

		queue.push(director.display(actionName, action), true)

		if (action.begin != undefined) {
			queue.push(action.begin);
		}
			
		if (action.duration != undefined) {
			queue.push(function () { 
				setTimeout(function() {queue.deque()}, action.duration * 1000)
			}, true);
		}
		
		if (action.next_action != undefined && this.actor.actions[action.next_action] != undefined) {
			function nextAction(aName) {
				var aName = aName
				return function() { director.act(aName) };
			}
			queue.push(nextAction(action.next_action));
		} else {
			queue.push(function() {director.pickNextAction()});
		}		
	}

	this.display = function(name, action) {
		var a = action;
		var n = name;
		if (typeof(a.image) == 'string')
			return function() { stage.display(director.baseURL, n, a) }
		else { // animation
			var fps = a.fps;
			if (fps == undefined)
				fps = a.image.length / a.duration;
			return function() { stage.animate(director.baseURL, n + "." + new Date().getTime(), a, fps) }
		}
	}
	
	this.load = function(bundle) {
		this.baseURL = bundle;
		var path = bundle + "/def.js";
		
		$.get(path, function(data) {
			var a = {}
			if (data != undefined && data != "") {
				eval("a=" + data);
			}
			director.updateActor(a);
			director.start();
		});
	}
}
