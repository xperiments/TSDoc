function HTMLEncode(str){
	var i = str.length,
		aRet = [];

	while (i--) {
		var iC = str[i].charCodeAt();
		if (iC < 65 || iC > 127 || (iC>90 && iC<97)) {
			aRet[i] = '&#'+iC+';';
		} else {
			aRet[i] = str[i];
		}
	}
	return aRet.join('');
}


exports.defineTags = function(dictionary) {
	dictionary.defineTag('implements', {
		mustHaveValue:true,
		canHaveType:true,
	    onTagged: function(doclet, tag) {
	    	doclet.implements = doclet.implements || [];
	        doclet.implements.push( { name:tag.text, link:"{@link "+tag.text+"}" } );
	    }
	});
	dictionary.defineTag('generic', {
		onTagged: function(doclet, tag) {
			doclet.genericAnnotation = HTMLEncode( tag.text ) ||"MIERDA";
		}
	});

	dictionary.lookUp('augments').synonym('extends');
}

exports.handlers = {
	newDoclet: function(e) {
		// e.doclet will refer to the newly created doclet
		// you can read and modify properties of that doclet if you wish
		if(e.doclet.kind == "class")
		{
			//console.log(e.doclet)
		}
	},
	beforeParse: function(e) {


		// Remove All but conserve Comments
		var comments = e.source.match(/\/\*\*[\s\S]+?\*\//g);
		if (comments) {
			e.source = comments.join('\n\n');
		}

		// Search for class declarations and check for generics descriptors
		// Replace it to clean class name & new doclet @generic with the generics descriptor
		var findClasses = /(@class .*)(<.*>)/g;
		var foundClasses;
		while ( foundClasses = findClasses.exec(e.source))
		{
			e.source = e.source.replace( foundClasses[0], foundClasses[1]+'\n * @generic '+foundClasses[2])
		}



	}
};


