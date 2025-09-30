import React from 'react';
import { Path, Text as SvgText } from 'react-native-svg';
import { createPieSlice, getTextPosition, getTextColor } from '../../utils/helpers';
import { WHEEL_SIZE } from '../../styles/theme';

/**
 * Wheel segments component
 */
const WheelSegments = ({ 
  categories, 
  settings, 
  winningIndex, 
  selectedCategory, 
  isColorToggling, 
  colorToggle 
}) => {
  const renderSegment = (category, index) => {
    const pathData = createPieSlice(index, categories.length, WHEEL_SIZE);
    const textPos = getTextPosition(index, categories.length, WHEEL_SIZE);
    
    // Check if this is the selected category for background inversion
    const isSelectedCategory = selectedCategory && selectedCategory.id === category.id;
    // Toggle between original and inverted color every 500ms
    const sliceColor = isSelectedCategory && isColorToggling 
      ? (colorToggle ? invertColor(category.color) : category.color)
      : category.color;
    const textColor = getTextColor(sliceColor);
    
    const isWinningSlice = winningIndex === index;
    
    return (
      <React.Fragment key={category.id}>
        {/* Pie slice with gold border */}
        <Path
          d={pathData}
          fill={sliceColor}
          stroke={isWinningSlice ? "#FFD700" : "#FFD700"}
          strokeWidth={isWinningSlice ? "6" : "3"}
          opacity={isWinningSlice ? 0.9 : 1}
          style={{
            filter: isWinningSlice ? 'drop-shadow(0 0 20px rgba(255,215,0,0.8))' : 'none'
          }}
        />
        
        {/* Text label - vibrant and catchy typography */}
        <SvgText
          x={textPos.x}
          y={textPos.y}
          fontSize={`${settings.labelTextSize || 14}`}
          fontWeight="700"
          fontFamily={settings.labelFontFamily || 'system-ui'}
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="0.5px"
          transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
        >
          {category.name}
        </SvgText>
      </React.Fragment>
    );
  };

  return (
    <>
      {categories.map((category, index) => renderSegment(category, index))}
    </>
  );
};

// Helper function to invert color (moved from helpers for this component)
const invertColor = (hexColor) => {
  const color = hexColor.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;
  
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(invertedR)}${toHex(invertedG)}${toHex(invertedB)}`;
};

export default WheelSegments;
