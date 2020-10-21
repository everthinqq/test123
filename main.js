/* casperjs parser */

/* comments from author looks like this example */
/* some test things looks like "// TEST" */
/* 2 new lines inside functions means new block of code */

var casper = require('casper').create({
	// verbose: true,
    // logLevel: "debug"
});

var XPath = require('casper').selectXPath;

var fs = require('fs');

var URL = 'http://www.prokatpalatok.ru/';

casper.start(URL, function() {
	this.waitForSelector('title');
});

var array = [];

casper.then(function() { 
	/* main loop starts from 1 coz of tags starts from 1 */
	for(var i = 1; i < 22; i++) { 
		/* find elements by XPath */
		if (this.exists(XPath('//*[@id="content"]/a[' + i + ']/@href'))) {
			href = this.evaluate(function(i) {
				return __utils__.getElementByXPath('//*[@id="content"]/a[' + i +']/@href').textContent.trim();
			}, i);
		} else href = '';

		if (this.exists(XPath('//*[@id="content"]/a[' + i + ']/div/div/h2'))) {
			h2 = this.evaluate(function(i) {
				return __utils__.getElementByXPath('//*[@id="content"]/a[' + i +']/div/div/h2').textContent.trim();
			}, i);
		} else h2 = '';
		
		if (this.exists(XPath('//*[@id="content"]/a[' + i + ']/div/div/p[1]'))) {
			p1 = this.evaluate(function(i) {
				return __utils__.getElementByXPath('//*[@id="content"]/a[' + i +']/div/div/p[1]').textContent.trim();
			}, i);
		} else p1 = '';

		if (this.exists(XPath('//*[@id="content"]/a[' + i + ']/div/div/p[2]'))) {
			p2 = this.evaluate(function(i) {
				return __utils__.getElementByXPath('//*[@id="content"]/a[' + i +']/div/div/p[2]').textContent.trim();
			}, i);
		} else p2 = '';

		if (this.exists(XPath('//*[@id="content"]/a[' + i + ']/div/div/p[3]'))) {
			p3 = this.evaluate(function(i) {
				return __utils__.getElementByXPath('//*[@id="content"]/a[' + i +']/div/div/p[3]').textContent.trim();
			}, i);
		} else p3 = '';

		if (this.exists(XPath('//*[@id="content"]/a[' + i + ']/div/div/p[4]'))) {
			p4 = this.evaluate(function(i) {
				return __utils__.getElementByXPath('//*[@id="content"]/a[' + i +']/div/div/p[4]').textContent.trim();
			}, i);
		} else p4 = '';

		if (this.exists(XPath('//*[@id="content"]/a[' + i + ']/div/div/p[5]'))) {
			p5 = this.evaluate(function(i) {
				return __utils__.getElementByXPath('//*[@id="content"]/a[' + i +']/div/div/p[5]').textContent.trim();
			}, i);
		} else p5 = '';

		if (this.exists(XPath('//*[@id="content"]/a[' + i + ']/div/div/p[6]'))) {
			p6 = this.evaluate(function(i) {
				return __utils__.getElementByXPath('//*[@id="content"]/a[' + i +']/div/div/p[6]').textContent.trim();
			}, i);
		} else p6 = '';


		/* forming description string until "var price = '';" declaration */
		var descr = ''; 

		if(p1 != '')
		if(!(p1.match(/первые/i) || p1.match(/вторые/i) || p1.match(/последующие/i))) {
			descr += p1 + ';;';
			// this.echo(p1);
		}

		if(p2 != '')
		if(!(p2.match(/первые/i) || p2.match(/вторые/i) || p2.match(/последующие/i))) {
			descr += p2 + ';;';
			// this.echo(p2);
		}

		if(p3 != '')
		if(!(p3.match(/первые/i) || p3.match(/вторые/i) || p3.match(/последующие/i))) {
			descr += p3 + ';;';
			// this.echo(p3);
		}

		if(p4 != '')
		if(!(p4.match(/первые/i) || p4.match(/вторые/i) || p4.match(/последующие/i))) {
			descr += p4 + ';;';
			// this.echo(p4);
		}

		if(p5 != '')
		if(!(p5.match(/первые/i) || p5.match(/вторые/i) || p5.match(/последующие/i))) {
			descr += p5 + ';;';
			// this.echo(p5);
		}

		if(p6 != '')
		if(!(p6.match(/первые/i) || p6.match(/вторые/i) || p6.match(/последующие/i))) {
			descr += p6 + ';;';
			// this.echo(p6);
		}


		/* forming price string with regexps */
		var price = ''; 
		
		if(p1.match(/первые/i) && p2.match(/вторые/i) && p3.match(/последующие/i)) { /* 5-1 type */
			price += p1 + ';;' + p2 + ';;' + p3;
			// this.echo(p1 + ';;' + p2 + ';;' + p3);
		}

		if(p3.match(/первые/i) && p4.match(/последующие/i)) { /* 6-1 type */
			price += p3 + ';;' + p4;
			// this.echo(p3 + ';;' + p4);
		}

		if(p4.match(/первые/i) && p5.match(/последующие/i)) { /* 6-1 type when p3 tag is empty */
			price += p4 + ';;' + p5;
			// this.echo(p4 + ';;' + p5);
		}

		if(p2.match(/первые/i) && p3.match(/вторые/i) && p4.match(/последующие/i)) { /* 6-2 type */
			price += p2 + ';;' + p3 + ';;' + p4;
			// this.echo(p2 + ';;' + p3 + ';;' + p4);
		}

		if(p3.match(/первые/i) && p4.match(/вторые/i) && p5.match(/последующие/i)) { /* 6-3 type */
			price += p3 + ';;' + p4 + ';;' + p5;
			// this.echo(p3 + ';;' + p4 + ';;' + p5);
		}

		if(p4.match(/первые/i) && p5.match(/вторые/i) && p6.match(/последующие/i)) { /* 7-1 type */
			price += p4 + ';;' + p5 + ';;' + p6;
			// this.echo(p4 + ';;' + p5 + ';;' + p6);
		}


		if(h2 != '') { /* if itemName (like "PALATKA_name123") is not empty */
			// this.echo(href);
			// this.echo(h2);
			// this.echo(descr);
			// this.echo(price);

			if(href == '')
				array.push('' + ';;;' + h2 + ';;;' + descr + ';;;' + price);
			else 
				array.push(URL + href + ';;;'  + h2 + ';;;' + descr + ';;;' + price);
		}
		// this.echo('--');
	} /* end of loop bracket */
});

casper.then(function() {
	var i = 0;
	for(each in array) {
		// this.echo(array[each].split(';;;')[0]);
		// this.echo(array[each].split(';;;')[1]);
		// this.echo(array[each].split(';;;')[2].replace(/;;/, ', '));
		// this.echo(array[each].split(';;;')[3].split(';;')[0]);


		url = array[each].split(';;;')[0];
		itemName = array[each].split(';;;')[1]
		description = array[each].split(';;;')[2].replace(/;;/, ', ')
		price0 = array[each].split(';;;')[3].split(';;')[0];
		price1 = array[each].split(';;;')[3].split(';;')[1];
		price2 = array[each].split(';;;')[3].split(';;')[2];
		price3 = array[each].split(';;;')[3].split(';;')[3];

		if(itemName.match(/"пенка"/)) /* quotes generate an "unable to open file" error */
			itemName = 'Коврик пенка';

		if(price3 == undefined)
			price3 = '';

		var obj = new Object();
		obj.url = url;
		obj.itemName = itemName;
		obj.description = description;
		obj.price0 = price0;
		obj.price1 = price1;
		obj.price2 = price2;
		obj.price3 = price3;

	
		var json_str = JSON.stringify(obj);	/* convert object to json string */

		var save = fs.pathJoin(fs.workingDirectory, 'JSON', itemName + '.json');
		fs.write(save, json_str, 'w');

		// this.echo(url);
		// this.echo(itemName);
		// this.echo(description);
		// this.echo(price0);
		// this.echo(price1);
		// this.echo(price2);
		// this.echo(price3);

		// this.echo('--');
	}
});

casper.run(function() {
    this.exit();
});