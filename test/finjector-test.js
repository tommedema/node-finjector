var finjector       = require('../finjector'),
    vows            = require('vows'),
    assert          = require('assert'),
    fs              = require('fs'),
    injectFile      = __dirname + '/test.txt',
    data            = '\nthis is an example entry to be injected between the delimiters', 
    startDelimiter  = '/* routines-start */\n',
    endDelimiter    = '\n/* routines-end */';

vows.describe('finjector test').addBatch({
    
    'inject property': {
        
        topic: function() {
            return finjector.inject;
        },
        
        'is defined as a function': function(injectFn) {
            assert.deepEqual(typeof(injectFn), 'function');
        },
        
        'when called' : {
            
            topic: function() {
                finjector.inject(injectFile, data, startDelimiter, endDelimiter, this.callback);
            },
            
            'does not result in an error': function(err) {
                assert.ifError(err);
            },
            
            'results in injected file': function() {
                var newData = fs.readFileSync(injectFile, 'utf8');
                assert.notDeepEqual(newData.indexOf(data), -1);
            }
            
        }
        
    }
    
}).export(module);