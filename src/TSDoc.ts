///<reference path="../dec/Node.d.ts"/>
var path = require('path');
class TSDdoc
{
	public static nodePackage = require( './../package.json' );


	/**
	 * @member i
	 * @param error
	 * @param stdout
	 * @param stderr
	 */
	public static trace(error, stdout, stderr):void
	{
<<<<<<< HEAD
        console.log(stdout);
=======

		console.log( stdout );
>>>>>>> development
		if (error !== null)
		{
			console.log('exec error: ' + error);
		}
	}

	public static cmd():void
	{
		var argv = require('optimist');
		var fs = require('fs');

		var sys = require('sys')
		var exec = require('child_process').exec;
		var configFile = process.cwd()+path.sep+'tsdoc.json';
		var readmeFile = process.cwd()+path.sep+'readme.md';
		var configContents = fs.readFileSync(path.resolve( __dirname, '..'+path.sep+'template'+path.sep+'tsdoc.json'),'utf8');


		argv = argv.usage('TypescriptPreprocessor v'+TSDdoc.nodePackage.version+'\nUsage: $0 --root projectRootDir -source inputFile')
		.options('s', {
			alias : 'source',
			describe:'The root location where JSDoc will search for files to process',
			default : false,
			required:false
		})
		.options('d', {
			alias : 'destination',
			describe:'Output Documentation folder',
			default : false,
			required:false
		})
		.options('i', {
			alias : 'install',
			describe:'Install TSDoc config to current dir',
			default : false,
			required:false
		}).argv;

		if( argv.i || argv.install )
		{

			var parentDir = path.resolve( process.cwd(), '..'+path.sep);
			var templateDir = path.resolve( __dirname, '..'+path.sep+'template');
			var outConfig = configContents.replace(/\$TSDOC\$/gi, templateDir );
				outConfig = outConfig.replace(/\$SOURCE\$/gi, process.cwd()+path.sep+'src'+path.sep );
				outConfig = outConfig.replace(/\$DESTINATION\$/gi, process.cwd()+path.sep+'docs' );
				outConfig = outConfig.replace(/\$USERNAME\$/gi, TSDdoc.getUserName() );
				outConfig = outConfig.replace(/\YEAR\$/gi, new Date().getFullYear() );
				outConfig = outConfig.replace(/\$PROJECTNAME\$/gi, process.cwd().substr( process.cwd().lastIndexOf( path.sep )+1 ) );

			fs.writeFileSync( configFile, outConfig, 'utf8');
			console.log('TSDoc tsdoc.json generated.');
			return;
		}
		else
		{
			if( fs.existsSync( configFile ) )
			{

				var configJson:any = require( configFile );
				var source:string = argv.s ? argv.s : configJson.tsdoc.source;
				var destination:string = argv.d ? argv.d : configJson.tsdoc.destination;
<<<<<<< HEAD
				exec("jsdoc "+configJson.tsdoc.source+" -c "+configFile+" -d "+configJson.tsdoc.destination+" -p", TSDdoc.trace );
=======
				var readme = TSDdoc.getReadmeFile();
				var configFileParam = " -c "+configFile;
				var destinationParam = " -d "+configJson.tsdoc.destination;
				var tutorials = configJson.tsdoc.tutorials == "" ? "":" -u "+configJson.tsdoc.tutorials;
				var jsonParams = [
					 "jsdoc "
					,configJson.tsdoc.source
					,configFileParam
					,destinationParam
					,tutorials
					,readme
				].join('');
				exec(jsonParams, TSDdoc.trace );
>>>>>>> development
			}
			else
			{
				console.log('No tsdoc.json found, please use -i to generate one')
			}
		}
	}
	static getUserName()
	{
		var userName:string = <string>(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
		return userName.substr( userName.lastIndexOf( path.sep )+1 );
	}

	static getReadmeFile()
	{
		var fs = require('fs');
		var files = fs.readdirSync(process.cwd());
		var readme="";
		for( var i=0; i<files.length; i++ )
		{
			if( files[i].toLowerCase().indexOf('readme.md') !=-1)
			{
				readme = ' '+files[i];
			}
		}
		console.log( readme )
		return readme;
	}
}
(module).exports = TSDdoc;
