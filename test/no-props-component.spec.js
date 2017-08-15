import React from 'react';
import ReactDOM from 'react-dom';

import useShallowEqual from '../index';
import NoProps from "./mock/ImpureWithChildren";

describe("NoProps", () => {
    let root;
    beforeEach(() => {
        root = document.createElement('div');
    });

    describe("Without the hoc useShallowEqual", () => {
        it("should render twice when has no children at all", () => {
            const wrapper = ReactDOM.render(<NoProps></NoProps>, root);
            ReactDOM.render(<NoProps></NoProps>, root);
            expect(wrapper.rendered).toBe(2);
        });

        it("should render twice when has string children", () => {
            const wrapper = ReactDOM.render(<NoProps>Children text</NoProps>, root);
            ReactDOM.render(<NoProps>Children text</NoProps>, root);
            expect(wrapper.rendered).toBe(2);
        });

        it("should render twice when has React object children", () => {
            const wrapper = ReactDOM.render(<NoProps><p>Children object</p></NoProps>, root);
            ReactDOM.render(<NoProps><p>Children object</p></NoProps>, root);
            expect(wrapper.rendered).toBe(2);
        });
    });

    describe("With useShallowEqual", () => {
        let NoPropsShallowEqual;
        beforeAll(() => {
            NoPropsShallowEqual = useShallowEqual(NoProps);
        });

        it("should render once when has no children at all", () => {
            const wrapper = ReactDOM.render(<NoPropsShallowEqual></NoPropsShallowEqual>, root);
            ReactDOM.render(<NoPropsShallowEqual></NoPropsShallowEqual>, root);
            expect(wrapper.rendered).toBe(1);
        });

        it("should render once when has string children", () => {
            const wrapper = ReactDOM.render(<NoPropsShallowEqual>Children text</NoPropsShallowEqual>, root);
            ReactDOM.render(<NoPropsShallowEqual>Children text</NoPropsShallowEqual>, root);
            expect(wrapper.rendered).toBe(1);
        });

        it("should render once when has React object children", () => {
            const wrapper = ReactDOM.render(<NoPropsShallowEqual><p>Children object</p></NoPropsShallowEqual>, root);
            ReactDOM.render(<NoPropsShallowEqual><p>Children object</p></NoPropsShallowEqual>, root);
            expect(wrapper.rendered).toBe(1);
        });
        
        it("should render once when has multiple React object children", () => {
            const wrapper = ReactDOM.render(<NoPropsShallowEqual><p>Children object</p><p>Another child</p></NoPropsShallowEqual>, root);
            ReactDOM.render(<NoPropsShallowEqual><p>Children object</p><p>Another child</p></NoPropsShallowEqual>, root);
            expect(wrapper.rendered).toBe(1);
        });

        it("should render twice when has React object children and state changed", () => {
            const wrapper = ReactDOM.render(<NoPropsShallowEqual><p>Children object</p></NoPropsShallowEqual>, root);
            wrapper.setState({});
            expect(wrapper.rendered).toBe(2);
        });
        
        it("should have a new component-specific display name", () => {
            expect(NoPropsShallowEqual.displayName).toBe("ShallowEqualEnhancedRenderingCounterEnhancerImpureWithChildren");
        });
    });
});