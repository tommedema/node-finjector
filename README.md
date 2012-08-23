[![build status](https://secure.travis-ci.org/tommedema/node-finjector.png)](http://travis-ci.org/tommedema/node-finjector)
finjector
======

Injects given string to file between two delimiters.

NOTE 1: all data between the given delimiter is replaced by the new data. Use at your own risk.

NOTE 2: this module is not as efficient as it could be. It currently loads the entire file in memory. If you need to do this frequently, you should consider a streaming based approach.

Install
----------

    npm install finjector

Example 1
----------

    var finjector       = require('finjector'),
        injectFile      = __dirname + '/bootstrap.js',
        data            = 'this is an example entry to be injected between the delimiters', 
        startDelimiter  = '/* routines-start */\n',
        endDelimiter    = '\n/* routines-end */';
    
    finjector.inject(injectFile, data, startDelimiter, endDelimiter, function(err) {
        if (err) throw new Error('Failed to inject to file: ' + err);
        
        console.log('successfully injected data to file between delimiters');
    }); 