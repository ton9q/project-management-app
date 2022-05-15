const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: 'auto',
        background: 'rgb(255, 255, 255)',
        display: 'block',
        shapeRendering: 'auto',
        animationPlayState: 'running',
        animationDelay: '0s',
      }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g
        transform="rotate(0 50 50)"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <rect
          x="43"
          y="22"
          rx="7"
          ry="7"
          width="14"
          height="14"
          fill="#7c4dff"
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.875s"
            repeatCount="indefinite"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          ></animate>
        </rect>
      </g>
      <g
        transform="rotate(45 50 50)"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <rect
          x="43"
          y="22"
          rx="7"
          ry="7"
          width="14"
          height="14"
          fill="#7c4dff"
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.75s"
            repeatCount="indefinite"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          ></animate>
        </rect>
      </g>
      <g
        transform="rotate(90 50 50)"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <rect
          x="43"
          y="22"
          rx="7"
          ry="7"
          width="14"
          height="14"
          fill="#7c4dff"
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.625s"
            repeatCount="indefinite"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          ></animate>
        </rect>
      </g>
      <g
        transform="rotate(135 50 50)"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <rect
          x="43"
          y="22"
          rx="7"
          ry="7"
          width="14"
          height="14"
          fill="#7c4dff"
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5s"
            repeatCount="indefinite"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          ></animate>
        </rect>
      </g>
      <g
        transform="rotate(180 50 50)"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <rect
          x="43"
          y="22"
          rx="7"
          ry="7"
          width="14"
          height="14"
          fill="#7c4dff"
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.375s"
            repeatCount="indefinite"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          ></animate>
        </rect>
      </g>
      <g
        transform="rotate(225 50 50)"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <rect
          x="43"
          y="22"
          rx="7"
          ry="7"
          width="14"
          height="14"
          fill="#7c4dff"
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.25s"
            repeatCount="indefinite"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          ></animate>
        </rect>
      </g>
      <g
        transform="rotate(270 50 50)"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <rect
          x="43"
          y="22"
          rx="7"
          ry="7"
          width="14"
          height="14"
          fill="#7c4dff"
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.125s"
            repeatCount="indefinite"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          ></animate>
        </rect>
      </g>
      <g
        transform="rotate(315 50 50)"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <rect
          x="43"
          y="22"
          rx="7"
          ry="7"
          width="14"
          height="14"
          fill="#7c4dff"
          style={{ animationPlayState: 'running', animationDelay: '0s' }}
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="'0s'"
            repeatCount="indefinite"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}
          ></animate>
        </rect>
      </g>
    </svg>
  );
};

export default Spinner;
