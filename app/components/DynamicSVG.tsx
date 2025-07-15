import React from "react";

interface SvgShapeProps {
  width?: number | string;
  height?: number | string;
  bgImage?: string;
  className?: string;
}

const DynamicSVG: React.FC<SvgShapeProps> = ({
  width = 373,
  height = 411,
  bgImage,
  className = "",
}) => {
  const patternId = `bg-pattern-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 373 411"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {bgImage && (
        <defs>
          <pattern
            id={patternId}
            patternUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <image
              href={bgImage}
              x="0"
              y="0"
              width="373"
              height="411"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
      )}
      <path
        d="M372.5 370.323C372.5 389.179 372.5 398.608 366.642 404.465C360.784 410.323 351.356 410.323 332.5 410.323H40C21.1438 410.323 11.7157 410.323 5.85786 404.465C0 398.608 0 389.179 0 370.323V133.984C0 115.128 0 105.7 5.85786 99.8422C11.7157 93.9844 21.1438 93.9844 40 93.9844H49.4004C68.2566 93.9844 77.6847 93.9844 83.5425 88.1265C89.4004 82.2686 89.4004 72.8406 89.4004 53.9844V40C89.4004 21.1438 89.4004 11.7157 95.2583 5.85786C101.116 0 110.544 0 129.4 0H332.5C351.356 0 360.784 0 366.642 5.85786C372.5 11.7157 372.5 21.1438 372.5 40V370.323Z"
        fill={bgImage ? `url(#${patternId})` : "#D9D9D9"}
      />
    </svg>
  );
};

export default DynamicSVG;
