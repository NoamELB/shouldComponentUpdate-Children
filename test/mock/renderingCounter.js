import React from 'react';

export default function useRenderingCounter(WrappedComponent) {
    class RenderingCounterEnhancer extends WrappedComponent {
        render() {
            this.rendered = (this.rendered || 0) + 1;
            return <div>{this.props.children}</div>;
        }
    }
    RenderingCounterEnhancer.displayName = `RenderingCounterEnhancer${WrappedComponent.displayName || WrappedComponent.name || 'Component'}`;

    return RenderingCounterEnhancer;
}