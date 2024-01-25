// ExampleComponent.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ExampleComponent = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div style={{ background: isDarkMode ? '#333' : '#f0f0f0', color: isDarkMode ? '#fff' : '#000' }}>
      <p>This is an example component</p>
    </div>
  );
};

export default ExampleComponent;
