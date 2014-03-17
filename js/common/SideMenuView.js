var SideMenuView = function (store,where){

	this.initialize = function() {
	
		
	  switch(where)
	  {
	     case "home":
		 this.el = $('<div/>');
		 this.el.on('click', '.filter_items', this.refreshFilterItems);
		 break;
		 
		 case "sub":
		 this.el = $('<div/>');
		 break;
	  }

	};
	
	this.render = function() {
	  switch(where)
	  {
	     case "home":
			this.el.html(SideMenuView.homeTemplate());
			return this;
		 break;
		 
		 case "sub":
			this.el.html(SideMenuView.subTemplate());
			return this;
		 break;
	  }
	};
	
	this.setFilterMenu=function(){
	    var self=this;
		store.findAllFilter(function(items){
			self.el.find(".filter_items").html(SideMenuView.filterMenu(items));
		});
		
		return self;
	}

		
	this.setSubMenu = function(){
		var self=this;
		store.findByNameWithFilter(window.keyWord, window.filterIds,function(employees) {
			self.el.find(".subMenu-list").html(SideMenuView.liTemplate(employees));
			if (self.iscroll) {
				//console.log('Refresh iScroll');
				self.iscroll.refresh();
			} else {
				//console.log('New iScroll');
				//self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
				self.iscroll=window.iscroll;
			}
			//set up highlight
			self.el.find(".subMenu-list>li").each(function(){
				var hash = window.location.hash;
				if(hash==$(this).children("a").attr('href')){
					$(this).addClass("selected");
				}
			});
			
		});
		
		return this;
	};
	
	this.refreshFilterItems = function(e){
		if($(e.target).hasClass("selected")){
			$(e.target).removeClass("selected");
		}else{
			$(e.target).addClass("selected");
		}
	};
	
	this.initialize();
}

SideMenuView.homeTemplate = Handlebars.compile($("#home-menu-tpl").html());
SideMenuView.subTemplate = Handlebars.compile($("#sub-menu-tpl").html());
SideMenuView.liTemplate = Handlebars.compile($("#menu-li-tpl").html());
SideMenuView.filterMenu=Handlebars.compile($("#filterMenu-li-tpl").html());
