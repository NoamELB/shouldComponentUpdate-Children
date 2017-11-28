import React from 'react';

export function useShallowEqual(WrappedComponent) {
    class ShallowEqualEnhancer extends WrappedComponent {
        shouldComponentUpdate(nextProps, nextState) {
            let shouldUpdate = false;
            if (!super.shouldComponentUpdate || super.shouldComponentUpdate(nextProps, nextState)) {
                shouldUpdate = shallowEqual(this.props, nextProps, this.state, nextState);
            }
            return shouldUpdate;
        }
    }
    ShallowEqualEnhancer.displayName = `ShallowEqualEnhanced${WrappedComponent.displayName || WrappedComponent.name || 'Component'}`;

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
export function shouldComponentUpdate(nextProps, nextState) {
    return shallowEqual(this.props, nextProps, this.state, nextState);
}

/**
 * @param {Object} thisProps 
 * @param {Object} nextProps 
 * @param {Object} thisState 
 * @param {Object} nextState 
 */
export function shallowEqual(thisProps, nextProps, thisState, nextState) {
    return !shallowEqualState(thisState, nextState) || !shallowEqualWithoutReactElements(thisProps, nextProps);
}

/**
 * @param {Object} thisState
 * @param {Object} nextState
 * @returns {Boolean}
 */
export function shallowEqualState(thisState, nextState) {
    return thisState === nextState
}

/**
 * Perform a shallow equal to every prop that is not a React Element
 * This will return true for unchanged props (where the only changes are the react elements props like 'children')
 * @param {Object} thisProps
 * @param {Object} nextProps
 * @returns {Boolean}
 */
export function shallowEqualWithoutReactElements(thisProps, nextProps) {
    let equals = false;
    if (thisProps === nextProps) {
        equals = true;
    } else if (typeof thisProps === 'object' && typeof nextProps === 'object') {
        equals = true;
        const propNames = new Set(Object.keys(thisProps), Object.keys(nextProps));
        for (const propName of propNames) {
            if (thisProps[propName] !== nextProps[propName] && !isReactElement(thisProps[propName])) {
                // No need to check nextProps[propName] as well, as we know they are not equal
                equals = false;
                break;
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
    let isElem = false;
    if (React.isValidElement(suspectedElement)) {
        isElem = true;
    } else if (Array.isArray(suspectedElement)) {
        for (let i = 0, l = suspectedElement.length; i < l; i++) {
            if (React.isValidElement(suspectedElement[i])) {
                isElem = true;
                break;
            }
        }
    }
    return isElem;
}