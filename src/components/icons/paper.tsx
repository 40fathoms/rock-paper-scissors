interface PaperProps extends React.SVGAttributes<SVGElement> {}

const Paper = (props: PaperProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 765 990"
      {...props}
    >
      <defs>
        <filter id="a" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation={2.672} />
        </filter>
      </defs>
      <path
        fill="#b3b3b3"
        stroke="#979797"
        strokeWidth={0.802}
        d="M-225.07 373.65v219.1h157.99c6.22 0 11.207-4.906 11.207-10.996v-197.1c0-6.09-4.988-10.996-11.207-10.996h-157.99z"
        filter="url(#a)"
        opacity={0.593}
        transform="translate(998.89 -1629.762) scale(4.4253)"
      />
      <path
        fill="#fff"
        stroke="#979797"
        strokeWidth={3.55}
        d="M11.084 10.082v969.55h699.16c27.525 0 49.597-21.711 49.597-48.663V58.739c0-26.952-22.072-48.663-49.597-48.663H11.084z"
      />
      <path
        fill="#00f"
        stroke="#01f"
        strokeWidth={1.669}
        d="M10.143 182.56h750.64"
        style={{
          color: '#000'
        }}
        transform="translate(0 -62.362)"
      />
      <path
        fill="#00f"
        stroke="#01f"
        strokeWidth={1.669}
        d="M10.143 166.968h750.64M10.143 214.758h750.64M10.143 262.548h750.64M10.143 310.338h750.64M10.143 358.128h750.64M10.143 405.918h750.64M10.143 453.708h750.64M10.143 501.498h750.64M10.143 549.288h750.64M10.143 597.088h750.64M10.143 644.878h750.64M10.143 692.668h750.64M10.143 740.458h750.64M10.143 788.248h750.64M10.143 836.038h750.64M10.143 883.828h750.64M10.143 931.618h750.64"
      />
      <path
        fill="#acacac"
        fillOpacity={0.325}
        stroke="#030000"
        strokeWidth={0.802}
        d="M40.439 471.52a21.445 28.184 0 1 1-42.889 0 21.445 28.184 0 1 1 42.889 0z"
        style={{
          color: '#000'
        }}
        transform="matrix(-.60548 0 0 -.46126 65.669 745.828)"
      />
      <path
        fill="#00f"
        stroke="red"
        strokeWidth={1.689}
        d="M106.09 71.503v968.48"
        style={{
          color: '#000'
        }}
        transform="translate(0 -62.362)"
      />
      <path
        fill="#acacac"
        fillOpacity={0.325}
        stroke="#030000"
        strokeWidth={0.802}
        d="M40.439 471.52a21.445 28.184 0 1 1-42.889 0 21.445 28.184 0 1 1 42.889 0z"
        style={{
          color: '#000'
        }}
        transform="matrix(-.60548 0 0 -.46126 65.669 403.898)"
      />
      <path
        fill="#e4e4e4"
        stroke="#030000"
        strokeWidth={0.802}
        d="M40.439 471.52a21.445 28.184 0 1 1-42.889 0 21.445 28.184 0 1 1 42.889 0z"
        style={{
          color: '#000'
        }}
        transform="matrix(-.60548 0 0 -.46126 65.669 1127.038)"
      />
    </svg>
  );
};

export { Paper };
