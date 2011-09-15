var fs = require('fs');

exports.inject = function(injectFile, injData, startDelimiter, endDelimiter, cb) {
    if (!cb) cb = function() {}; /* callback is optional */
    
    /* check input */
    if (typeof(injectFile) !== 'string' || typeof(injData) !== 'string' || typeof(startDelimiter) !== 'string' || typeof(endDelimiter) !== 'string') {
        return cb('invalid injectFile, data, startDelimiter or endDelimiter given');
    }
    
    /* read input file */
    fs.readFile(injectFile, 'utf8', function _readFile(err, data) {
        if (err) return cb(err);
        
        /* find injection point */
        var startLoc    = data.indexOf(startDelimiter),
            endLoc      = data.indexOf(endDelimiter);
        
        /* validate */
        if (startLoc === -1 || endLoc === -1 || startLoc > endLoc) {
            return cb('cannot find start or end delimiter');
        }
        
        /* remove current entries */        
        data = data.substring(0, startLoc + startDelimiter.length - 1) + data.substring(endLoc);
        
        /* relocate end location */
        endLoc = data.indexOf(endDelimiter);
        
        /* inject data */
        data = data.substring(0, startLoc + startDelimiter.length - 1) + injData + data.substring(endLoc);
        
        /* write file */
        fs.writeFile(injectFile, data, 'utf8', function _onWritten(err) {
            if (err) return cb('cannot write to file');
            
            /* done */
            cb();
        });
    });
};