(function (root, name, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return root[name] = factory();
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root[name] = factory();
  }
}(this, 'getTabSize', function () {
  function exports (text) {
    var spaceCounts = {};
    var tabs = text.match(/^[ \t]*/mg).map(function (indent) {
      var tabs = exports.indices(indent, '\t');
      var spaces = indent.length - tabs.length;
      spaceCounts[spaces] = (spaceCounts[spaces] || 0) + 1;
      return tabs;
    });

    var spaces = Object.keys(spaceCounts).map(Number);
    var counts = spaces.map(function (space) { return spaceCounts[space]; });
    var avg = exports.mean(counts);
    return exports.gcd(spaces.filter(function (c, i) {
      return counts[i] >= avg;
    }));
  }

  exports.indices = function (haystack, needle) {
    var result = [];
    while (true) {
      var i = haystack.indexOf(needle, i);
      if (i === -1) break;
      result.push(i);
    }
    return result;
  };

  exports.gcd = function (xs) {
    return xs.reduce(function (g, x) {
      while (x) {
        var tmp = g;
        g = x;
        x = tmp % x;
      }
      return g;
    }, 0);
  };

  exports.mean = function (xs) {
    return xs.reduce(function (a, b) {
      return a + b;
    }) / xs.length;
  };

  return exports;
}));
