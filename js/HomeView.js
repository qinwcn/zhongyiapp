var HomeView = function(store) {
 
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
		var self=this;
        this.el = $('<div/>');
		this.el.on('keyup', '.search-key', this.findByName);
		this.el.on('click','.search-key',function(){$('.search-key').val("");});
		this.el.on('click', '.showmenu', function(){self.snap().open('left');} );
		this.el.on('click', '.showsetting', function(){self.snap().open('right');});
		this.el.on('click', '.home_menu', this.findByClickMenu);
	
    };
	
	this.render = function() {
		this.el.html(HomeView.template());
		return this;	
	};
	
	this.builder = function () {
		var headerV=new HeaderView(store,'home').render().el;
		//var footerV=new FooterView(store).render().el;
		var sideMenuV=new SideMenuView(store,'home').render().setFilterMenu().el;
		this.el.children('#content').children('header').html(headerV);
		this.el.children('#left_div').html(sideMenuV);
		//this.el.children('#footer').html(footerV);
		return this;
	};
	
	this.findByClickMenu = function(e) {
	    //update keyword
		var self=this;
	    window.keyWord=$(e.target).html();
		window.filterIds = new Array();
		$(".filter_items>li.selected").each(function(i,v){
				window.filterIds[i]=$(v).attr('filter_id');
		});
		
		store.findByNameWithFilter(window.keyWord, window.filterIds, function(employees) {
			$('.employee-list').html(HomeView.liTemplate(employees));
				if (self.iscroll) {
					console.log('Refresh iScroll');
					self.iscroll.refresh();
				} else {
					console.log('New iScroll');
					self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
				}
		});
	};
	
	this.findByName = function() {
	    var self=this;
		var keyword=$('.search-key').val();
		window.filterIds = new Array();
		$(".filter_items>li.selected").each(function(i,v){
				window.filterIds[i]=$(v).attr('filter_id');
		});
		if(keyword.trim().length>0){
			window.keyWord=keyword;
			store.findByNameWithFilter(window.keyWord,window.filterIds, function(employees) {
				$('.employee-list').html(HomeView.liTemplate(employees));
				if (self.iscroll) {
					console.log('Refresh iScroll');
					self.iscroll.refresh();
				} else {
					console.log('New iScroll');
					self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
				}
			});
		}
	};
	
	this.snap = function(){
		var self=this;
		if(!self.snapper){
			self.snapper = new Snap({
                element: document.getElementById('content')
            });
		}
		return self.snapper;
	};
	
 
    this.initialize();
 
}
 
HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());