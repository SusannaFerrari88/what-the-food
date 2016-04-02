// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

var lidlData = require('./data/pasta.json');

module.exports = {
	products: products
};

function products(productName) {
	var results = [];

	var items = lidlData.Campaign.ContainerItems;
	items.forEach(function (item) {
		var product = item.Product;
		var title = product.productLanguageSet.ProductLanguageSet.title;
		var subtitle = product.productLanguageSet.ProductLanguageSet.title;
		if(title.indexOf(productName) >= 0 || subtitle.indexOf(productName) >= 0) {
			var productInfo = {
				title : title,
				subtitle : subtitle,
				imageUrl : product.mainImage.Image.mediumUrl,
				brand : product.brand,
				price : product.price,
				availableOnline : product.availableOnline,
				availableInStore : product.availableInStore,
				shareUrl : product.shareUrl
			};
			results.push(productInfo);
		}
	});

	return results;
}