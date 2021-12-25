export default function Spinner() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{margin: 'auto',
      background: 'none',
      display: 'block'}}
      width = "50px"
      height = "50px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <path d="M10 50A40 40 0 0 0 90 50A40 43 0 0 1 10 50" fill="#9f0013" stroke="none">
        <animateTransform attributeName="transform" type="rotate" dur="0.8333333333333334s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.5;360 50 51.5"></animateTransform>
      </path>
    </svg>
  )
}