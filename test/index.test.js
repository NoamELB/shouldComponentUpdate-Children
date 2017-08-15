import React from 'react';
import { shallow, mount, render } from 'enzyme';

import useShallowEqual from '../index';

describe("useShallowEqual", () => {
    it("should be falsy", () => {
        expect(false).toBeFalsy();
    });
});