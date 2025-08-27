import { useState } from "react";



const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Styles for the container div
  const tooltipContainerStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  // Styles for the tooltip content box
  const tooltipStyle = {
    position: 'absolute',
    bottom: '125%', // Position above the element
    left: '50%',    // Center horizontally
    transform: 'translateX(-50%)',
    backgroundColor: '#333',
    color: 'white',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    zIndex: '100',
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transition: 'opacity 0.3s, visibility 0.3s',
  };

  // Styles for the tooltip arrow
  const arrowStyle = {
    content: "''",
    position: 'absolute',
    top: '100%', // Position at the bottom of the tooltip box
    left: '50%',
    marginLeft: '-5px',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: '#333 transparent transparent transparent',
  };

  // Event handlers to show/hide the tooltip
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div
      style={tooltipContainerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div style={tooltipStyle}>
        {content}
        <span style={arrowStyle}></span>
      </div>
    </div>
  );
};

export default Tooltip
