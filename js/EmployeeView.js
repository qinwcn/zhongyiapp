var EmployeeView = function(store, employee) {
 
    this.initialize = function() {
		var self=this;
        this.el = $('<div/>');
		this.el.on('click', '.showmenu', function(){self.snap().open('left');});
    };
	this.render = function() {
		this.el.html(EmployeeView.template());
		return this;
	};
	
	this.renderDetail =function() {
		this.el.find("#d_content").html(EmployeeView.detail(employee));
		return this;
	}
	
	this.builder = function () {
		var headerV=new HeaderView(store,'sub').render().el;
		//var footerV=new FooterView(store).render().el;
		var sideMenuV=new SideMenuView(store,'sub').render().setSubMenu().el;
		
		this.el.children('#content').children('header').html(headerV);
		this.el.children('#left_div').html(sideMenuV);
		//this.el.children('#footer').html(footerV);
		return this;
	};
	
	this.snap = function(){
		var self=this;
		if(!self.snapper){
			self.snapper = new Snap({
                element: document.getElementById('content'),
				disable: 'right'
            });
		}
		return self.snapper;
	};
	
	
	
	this.enableDrag=function(target){
	    var self=this;
		Hammer(target).on("touch dragdown  dragup release", function(ev) {
				//ev.gesture.preventDefault();
				if(window.scrollY==0){
					switch(ev.type) {
						case "dragdown":
						if($(".selected").prev().hasClass("menu-item")){
							$("#prev_r").css("display","block");
							$("#prev_r").html($(".selected").prev().children("a").html());
							self.curl=$(".selected").prev().children("a").attr("href");
							//alert(url);
						}else{
							self.curl=$(".selected").children("a").attr("href");
							$("#prev_r").css("display","block");
							$("#prev_r").html("Reach First Record");
						}
						break;
						
						case "dragup":
							if($(".selected").next().hasClass("menu-item")){
								$("#next_r").css("display","block");
								$("#next_r").html($(".selected").next().children("a").html());
								self.curl=$(".selected").next().children("a").attr("href");
							}else{
								self.curl=$(".selected").children("a").attr("href");
								$("#next_r").css("display","block");
								$("#next_r").html("Reach First Record");
							}
						break;
						
						case "release":
							if(self.curl!=undefined){
								var match=self.curl.match(window.detailsURL);
								window.store.findById(match[1], function(employeea) {
									$('#d_content').html(EmployeeView.detail(employeea));
								});
								
								//$('.subMenu-list li').removeClass("selected");
								$('.subMenu-list li').each(function(){
										$(this).removeClass("selected");
										if(self.curl==$(this).children("a").attr('href')){
											$(this).addClass("selected");
											$('#scroll-menu').animate({scrollTop: $(this).addClass("selected").offset().top},'slow');
										}
								});
								
								$("#prev_r").css("display","none");
								$("#next_r").css("display","none");
							}
						break;
						
					}
				}
					
			});
	};
	
	
    this.initialize();
 
 }
 
EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
EmployeeView.detail = Handlebars.compile($("#detail-tpl").html());