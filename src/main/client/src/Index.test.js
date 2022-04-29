import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/Pages/Index';

/**
 * Stub to test manual Jest  config, still a Work In Progress
 */
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Index />, div);
});