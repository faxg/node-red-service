
const fs = require('fs');


/**
 * Fxn that returns a JSON stringified version of an object.
 * This fxn uses a custom replacer function to handle circular references
 * see http://stackoverflow.com/a/11616993/3043369
 * param {object} object - object to stringify
 * returns {string} JSON stringified version of object
 */
function JSONStringify(object) {
    var cache = [];        
    var str = JSON.stringify(object,
        // custom replacer fxn - gets around "TypeError: Converting circular structure to JSON" 
        function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        }, 2);
    cache = null; // enable garbage collection
    return str;
};


function dump (obj, filename){
    fs.writeFile(filename, JSONStringify(obj) , function(err) {
        if(err) {
            return console.log(err);
        }
    });
}


module.exports = function(RED) {

    
	// The node type
    function LowerCaseNode(config) {
	
		RED.nodes.createNode(this,config);
        var node = this;
        
	
		node.on('input', function(msg) {
            var p = JSON.stringify(msg.payload, null, 2)
            // dump (RED, './.red.json')
            // dump (config, './.config.json')

            msg.payload = p.toLowerCase();
            node.send(msg);
        });
	}
	
	// register node type
    RED.nodes.registerType("lowercase",LowerCaseNode);
}