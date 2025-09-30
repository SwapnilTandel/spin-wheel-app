import React from 'react';
import { Circle, Path, Defs, LinearGradient, Stop, G, Rect, Ellipse } from 'react-native-svg';
import { WHEEL_SIZE, CENTER_LOGO_SIZE } from '../../styles/theme';

/**
 * Wheel decorations component for Diwali theme
 */
const WheelDecorations = () => {
  const centerX = WHEEL_SIZE / 2;
  const centerY = WHEEL_SIZE / 2;
  const outerRadius = (WHEEL_SIZE - 6) / 2 + 20;
  
  const renderDiwaliDecorations = () => {
    // Create diyas (oil lamps) around the wheel
    const diyaPositions = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45) * Math.PI / 180;
      const x = centerX + outerRadius * Math.cos(angle);
      const y = centerY + outerRadius * Math.sin(angle);
      diyaPositions.push({ x, y, angle });
    }
    
    return (
      <G>
        {/* Diyas around the wheel */}
        {diyaPositions.map((pos, index) => (
          <G key={index}>
            {/* Diya base */}
            <Ellipse
              cx={pos.x}
              cy={pos.y + 5}
              rx="8"
              ry="4"
              fill="#8B4513"
            />
            {/* Diya flame */}
            <Path
              d={`M ${pos.x-3} ${pos.y-8} Q ${pos.x} ${pos.y-15} ${pos.x+3} ${pos.y-8} Q ${pos.x} ${pos.y-5} ${pos.x-3} ${pos.y-8}`}
              fill="url(#fireGradient)"
            />
            {/* Diya glow */}
            <Circle
              cx={pos.x}
              cy={pos.y-5}
              r="12"
              fill="rgba(255,215,0,0.2)"
            />
          </G>
        ))}
        
        {/* Fireworks around the wheel */}
        {[0, 60, 120, 180, 240, 300].map((angle, index) => {
          const x = centerX + (outerRadius + 30) * Math.cos(angle * Math.PI / 180);
          const y = centerY + (outerRadius + 30) * Math.sin(angle * Math.PI / 180);
          return (
            <G key={`firework-${index}`}>
              {/* Firework burst */}
              <Circle cx={x} cy={y} r="3" fill="#FFD700" />
              <Circle cx={x-8} cy={y-8} r="2" fill="#FF6B35" />
              <Circle cx={x+8} cy={y-8} r="2" fill="#FF6B35" />
              <Circle cx={x-8} cy={y+8} r="2" fill="#FF6B35" />
              <Circle cx={x+8} cy={y+8} r="2" fill="#FF6B35" />
            </G>
          );
        })}
      </G>
    );
  };

  const renderDiwaliMandala = () => {
    const radius = CENTER_LOGO_SIZE / 2 - 10;
    
    return (
      <G>
        {/* Outer mandala ring */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#FFD700"
          strokeWidth="2"
        />
        
        {/* Inner mandala pattern */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.7}
          fill="none"
          stroke="#FF6B35"
          strokeWidth="1"
        />
        
        {/* Mandala center dot */}
        <Circle
          cx={centerX}
          cy={centerY}
          r="8"
          fill="#FFD700"
        />
        
        {/* Decorative petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const x = centerX + (radius * 0.5) * Math.cos(angle * Math.PI / 180);
          const y = centerY + (radius * 0.5) * Math.sin(angle * Math.PI / 180);
          return (
            <Ellipse
              key={index}
              cx={x}
              cy={y}
              rx="6"
              ry="3"
              fill="#FFD700"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          );
        })}
      </G>
    );
  };

  return (
    <Defs>
      {/* Diwali fire gradient */}
      <LinearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <Stop offset="0%" stopColor="#FF6B35" />
        <Stop offset="30%" stopColor="#FFD700" />
        <Stop offset="60%" stopColor="#FFA500" />
        <Stop offset="100%" stopColor="#FFD700" />
      </LinearGradient>
      
      {/* Rangoli pattern gradient */}
      <LinearGradient id="rangoliGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF69B4" />
        <Stop offset="25%" stopColor="#FFD700" />
        <Stop offset="50%" stopColor="#FF1493" />
        <Stop offset="75%" stopColor="#FFD700" />
        <Stop offset="100%" stopColor="#FF69B4" />
      </LinearGradient>
    </Defs>
  );
};

export default WheelDecorations;
