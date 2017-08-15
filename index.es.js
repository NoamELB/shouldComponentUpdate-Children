import React from 'react';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function useShallowEqual(WrappedComponent) {
    var ShallowEqualEnhancer = function (_WrappedComponent) {
        inherits(ShallowEqualEnhancer, _WrappedComponent);

        function ShallowEqualEnhancer() {
            classCallCheck(this, ShallowEqualEnhancer);
            return possibleConstructorReturn(this, (ShallowEqualEnhancer.__proto__ || Object.getPrototypeOf(ShallowEqualEnhancer)).apply(this, arguments));
        }

        createClass(ShallowEqualEnhancer, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps, nextState) {
                if (!get(ShallowEqualEnhancer.prototype.__proto__ || Object.getPrototypeOf(ShallowEqualEnhancer.prototype), 'shouldComponentUpdate', this) || get(ShallowEqualEnhancer.prototype.__proto__ || Object.getPrototypeOf(ShallowEqualEnhancer.prototype), 'shouldComponentUpdate', this).call(this)) {
                    if (this.state !== nextState) {
                        return true;
                    }
                    if (!shallowEqualWithoutReactElements(this.props, nextProps)) {
                        return true;
                    }
                }
                return false;
            }
        }]);
        return ShallowEqualEnhancer;
    }(WrappedComponent);

    ShallowEqualEnhancer.displayName = 'ShallowEqualEnhanced' + (WrappedComponent.displayName || WrappedComponent.name || 'Component');

    return ShallowEqualEnhancer;
}

function shallowEqualWithoutReactElements(objectA, objectB) {
    var equals = false;
    if (objectA === objectB) {
        equals = true;
    } else if ((typeof objectA === 'undefined' ? 'undefined' : _typeof(objectA)) === 'object' && (typeof objectB === 'undefined' ? 'undefined' : _typeof(objectB)) === 'object') {
        var keys = new Set(Object.keys(objectA), Object.keys(objectB));
        equals = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                // TODO: shortly explain why it is enough to only check objectA
                if (objectA[key] !== objectB[key] && !isReactElement(objectA[key])) {
                    equals = false;
                    break;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return equals;
}

function isReactElement(suspectedElement) {
    if (React.isValidElement(suspectedElement)) {
        return true;
    }
    if (Array.isArray(suspectedElement)) {
        for (var i = 0, l = suspectedElement.length; i < l; i++) {
            if (React.isValidElement(suspectedElement[i])) {
                return true;
            }
        }
    }
    return false;
}

export default useShallowEqual;
