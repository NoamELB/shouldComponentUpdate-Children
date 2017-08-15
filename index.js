import React from 'react';

export default function useShallowEqual(WrappedComponent) {
    class ShallowEqualEnhancer extends WrappedComponent {
        shouldComponentUpdate(nextProps, nextState) {
            if (!super.shouldComponentUpdate || super.shouldComponentUpdate()) {
                if (this.state !== nextState) {
                    return true;
                }
                if (!shallowEqualWithoutReactElements(this.props, nextProps)) {
                    return true;
                }
            }
            return false;
        }
    }
    ShallowEqualEnhancer.displayName = `ShallowEqualEnhanced${WrappedComponent.displayName || WrappedComponent.name || 'Component'}`;

    return ShallowEqualEnhancer;
}

function shallowEqualWithoutReactElements(objectA, objectB) {
    let equals = false;
    if (objectA === objectB) {
        equals = true;
    } else if (typeof objectA === 'object' && typeof objectB === 'object') {
        const keys = new Set(Object.keys(objectA), Object.keys(objectB));
        equals = true;
        for (const key of keys) {
            // TODO: shortly explain why it is enough to only check objectA
            if (objectA[key] !== objectB[key] && !isReactElement(objectA[key])) {
                equals = false;
                break;
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
        for (let i = 0, l = suspectedElement.length; i < l; i++) {
            if (React.isValidElement(suspectedElement[i])) {
                return true;
            }
        }
    }
    return false;
}