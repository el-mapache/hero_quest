/**
	* TeenyLib helper functions
	* =^..^=
**/
(function(TL, undefined) {
	TL.forEach = function(array, func) {
    var ii = 0,
        len = array.length;

		for(var ii; ii < len; ii++) {
			func(array[ii], ii, array);
		}
	};

	TL.extend = function(source, override) {
    var output = {};

    for (var base in source) {
      output[base] = source[base];
    }

    for (var key in override) {
      output[key] = override[key];
    }

    return output;
  };

	TL.reduce = function(combineFunc, base, array) {
		this.forEach(array, function(element) {
			base = combineFunc(base, element);
		});

		return base;
	};

	TL.map = function(func, lst) {
		var result = [];

		this.forEach(lst, function(element) {
			result.push(func(element));
		});

		return result;
	};

	TL.asArray = function(quasiArray,startIdx) {
		var result = [];
		for(var i = (startIdx || 0);i < quasiArray.length; i++) {
			result.push(quasiArray[i]);
		}

		return result;
	};

	TL.partial = function(func) {
		var fixedArgs = this.asArray(arguments, 1),
				self = this;

		return function() {
			return func.apply(null, fixedArgs.concat(self.asArray(arguments)));
		}
	};

	// Takes a function and an array, then tests each element of the array for some value using the function
	TL.any = function(array, test) {
    var ii = 0,
        len = array.length
        found = false;

		for (ii = 0; ii < len; ii++) {
			var found = test(array[ii]);

			if (found) break;
		}

		return found;
	};

	TL.every = function(array, test) {
		var output = [],
        ii = 0,
        len = array.length;

    for (ii; ii < len; ii++) {
			var found = test(array[ii]);

			if (found) output.push(array[ii]);
		}

		return output;
	};

	TL.flatten = function(arrays) {
		var result = [],
        self = this;

    this.forEach(arrays, function(array) {
      self.forEach(array,function(element) {
        result.push(element);
      });
    });
		return result;
	};

  TL.filter = function(test,lst) {
    var result = [],
        self = this;

    this.forEach(lst,function(element) {
      if(test(element))
        result.push(element);
    });

    return result;
  };

	TL.forEachIn = function(object, action) {
	  for(var property in object) {
	  	if(Object.prototype.hasOwnProperty.call(object, property))
	    	action(property, object[property]);
	  }
	};

	TL.bind = function(func, object) {
    var fixedArgs = this.asArray(arguments, 2),
        self = this;

		return function() {
			return func.apply(object, fixedArgs.concat(self.asArray(arguments)));
		};
	};
})(window.TL = window.TL || {});
