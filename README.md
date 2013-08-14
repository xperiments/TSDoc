#TSDoc#

A [JSDoc3](http://usejsdoc.org/) base themed generator generator for use with Typescript Projects, uses a highly modified version [Docstrap](https://github.com/terryweiss/docstrap/) JsDoc3 Template. 

Actually it only supports parsing of plain comments, also it needs some added "manual" anotation. You can see an output [Example](http://xperiments.github.io/TSDoc/docs/index.html).

![image](http://xperiments.github.io/TSDoc/TSDocScreen.png)


## Changes ##

### v0.0.4 ###
* Added Windows Support

### v0.0.3 ###
* Added Auto Include of Readme.md file
* Added basic Generics support
* Added Enums support
* Added Callbacks support
* Added Events support
* Added Tutorial support
* Enhaced search with autocomplete

### v0.0.1 ###
 
 * Initial Release 


## Annotating your TS project

You can find annotated source files inside the output [example](http://xperiments.github.io/TSDoc/docs/index.html) ( Click the eye icon to see the source )



## Instalation ##

	sudo npm install tsdoc -g
	
## Preparing your project ##

###Configuration###

TSDoc uses the same [conf.json](http://usejsdoc.org/about-configuring-jsdoc.html) (now tsdoc.json) config file used in JsDoc3, but adds the following new options:

	"tsdoc":{
		"source"			:"{string}",
		"destination"		:"{string}",
		"systemName"		:"{string}",
		"footer"			:"{string}",
		"copyright"			:"{string}",
		"outputSourceFiles" :"{boolean}",
		"commentsOnly" 		:"{boolean}"
	}


####Options####

* __source__ Source folder where search .ts files
* __destination__ Documentation output folder
* __tutorials__ Set the source folder for tutorial parsing (.md, .html files)
* __systemName__ The project name
* __footer__ Footer string added to each page
* __copyright__ Copyright string added to each page
* __outputSourceFiles__ Set to true to enable source files processing 
* __commentsOnly__ Set to false to use template with plain JS ( experimental )

### Adding a default tsdoc.json file

You can automatically add a new tsdoc.json file to any folder in yor system, typing in your console:

	$> tsdoc -i

## Command line options ##

	$> tsdoc -i [--install]
	This will install the necesary tsdoc files to the current working directory.

	$> tsdoc
	Generaties documentation from tsdoc.json settings.
	
## License ##
		
Copyright (c) 2013 Pedro Casaubon. All rights reserved.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

