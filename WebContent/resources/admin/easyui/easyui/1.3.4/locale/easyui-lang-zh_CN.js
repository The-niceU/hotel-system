if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '';
	$.fn.pagination.defaults.afterPageText = '{pages}';
	$.fn.pagination.defaults.displayMsg = '{from}{to},{total}';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'doing...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'yes';
	$.messager.defaults.cancel = 'no';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = '';
	$.fn.validatebox.defaults.rules.email.message = '';
	$.fn.validatebox.defaults.rules.url.message = '';
	$.fn.validatebox.defaults.rules.length.message = '';
	$.fn.validatebox.defaults.rules.remote.message = '';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = '';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.missingMessage = '';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = '';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = '';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['7','1','2','3','4','5','6'];
	$.fn.calendar.defaults.months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = 'today';
	$.fn.datebox.defaults.closeText = 'close';
	$.fn.datebox.defaults.okText = 'yes';
	$.fn.datebox.defaults.missingMessage = '';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		if (!s) return new Date();
		var ss = s.split('-');
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return new Date();
		}
	};
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText,
		missingMessage: $.fn.datebox.defaults.missingMessage
	});
}
