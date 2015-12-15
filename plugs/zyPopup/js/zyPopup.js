
(function($,undefined){
	$.fn.zyPopup = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("zyPopup - No such method: " + options);
			}
		}

		return this.each(function(){
			var para = {};    // 保留参数
			var self = this;  // 保存组件对象
			
			var defaults = {
					"width"  : 400,
					"height" : 300,
					"id"     : "",
					"trigger": "",
					"title"  : "",
					"data"   : [],
					"onConfirm" : function(){
						console.info("onConfirm");
					}
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.initContentHtml();  // 初始化input html
				this.addEvent();  // 添加事件
			};
			
			// 初始化内容html代码
			this.initContentHtml = function(){
				var html = '';
				
				html += '<div id="'+para.id+'" class="zy-popup dialog">';
				html += '	<div class="dialog__overlay"></div>';
				html += '		<div class="dialog__content">';
				html += '			<div class="dialog-header">';
				html += '				<h4 id="myModalLabel" class="dialog-title">'+para.title+'</h4>';
				html += '			</div>';
				html += '			<div class="dialog-content">';
				html += 			self.createInputHtml();
				html += '			</div>';
				html += '			<div class="dialog-footer">';
				html += '				<button id="confirm" class="action blue" data-dialog-confirm="">确定</button>';
				html += '				<button class="action" data-dialog-close="">关闭</button>';
				html += '			</div>';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				
				$("body").append(html);
			};
			
			// 根据data生成内容
			this.createInputHtml = function(){
				var html = '';
				if(para.data.length>0){
					$.each(para.data, function(k, v){
						html += '<div class="item" id="'+para.id+"_"+v.id+'">';
						html += '	<label class="control-label">'+v.desc+'</label>';
						html += '	<input type="text" value="'+v.value+'">';
						html += '</div>';
					});
				}
				
				return html;
			};
			
			// 添加事件
			this.addEvent = function(){
				var dlgtrigger = para.trigger;
				var somedialog = document.getElementById(para.id);
				var dlg = new DialogFx( somedialog );

				dlgtrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );
	
				var confirm = $("#"+para.id).find("#confirm")[0];
				confirm.addEventListener('click', function(){
					// 点击确定的回调
					para.onConfirm();
					dlgtrigger.click();
				});
			};
			
			// 获取数据
			this.getData = function(){
				var data = [];
				var items = $("#"+para.id).find(".item");
				$.each(items, function(k, v){
					var id = $(v).attr("id").replace(para.id+"_", '');
					var desc = $(v).find("label").html();
					var value = $(v).find("input").val();
					data.push({"id":id, "desc":desc, "value":value});
				});
				return data;
			};
			
			
			// 初始化上传控制层插件
			this.init(self);
		});
	};
})(jQuery);

