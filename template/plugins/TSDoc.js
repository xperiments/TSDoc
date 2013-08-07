
exports.defineTags = function(dictionary) {
	dictionary.defineTag('implements', {
		mustHaveValue:true,
		canHaveType:true,
	    onTagged: function(doclet, tag) {
	    	doclet.implements = doclet.implements || [];
	        doclet.implements.push( { name:tag.text, link:"{@link "+tag.text+"}" } );
	    }
	}); 

	dictionary.lookUp('augments').synonym('extends');
}

exports.handlers = {
    newDoclet: function(e) {
        //console.log(e);
    }
}