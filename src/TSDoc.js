var path = require('path');
var TSDdoc = (function () {
    function TSDdoc() {
    }
    TSDdoc.trace = function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    };

    TSDdoc.cmd = function () {
        var argv = require('optimist');
        var fs = require('fs');

        var sys = require('sys');
        var exec = require('child_process').exec;
        var configFile = process.cwd() + path.sep + 'tsdoc.json';
        var configContents = fs.readFileSync(path.resolve(__dirname, '..' + path.sep + 'template' + path.sep + 'tsdoc.json'), 'utf8');

        argv = argv.usage('TypescriptPreprocessor v' + TSDdoc.nodePackage.version + '\nUsage: $0 --root projectRootDir -source inputFile').options('s', {
            alias: 'source',
            describe: 'The root location where JSDoc will search for files to process',
            default: false,
            required: false
        }).options('d', {
            alias: 'destination',
            describe: 'Output Documentation folder',
            default: false,
            required: false
        }).options('i', {
            alias: 'install',
            describe: 'Install TSDoc config to current dir',
            default: false,
            required: false
        }).argv;

        if (argv.i || argv.install) {
            var parentDir = path.resolve(process.cwd(), '..' + path.sep);
            var templateDir = path.resolve(__dirname, '..' + path.sep + 'template');
            var outConfig = configContents.replace(/\$TSDOC\$/gi, templateDir);
            outConfig = outConfig.replace(/\$SOURCE\$/gi, process.cwd() + path.sep + 'src' + path.sep);
            outConfig = outConfig.replace(/\$DESTINATION\$/gi, process.cwd() + path.sep + 'docs');
            outConfig = outConfig.replace(/\$USERNAME\$/gi, TSDdoc.getUserName());
            outConfig = outConfig.replace(/\YEAR\$/gi, new Date().getFullYear());
            outConfig = outConfig.replace(/\$PROJECTNAME\$/gi, process.cwd().substr(process.cwd().lastIndexOf(path.sep) + 1));

            fs.writeFileSync(configFile, outConfig, 'utf8');
            console.log('TSDoc tsdoc.json generated.');
            return;
        } else {
            if (fs.existsSync(configFile)) {
                var configJson = require(configFile);
                var source = argv.s ? argv.s : configJson.tsdoc.source;
                var destination = argv.d ? argv.d : configJson.tsdoc.destination;
                exec("jsdoc " + configJson.tsdoc.source + " -c " + configFile + " -d " + configJson.tsdoc.destination, TSDdoc.trace);
            } else {
                console.log('No tsdoc.json found, please use -i to generate one');
            }
        }
    };
    TSDdoc.getUserName = function () {
        var userName = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
        return userName.substr(userName.lastIndexOf(path.sep) + 1);
    };
    TSDdoc.nodePackage = require('./../package.json');
    return TSDdoc;
})();
exports.TSDdoc = TSDdoc;

//@ sourceMappingURL=TSDoc.js.map
