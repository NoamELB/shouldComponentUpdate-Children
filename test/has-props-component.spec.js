import React from 'react';
import ReactDOM from 'react-dom';

import {useShallowEqual} from '../index';
import HasPropsPure from "./mock/PureWithChildren";
import HasPropsImpure from "./mock/ImpureWithChildren";
import ShouldUpdatePartial from "./mock/PartialPureWithChildren";

describe("HasProps", () => {
    let root;
    beforeEach(() => {
        root = document.createElement('div');
    });

    describe("Instead of a Pure Component", () => { 
        describe("Without the hoc useShallowEqual", () => {
            it("should render twice when has no children and prop changed", () => {
                const wrapper = ReactDOM.render(<HasPropsPure importantProp={1}></HasPropsPure>, root);
                ReactDOM.render(<HasPropsPure importantProp={2}></HasPropsPure>, root)
                expect(wrapper.rendered).toBe(2);
            });
    
            it("should render once when has no children and prop didn't change", () => {
                const wrapper = ReactDOM.render(<HasPropsPure importantProp={1}></HasPropsPure>, root);
                ReactDOM.render(<HasPropsPure importantProp={1}></HasPropsPure>, root);
                expect(wrapper.rendered).toBe(1);
            });
    
            it("should render twice when has string children and prop changed", () => {
                const wrapper = ReactDOM.render(<HasPropsPure importantProp={1}>My child</HasPropsPure>, root);
                ReactDOM.render(<HasPropsPure importantProp={2}>My child</HasPropsPure>, root);
                expect(wrapper.rendered).toBe(2);
            });
    
            it("should render once when has string children and prop didn't change", () => {
                const wrapper = ReactDOM.render(<HasPropsPure importantProp={1}>My child</HasPropsPure>, root);
                ReactDOM.render(<HasPropsPure importantProp={1}>My child</HasPropsPure>, root);
                expect(wrapper.rendered).toBe(1);
            });
            
            it("should render twice when has React object children and prop changed", () => {
                const wrapper = ReactDOM.render(<HasPropsPure importantProp={1}><p>My child</p></HasPropsPure>, root);
                ReactDOM.render(<HasPropsPure importantProp={2}><p>My child</p></HasPropsPure>, root);
                expect(wrapper.rendered).toBe(2);
            });
    
            describe("The bug", () => {
                it("should render *twice*!!!!! when has React object children and prop didn't change", () => {
                    // this specific test is the most important one and explains it all
                    // ironically, this test fails with Enzyme
                    const wrapper = ReactDOM.render(<HasPropsPure importantProp={1}><p>My child</p></HasPropsPure>, root);
                    ReactDOM.render(<HasPropsPure importantProp={1}><p>My child</p></HasPropsPure>, root);
                    expect(wrapper.rendered).toBe(2);
                });
            });
    
        });
    
        describe("With useShallowEqual", () => {
            let HasPropsShallowEqual;
            beforeAll(() => {
                HasPropsShallowEqual = useShallowEqual(HasPropsImpure);
            });
    
            describe("Sanity", () => {
                it("should render twice when has no children and prop changed", () => {
                    const wrapper = ReactDOM.render(<HasPropsShallowEqual importantProp={1}></HasPropsShallowEqual>, root);
                    ReactDOM.render(<HasPropsShallowEqual importantProp={2}></HasPropsShallowEqual>, root)
                    expect(wrapper.rendered).toBe(2);
                });
        
                it("should render once when has no children and prop didn't change", () => {
                    const wrapper = ReactDOM.render(<HasPropsShallowEqual importantProp={1}></HasPropsShallowEqual>, root);
                    ReactDOM.render(<HasPropsShallowEqual importantProp={1}></HasPropsShallowEqual>, root);
                    expect(wrapper.rendered).toBe(1);
                });
        
                it("should render twice when has string children and prop changed", () => {
                    const wrapper = ReactDOM.render(<HasPropsShallowEqual importantProp={1}>My child</HasPropsShallowEqual>, root);
                    ReactDOM.render(<HasPropsShallowEqual importantProp={2}>My child</HasPropsShallowEqual>, root);
                    expect(wrapper.rendered).toBe(2);
                });
        
                it("should render once when has string children and prop didn't change", () => {
                    const wrapper = ReactDOM.render(<HasPropsShallowEqual importantProp={1}>My child</HasPropsShallowEqual>, root);
                    ReactDOM.render(<HasPropsShallowEqual importantProp={1}>My child</HasPropsShallowEqual>, root);
                    expect(wrapper.rendered).toBe(1);
                });
                
                it("should render twice when has React object children and prop changed", () => {
                    const wrapper = ReactDOM.render(<HasPropsShallowEqual importantProp={1}><p>My child</p></HasPropsShallowEqual>, root);
                    ReactDOM.render(<HasPropsShallowEqual importantProp={2}><p>My child</p></HasPropsShallowEqual>, root);
                    expect(wrapper.rendered).toBe(2);
                });
            });
    
            describe("The bug fix", () => {
                it("should render *ONCE*!!!!! when has React object children and prop didn't change", () => {
                    const wrapper = ReactDOM.render(<HasPropsShallowEqual importantProp={1}><p>My child</p></HasPropsShallowEqual>, root);
                    ReactDOM.render(<HasPropsShallowEqual importantProp={1}><p>My child</p></HasPropsShallowEqual>, root);
                    expect(wrapper.rendered).toBe(1);
                });
                
                it("should not re-render children if they ever change (because children must be immutable)", () => {
                    const wrapper = ReactDOM.render(<HasPropsShallowEqual importantProp={1}>{true ? <p>First child</p> : <p>2nd child</p>}</HasPropsShallowEqual>, root);
                    ReactDOM.render(<HasPropsShallowEqual importantProp={1}>{false ? <p>First child</p> : <p>2nd child</p>}</HasPropsShallowEqual>, root);
                    expect(root.innerHTML).toContain("First child");
                });
                
                it("should not re-render children if we actually create a new component but forgot to provide a unique key", () => {
                    const wrapper = ReactDOM.render(true ? <HasPropsShallowEqual importantProp={1}><p>First child</p></HasPropsShallowEqual> : <HasPropsShallowEqual importantProp={1}><p>2nd child</p></HasPropsShallowEqual>, root);
                    ReactDOM.render(false ? <HasPropsShallowEqual importantProp={1}><p>First child</p></HasPropsShallowEqual> : <HasPropsShallowEqual importantProp={1}><p>2nd child</p></HasPropsShallowEqual>, root);
                    expect(root.innerHTML).toContain("First child");
                });
                
                it("should re-render children if we actually create a new component and we provide unique key", () => {
                    const wrapper = ReactDOM.render(true ? <HasPropsShallowEqual importantProp={1} key="1"><p>First child</p></HasPropsShallowEqual> : <HasPropsShallowEqual importantProp={1} key="2"><p>2nd child</p></HasPropsShallowEqual>, root);
                    ReactDOM.render(false ? <HasPropsShallowEqual importantProp={1} key="1"><p>First child</p></HasPropsShallowEqual> : <HasPropsShallowEqual importantProp={1} key="2"><p>2nd child</p></HasPropsShallowEqual>, root);
                    expect(root.innerHTML).toContain("2nd child");
                });
            });
        });
    });

    describe("Extends a component that implements shouldComponentUpdate", () => {
        describe("Without the hoc useShallowEqual", () => {
            it("should render once when the important prop didn't change", () => {
                const wrapper = ReactDOM.render(<ShouldUpdatePartial importantProp={1} randomProp={2}><p>My child</p></ShouldUpdatePartial>, root);
                ReactDOM.render(<ShouldUpdatePartial importantProp={1} randomProp={4}><p>My child</p></ShouldUpdatePartial>, root);
                expect(wrapper.rendered).toBe(1);
            });

            it("should render twice if the important prop changed", () => {
                const wrapper = ReactDOM.render(<ShouldUpdatePartial importantProp={1} randomProp={2}><p>My child</p></ShouldUpdatePartial>, root);
                ReactDOM.render(<ShouldUpdatePartial importantProp={2} randomProp={4}><p>My child</p></ShouldUpdatePartial>, root);
                expect(wrapper.rendered).toBe(2);
            });
        });

        describe("With useShallowEqual", () => {
            let ShouldUpdatePartialShallowEqual;
            beforeAll(() => {
                ShouldUpdatePartialShallowEqual = useShallowEqual(ShouldUpdatePartial);
            });
            
            it("should render once if the parent decided that we shouldn't render", () => {
                const wrapper = ReactDOM.render(<ShouldUpdatePartialShallowEqual importantProp={1} randomProp={2}><p>My child</p></ShouldUpdatePartialShallowEqual>, root);
                ReactDOM.render(<ShouldUpdatePartialShallowEqual importantProp={1} randomProp={4}><p>My child</p></ShouldUpdatePartialShallowEqual>, root);
                expect(wrapper.rendered).toBe(1);
            });
            
            it("should render twice if the parent decided that we should render and props are different", () => {
                const wrapper = ReactDOM.render(<ShouldUpdatePartialShallowEqual importantProp={1} randomProp={2}><p>My child</p></ShouldUpdatePartialShallowEqual>, root);
                ReactDOM.render(<ShouldUpdatePartialShallowEqual importantProp={2} randomProp={4}><p>My child</p></ShouldUpdatePartialShallowEqual>, root);
                expect(wrapper.rendered).toBe(2);
            });
        });
    });
});