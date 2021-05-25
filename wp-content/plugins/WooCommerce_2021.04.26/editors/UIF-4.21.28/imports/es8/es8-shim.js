
                (function(){
                    if(!Array.prototype.flat){
                        var _flatten = function(arr, result = []) {
                            result = result || [];
                            for (var i = 0, length = arr.length; i < length; i++) {
                                var value = arr[i];
                                if (value instanceof Array) {
                                    _flatten(value, result);
                                } else {
                                    result.push(value);
                                }
                            }
                            return result;
                        };
                        Array.prototype.flat = function(){
                            return _flatten(this);
                        };
                    }
                })();
            if(!Promise.prototype['finally']){Promise.prototype['finally'] = function(callback) {
                          var constructor = this.constructor;
                          return this.then(
                            function(value) {
                              return constructor.resolve(callback()).then(function() {
                                return value;
                              });
                            },
                            function(reason) {
                              return constructor.resolve(callback()).then(function() {
                                return constructor.reject(reason);
                              });
                            }
                          );
                    };}