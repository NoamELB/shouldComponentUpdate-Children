'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function useShallowEqual(WrappedComponent) {
    var ShallowEqualEnhancer = function (_WrappedComponent) {
        _inherits(ShallowEqualEnhancer, _WrappedComponent);

        function ShallowEqualEnhancer() {
            _classCallCheck(this, ShallowEqualEnhancer);

            return _possibleConstructorReturn(this, (ShallowEqualEnhancer.__proto__ || Object.getPrototypeOf(ShallowEqualEnhancer)).apply(this, arguments));
        }

        _createClass(ShallowEqualEnhancer, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps, nextState) {
                var shouldUpdate = false;
                if (!_get(ShallowEqualEnhancer.prototype.__proto__ || Object.getPrototypeOf(ShallowEqualEnhancer.prototype), 'shouldComponentUpdate', this) || _get(ShallowEqualEnhancer.prototype.__proto__ || Object.getPrototypeOf(ShallowEqualEnhancer.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState)) {
                    shouldUpdate = shallowEqual(this.props, nextProps, this.state, nextState);
                }
                return shouldUpdate;
            }
        }]);

        return ShallowEqualEnhancer;
    }(WrappedComponent);

    ShallowEqualEnhancer.displayName = 'ShallowEqualEnhanced' + (WrappedComponent.displayName || WrappedComponent.name || 'Component');

    return ShallowEqualEnhancer;
}

/**
 * Use this function with your "this" in its context.
 * @example
 * return shouldComponentUpdate.call(this, nextProps, nextState);
 * @example
 * return shouldComponentUpdate.apply(this, [nextProps, nextState]);
 * @example
 * return shouldComponentUpdate.bind(this)(nextProps, nextState);
 * @param {Object} nextProps 
 * @param {Object} nextState 
 */
function shouldComponentUpdate(nextProps, nextState) {
    return shallowEqual(this.props, nextProps, this.state, nextState);
}

/**
 * @param {Object} thisProps 
 * @param {Object} nextProps 
 * @param {Object} thisState 
 * @param {Object} nextState 
 */
function shallowEqual(thisProps, nextProps, thisState, nextState) {
    return !shallowEqualState(thisState, nextState) || !shallowEqualWithoutReactElements(thisProps, nextProps);
}

/**
 * @param {Object} thisState
 * @param {Object} nextState
 * @returns {Boolean}
 */
function shallowEqualState(thisState, nextState) {
    return thisState === nextState;
}

/**
 * Perform a shallow equal to every prop that is not a React Element
 * This will return true for unchanged props (where the only changes are the react elements props like 'children')
 * @param {Object} thisProps
 * @param {Object} nextProps
 * @returns {Boolean}
 */
function shallowEqualWithoutReactElements(thisProps, nextProps) {
    var equals = false;
    if (thisProps === nextProps) {
        equals = true;
    } else if ((typeof thisProps === 'undefined' ? 'undefined' : _typeof(thisProps)) === 'object' && (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object') {
        equals = true;
        var propNames = new Set(Object.keys(thisProps), Object.keys(nextProps));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var propName = _step.value;

                if (thisProps[propName] !== nextProps[propName] && !isReactElement(thisProps[propName])) {
                    // No need to check nextProps[propName] as well, as we know they are not equal
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

/**
 * If the provided argument is a valid react element or an array that contains at least
 * one valid react element in it
 * @param {*} suspectedElement
 * @returns {Boolean}
 */
function isReactElement(suspectedElement) {
    var isElem = false;
    if (React.isValidElement(suspectedElement)) {
        isElem = true;
    } else if (Array.isArray(suspectedElement)) {
        for (var i = 0, l = suspectedElement.length; i < l; i++) {
            if (React.isValidElement(suspectedElement[i])) {
                isElem = true;
                break;
            }
        }
    }
    return isElem;
}

exports.useShallowEqual = useShallowEqual;
exports.shouldComponentUpdate = shouldComponentUpdate;
exports.shallowEqual = shallowEqual;
exports.shallowEqualState = shallowEqualState;
exports.shallowEqualWithoutReactElements = shallowEqualWithoutReactElements;
