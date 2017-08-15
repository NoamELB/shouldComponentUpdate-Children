import React from 'react';
import useRenderingCounter from "./renderingCounter";

class PureWithChildren extends React.PureComponent {}

export default useRenderingCounter(PureWithChildren);