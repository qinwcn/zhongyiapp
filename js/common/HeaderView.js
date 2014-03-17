var HeaderView = function(store,where){
	
	this.initialize = function() {
	  switch(where)
	  {
	     case "home":
		 this.el = $('<div/>');
		 break;
		 
		 case "sub":
		 this.el = $('<div/>');
		 //this.el.on('load',this.setSubMenu);
		 break;
	  }

	};
	
	this.render = function() {
	  switch(where)
	  {
	     case "home":
			this.el.html(HeaderView.cTemplate());
			return this;
		 break;
		 
		 case "sub":
			this.el.html(HeaderView.sTemplate());
			return this;
		 break;
	  }
	};
	
	this.initialize();

}

HeaderView.cTemplate = Handlebars.compile($("#header-tpl").html());
HeaderView.sTemplate = Handlebars.compile($("#subheader-tpl").html());