// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should work', function(done) {
        var http = require('http');

        var options = {
            host: 'ec2-54-149-117-43.us-west-2.compute.amazonaws.com',
            port: '3000',
            path: '/views/inventory/daily/field/house'
        };

        callback = function(response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                console.log(str);
                data = eval(str);
                // assert.equal([1, 2, [3, 4]], [1, 2, [3, 4]]);
                // assert.equal(true, [1, 2, [3, 4]].equals([1, 2, [3, 4]]));
                assert.equal(true, data.equals(["5동","6동","7동","8동","9동","10동"]));
                done();
            });
        }

        http.request(options, callback).end();
    });
  });
});

describe('mother', function() {
  describe('inclusion', function() {
    it('should work', function(done) {
        var http = require('http');

        var options = {
            host: 'ec2-54-149-117-43.us-west-2.compute.amazonaws.com',
            port: '3000',
            path: '/mother/introduction/Tue%20May%2009%202017%2009:00:00%20GMT+0900%20(KST)'
        };

        callback = function(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                console.log(str);
                data = eval(str);
                assert.equal(true, data.equals("QWERTY!!!"));
                done();
            });
        }

        http.request(options, callback).end();
    });
  });
});
