import React from 'react';
import useRenderingCounter from "./renderingCounter";

class ImpureWithChildren extends React.Component {}

export default useRenderingCounter(ImpureWithChildren);