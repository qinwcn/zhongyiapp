var app = {

	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},
	
	registerEvents: function() {
		var self = this;
		$(window).on('hashchange', $.proxy(this.route, this));
		// Check of browser supports touch events...
		if (document.documentElement.hasOwnProperty('ontouchstart')) {
			// ... if yes: register touch event listener to change the "selected" state of the item
			$('body').on('touchstart', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('touchend', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});
		} else {
			// ... if not: register mouse events instead
			$('body').on('mousedown', 'a', function(event) {
				$(event.target).addClass('tappable-active');
			});
			$('body').on('mouseup', 'a', function(event) {
				$(event.target).removeClass('tappable-active');
			});
		}
		
	},
	route: function() {
	    var self=this;
		var hash = window.location.hash;
		if (!hash) {
		    var home=new HomeView(this.store).render().builder();
			$('body').html(home.el);
			var iscrollMenu = new iScroll(document.getElementById("scroll-menu"),{hScrollbar: false, vScrollbar: false,snap: true });
			home.snap();
			return;
		}
		var match = hash.match(app.detailsURL);
		if (match) {
			this.store.findById(match[1], function(employee) {
				var epv=new EmployeeView(this.store,employee).render().builder().renderDetail();
				$('body').html(epv.el);
				epv.snap();
				epv.enableDrag(document.getElementById("content"));
				//var iscrollMenu = new iScroll(document.getElementById("scroll-menu"),{hScrollbar: false, vScrollbar: false });
				
			});
		}
	},
	

	initialize: function() {
		var self = this;
		this.detailsURL = /^#employees\/([A-Z0-9]+)/;
		this.registerEvents();
		this.store = new MemoryStore(function() {
			self.route();
		});
		window.store=this.store;
		window.detailsURL=this.detailsURL;
		
		
	}

};

app.initialize();