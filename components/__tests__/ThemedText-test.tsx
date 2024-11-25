import * as React from 'react';
import renderer from 'react-test-renderer';

import { ThemedTextEx } from '../ThemedTextEx';

it(`renders correctly`, () => {
    const tree = renderer
        .create(<ThemedTextEx>Snapshot test!</ThemedTextEx>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
