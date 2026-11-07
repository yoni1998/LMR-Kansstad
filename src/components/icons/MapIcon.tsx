import type { SVGProps } from 'react';

export function MapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="21"
      height="16"
      viewBox="0 0 21 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 3.12891V15.293C0 15.7148 0.386719 15.9961 0.738281 15.8203L5.625 13.6055V0.105469L0.703125 2.07422C0.28125 2.25 0 2.67188 0 3.12891ZM6.75 13.6055L13.5 15.8555V2.35547L6.75 0.105469V13.6055ZM19.4766 0.175781L14.625 2.35547V15.8555L19.5117 13.9219C19.9336 13.7461 20.25 13.3242 20.25 12.8672V0.703125C20.25 0.28125 19.8281 0 19.4766 0.175781Z"
        fill="currentColor"
      />
    </svg>
  );
}
