import React from "react";
import { render } from '@testing-library/react';
import Index from "../../main/client/src/components/Pages/Index";

test('renders index', () => {
    render(<Index />);
    // expect(5 == 5);
});
