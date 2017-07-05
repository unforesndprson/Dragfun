		
		function Dragfun(obj,stage){
			this.o = obj;
			this.x = 0;
			this.y = 0;
			this.sta = stage;
			this.num = Math.ceil(Math.random()*10) + 10;
//			this.num = 6;
			
			this.ball = [];
			this.gravity = 0.06;
			this.sW = stage.offsetWidth;
			this.sH = stage.offsetHeight;
		    this.sT = stage.offsetTop;
			this.sL = stage.offsetLeft;
			
			var that = this;
			this.Create();
			this.sta.onmousemove = function(){
				that.Movefun();
			}
			this.sta.onmouseout = function(){
				document.onmouseout = null;
			}
			
		}
		//红球移动
		Dragfun.prototype.Movefun = function(e){
			var ev = e||window.event;
			if(ev.clientX<(this.sL + this.o.offsetWidth/2)){
			   this.o.style.left = 0 +"px";
			}else if(ev.clientX>=this.sL + this.sW- this.o.offsetWidth/2){
	
			   this.o.style.left = this.sW - this.o.offsetWidth + "px"
			}else{
			    this.o.style.left = ev.clientX -this.sL - this.o.offsetWidth/2  + "px";
			}
			
			if(ev.clientY<(this.sT + this.o.offsetHeight/2)){
			   this.o.style.top = 0 + "px";
			}else if(ev.clientY>=this.sT + this.sH - this.o.offsetWidth/2){
			   this.o.style.top = this.sH - this.o.offsetWidth + "px"
			}else{
			    this.o.style.top = ev.clientY -this.sT - this.o.offsetWidth/2  + "px";
			}
			this.Hitfun()
		}
		//创建
		Dragfun.prototype.Create = function(){
			for(var i = 0;i<this.num;i++){
				var nO = new Image();
				var nWH= 0;
				var nT = 0;
				var nL = 0
				nO.src = 'img/4.png';
				nWH = Math.ceil(Math.random()*40) + 120 ;
				nL = Math.floor(Math.random()*(this.sta.offsetWidth-nWH)) + "px";
				nT = Math.floor(Math.random()*(this.sta.offsetHeight-nWH)) + "px";
				nO.style.height  = nO.style.width = nWH +"px";
				nO.style.left = nL ;
				nO.style.top = nT ;
				nO.vx = 0;
				nO.vy = 0;
				nO.s =true;
				this.sta.appendChild(nO);
				this.ball.push(nO);
			}
		}
		//碰撞
		Dragfun.prototype.Hitfun = function(){
			var that = this;
			var balls = this.ball;
			var ball1 = this.o;
			ball1.x = ball1.offsetLeft + ball1.offsetWidth/2;
			ball1.y = ball1.offsetTop + ball1.offsetHeight/2;
			for(var i=0;i<balls.length;i++){
				var ball2 = balls[i];
				ball2.x = ball2.offsetLeft + ball2.offsetWidth/2;
				ball2.y = ball2.offsetTop + ball2.offsetHeight/2;
				var nx = ball2.x - ball1.x;
				var ny = ball2.y - ball1.y;
				var dist = Math.sqrt(nx*nx + ny*ny);
				var misL = ball1.offsetWidth/2 + ball2.offsetWidth/2+20;
				if(dist < misL){
					var angle= Math.atan2(ny,nx);
					ax = (-nx+ Math.cos(angle) * misL ) * 0.02;
					ay = (-ny+ Math.sin(angle) * misL ) * 0.02;
					ball2.vx+=ax;
					ball2.vy+=ay;
				}	
				

			}
		  for(var i=0;i<balls.length;i++){
                 that.mBall(balls[i]);
		  }
		}
		//篮球的移动
		Dragfun.prototype.mBall = function(ball){
			var that = this;
			if(ball.s){
		      var t=setInterval(function(){
			    ball.style.left = (ball.offsetLeft+ball.vx)+'px';
			    ball.style.top =(ball.offsetTop+ball.vy) +"px";
			    if(ball.offsetLeft<=(-ball.offsetWidth/2)){
			    	ball.style.left = that.sL + that.sW - ball.offsetWidth + "px";
			    }else if(ball.offsetLeft>=(that.sW+that.sL-ball.offsetWidth/2)){
			    	ball.style.left = "0px";
			    }
			    if(ball.offsetTop<=-ball.offsetHeight/2){
			    	ball.style.top = that.sH + that.sT-ball.offsetHeight+ "px";
			    }else if(ball.offsetTop>=that.sH+that.sT){
			    	ball.style.top = '0px';
			    }
			ball.vx*=0.995;
			ball.vy*=0.995;
			ball.s = false;
			  },10)
		   
			}
		
		}
