//十六进制颜色值域RGB格式颜色值之间的相互转换
var colorConver = (function() {
	'use strict';
	var rgbReg = /^RGB\(\d+,\d+,\d+\)$/;//rgb
	var hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; //16位
	var colorConver = {
		rgbToHex: function(rgbText) {
			var that = rgbText?rgbText.replace(/\s+/g, '').toUpperCase():'';
			if (rgbReg.test(that)) {
				return ('#' + that.replace(/\d+[,\)]/g, function(w) {
					var hexText=parseInt(w).toString(16);
					return hexText.length!=1 ? hexText : '0'+hexText
				})).replace('RGB(','').toUpperCase();
			} else if (hexReg.test(that)) {
				return that.length>4?that:that.replace(/([0-9a-fA-f])/g,"$1$1");
			}
			return rgbText;
		},
		hexToRgb: function(hexText) {
			var sColor = hexText.toLowerCase();
			if (sColor && hexReg.test(sColor)) {
				sColor=sColor.length>4?sColor:sColor.replace(/([0-9a-fA-f])/g,"$1$1");
				//处理六位的颜色值
				return ("RGB(" + sColor.replace(/[0-9a-fA-f]{2}/g, function(w) {
					return ',' + parseInt('0x' + w);
				}) + ")").replace('#,','');
			}
			return sColor;
		}
	};
	return colorConver;
}());