import { render, screen } from '@testing-library/react';
import App from './App';

test('should renders hello react project title', () => {
    render(<App />);
    const titleElement = screen.getByText(/hello fast refresh/i);
    expect(titleElement).toBeInTheDocument();
});