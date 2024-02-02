import React, { useState } from 'react';
import { css } from '@emotion/css';

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);
  const onToggleButtonClickHandler = () => {
    setIsToggled(!isToggled);
  };
  const circleXPosition = isToggled ? 40 : 16;
  const toggleButtonColor = isToggled ? '#9BBBD4' : '#D4D4DE';
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <div
        className={css({ cursor: 'pointer', paddingTop: '5px' })}
        onClick={onToggleButtonClickHandler}
        onKeyDown={onToggleButtonClickHandler}
        role="presentation"
      >
        <svg
          width="56"
          height="32"
          viewBox="0 0 56 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Toggle" filter="url(#filter0_d_383_1184)">
            <rect
              x="4"
              width="48"
              height="24"
              rx="12"
              fill={toggleButtonColor}
              shapeRendering="crispEdges"
            />
            <circle
              className={css({ transition: 'cx 0.3s ease-in-out' })}
              id="Ellipse 74"
              cx={circleXPosition}
              cy="12"
              r="8"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_383_1184"
              x="0"
              y="0"
              width="56"
              height="32"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_383_1184"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_383_1184"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div
        className={css({
          fontFamily: 'SpoqaHanSansNeo-Regular',
          marginLeft: '5px',
          fontSize: '16px',
        })}
      >
        마감된 게시글
      </div>
    </div>
  );
};

export default ToggleButton;
