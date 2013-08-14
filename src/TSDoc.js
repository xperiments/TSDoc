///<reference path="../dec/Node.d.ts"/>
var path = require('path');
var TSDdoc = (function () {
    function TSDdoc() {
    }
    TSDdoc.cmd = function () {
        var argv = require('optimist').argv;
        var fs = require('fs');

        var sys = require('sys');
        var exec = require('child_process').exec;
        var configFile = process.cwd() + path.sep + 'tsdoc.json';
        var readmeFile = process.cwd() + path.sep + 'readme.md';
        var configContents = fs.readFileSync(path.resolve(__dirname, '..' + path.sep + 'template' + path.sep + 'tsdoc.json'), 'utf8');
        var nodePackage = require('./../package.json');
        console.log('TSDOC v' + nodePackage.version);

        if (argv.i || argv.install) {
            var parentDir = path.resolve(process.cwd(), '..' + path.sep);
            var templateDir = path.resolve(__dirname, '..' + path.sep + 'template');
            var outConfig = configContents.replace(/\$TSDOC\$/gi, TSDdoc.processPath(templateDir));
            outConfig = outConfig.replace(/\$SOURCE\$/gi, TSDdoc.processPath(process.cwd() + path.sep + 'src' + path.sep));
            outConfig = outConfig.replace(/\$DESTINATION\$/gi, TSDdoc.processPath(process.cwd() + path.sep + 'docs'));
            outConfig = outConfig.replace(/\$USERNAME\$/gi, TSDdoc.getUserName());
            outConfig = outConfig.replace(/\$YEAR\$/gi, new Date().getFullYear());
            outConfig = outConfig.replace(/\$PROJECTNAME\$/gi, TSDdoc.processPath(process.cwd().substr(process.cwd().lastIndexOf(path.sep) + 1)));

            fs.writeFileSync(configFile, outConfig, 'utf8');
            console.log('TSDoc tsdoc.json generated.');
            return;
        } else {
            if (fs.existsSync(configFile)) {
                console.log('TSDoc Generating doc...');
                var configJson = require(configFile);
                var source = configJson.tsdoc.source;
                var destination = configJson.tsdoc.destination;
                var readme = TSDdoc.getReadmeFile();
                var configFileParam = " -c " + configFile;
                var destinationParam = " -d " + configJson.tsdoc.destination;
                var tutorials = configJson.tsdoc.tutorials == "" ? "" : " -u " + configJson.tsdoc.tutorials;
                var jsonParams = [
                    "jsdoc ",
                    configJson.tsdoc.source,
                    configFileParam,
                    destinationParam,
                    tutorials,
                    readme
                ].join('');
                exec(jsonParams, TSDdoc.onJSDoc);
            } else {
                console.log('No tsdoc.json found, please use -i to generate one');
            }
        }
    };
    TSDdoc.onJSDoc = function (error, stdout, stderr) {
        if (stdout != "")
            console.log(stdout);
        console.log('TSDoc Done.');
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    };
    TSDdoc.getUserName = function () {
        var userName = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
        return userName.substr(userName.lastIndexOf(path.sep) + 1);
    };

    TSDdoc.getReadmeFile = function () {
        var fs = require('fs');
        var files = fs.readdirSync(process.cwd());
        var readme = "";
        for (var i = 0; i < files.length; i++) {
            if (files[i].toLowerCase().indexOf('readme.md') != -1) {
                readme = ' ' + files[i];
            }
        }
        return readme;
    };

    TSDdoc.processPath = function (path) {
        path = path.indexOf(':') != -1 ? path.split(':')[1] : path;
        path = path.replace(/\\/gi, '/');
        return path;
    };
    TSDdoc.nodePackage = require('./../package.json');
    return TSDdoc;
})();
(module).exports = TSDdoc;
//# sourceMappingURL=TSDoc.js.map
