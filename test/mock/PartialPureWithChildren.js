import React from 'react';
import useRenderingCounter from "./renderingCounter";

class PartialPureWithChildren extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.importantProp !== nextProps.importantProp;
    }
}
export default useRenderingCounter(PartialPureWithChildren);