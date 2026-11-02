import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type AppIconName =
  | 'clinic'
  | 'notifications'
  | 'people'
  | 'calendar'
  | 'medkit'
  | 'wallet'
  | 'pulse'
  | 'chevron'
  | 'plus';

type AppIconProps = {
  name: AppIconName;
  size?: number;
  color: string;
};

export const AppIcon = ({ name, size = 22, color }: AppIconProps) => {
  const common = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'clinic' && (
        <>
          <Path {...common} d="M4 20V8l8-4 8 4v12" />
          <Path {...common} d="M9 20v-4h6v4M8 10h8M12 8v4M10 10h4" />
        </>
      )}
      {name === 'notifications' && (
        <>
          <Path
            {...common}
            d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
          />
        </>
      )}
      {name === 'people' && (
        <>
          <Circle {...common} cx="9" cy="8" r="3" />
          <Path
            {...common}
            d="M3.5 19c.6-3 2.4-4.5 5.5-4.5s4.9 1.5 5.5 4.5M16 5.5a3 3 0 0 1 0 5.8M16 14.5c2.5.2 4 1.7 4.5 4.5"
          />
        </>
      )}
      {name === 'calendar' && (
        <>
          <Rect {...common} x="4" y="5.5" width="16" height="15" rx="2" />
          <Path
            {...common}
            d="M8 3.5v4M16 3.5v4M4 10h16M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"
          />
        </>
      )}
      {name === 'medkit' && (
        <>
          <Rect {...common} x="3.5" y="7" width="17" height="12" rx="2" />
          <Path
            {...common}
            d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M12 10v6M9 13h6"
          />
        </>
      )}
      {name === 'wallet' && (
        <>
          <Path
            {...common}
            d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19a1 1 0 0 1 1 1v15H6.5A2.5 2.5 0 0 1 4 17.5v-11Z"
          />
          <Path {...common} d="M4 7h14M16 13h4M16.5 13.01h.01" />
        </>
      )}
      {name === 'pulse' && (
        <Path {...common} d="M3 12h4l2-5 4 10 2-5h6" strokeWidth={2} />
      )}
      {name === 'chevron' && <Path {...common} d="m9 5 7 7-7 7" />}
      {name === 'plus' && (
        <Path {...common} d="M12 5v14M5 12h14" strokeWidth={2.2} />
      )}
    </Svg>
  );
};
