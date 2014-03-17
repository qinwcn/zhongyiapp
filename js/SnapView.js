var SnapView = function (store,where){

	this.initialize = function() {
	  switch(where)
	  {
	     case "home":
		 this.el = $('<div/>');
		 this.el.on('load',this.setHomeMenu);
		 break;
		 
		 case "sub":
		 this.el = $('<div/>');
		 this.el.on('load',this.setSubMenu);
		 break;
	  }

	};
	
	this.renderHome = function() {
		this.el.html(SnapView.homeTemplate());
		return this;	
	};
	
	this.renderSub = function() {
		this.el.html(SnapView.subTemplate());
		return this;	
	};
	
	this.setHomeMenu = function(e) {
	    //update keyword
	    window.keyWord=$(e.target).html();
		window.iscroll=new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
		
		
		store.findByName(window.keyWord, function(employees) {
			$('.employee-list').html(HomeView.liTemplate(employees));
			if (self.iscroll) {
				console.log('Refresh iScroll');
				self.iscroll.refresh();
			} else {
				console.log('New iScroll');
				//self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
				self.iscroll=window.iscroll;
			}
		});
	};
	
	this.setSubMenu = function(){
		var self=this;
		store.findByName(window.keyWord, function(employees) {
			$('.subMenu-list').html(SnapView.liTemplate(employees));
			if (self.iscroll) {
				//console.log('Refresh iScroll');
				self.iscroll.refresh();
			} else {
				//console.log('New iScroll');
				//self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
				self.iscroll=window.iscroll;
			}
			//set up highlight
			$('.subMenu-list li').each(function(){
			var hash = window.location.hash;
			if(hash==$(this).children("a").attr('href')){
				$(this).addClass("selected");
			}
			});
			
		});
		
		return this;
	};
	
	this.initialize();
}

SnapView.homeTemplate = Handlebars.compile($("#home-menu-tpl").html());
SnapView.subTemplate = Handlebars.compile($("#sub-menu-tpl").html());
SnapView.liTemplate = Handlebars.compile($("#menu-li-tpl").html());
