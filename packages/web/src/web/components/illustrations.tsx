export function Snake({ className = "", happy = true }: { className?: string; happy?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 200"
      fill="none"
      aria-label="Pip, your friendly Python guide"
    >
      <ellipse cx="110" cy="180" rx="75" ry="12" fill="#254c25" opacity=".1" />
      <path
        d="M47 164C-3 132 33 91 67 116C95 138 139 175 163 148C180 128 152 114 127 132"
        stroke="#4e9c40"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <path
        d="M46 157C12 128 39 108 62 125C98 153 144 182 166 151"
        stroke="#85c857"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M105 139C74 107 65 75 87 48C109 19 159 21 177 51C197 84 173 115 145 127L137 150"
        fill="#8ccb56"
      />
      <path
        d="M143 118C122 131 107 121 101 98C96 80 107 67 119 69C134 70 143 80 163 75C184 70 185 96 165 108Z"
        fill="#d9efa7"
      />
      <ellipse cx="107" cy="66" rx="17" ry="21" fill="white" />
      <ellipse cx="148" cy="61" rx="18" ry="22" fill="white" />
      <ellipse cx="112" cy="67" rx="6" ry="10" fill="#254532" />
      <ellipse cx="153" cy="62" rx="6" ry="10" fill="#254532" />
      <circle cx="114" cy="63" r="2" fill="white" />
      <circle cx="155" cy="58" r="2" fill="white" />
      <path
        d={happy ? "M120 89Q136 103 151 85" : "M122 92Q137 83 150 91"}
        stroke="#2c5835"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <ellipse cx="104" cy="88" rx="8" ry="5" fill="#f4b1a0" />
      <ellipse cx="165" cy="82" rx="7" ry="5" fill="#f4b1a0" />
      <path d="M85 38L79 20L102 24L112 8L123 24L146 16L141 36Z" fill="#f7c95c" />
      <circle cx="114" cy="25" r="4" fill="#fff3c7" />
      <path
        d="M77 140l8 6M47 130l7 7M148 159l-6 9"
        stroke="#4a953b"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function Tree({ x, y, s = 1, kind = 0 }: { x: number; y: number; s?: number; kind?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cy="36" rx="22" ry="6" fill="#70a750" opacity=".25" />
      <path d="M0 34V-8" stroke="#608b40" strokeWidth="6" strokeLinecap="round" />
      {kind === 0 ? (
        <>
          <path
            d="M0-59C-20-60-29-42-22-30C-45-17-29 7-10 8C-11 24 25 23 30 7C49-5 35-28 21-31C24-48 14-59 0-59Z"
            fill="#73af52"
          />
          <path
            d="M0 25V-37M0-11l-13-10M0 1l16-14"
            stroke="#5d9444"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path d="M0-61L-29-13H-19L-34 12H34L20-13H29Z" fill="#477e4d" />
          <path d="M0-50L-19-16H20Z" fill="#689956" />
        </>
      )}
    </g>
  );
}
export function Landscape() {
  return (
    <svg
      className="landscape"
      viewBox="0 0 700 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#e2edbf" />
          <stop offset="1" stopColor="#cae5a3" />
        </linearGradient>
        <linearGradient id="river" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#9bdce8" />
          <stop offset="1" stopColor="#5fbdd9" />
        </linearGradient>
      </defs>
      <rect width="700" height="640" fill="url(#land)" />
      <path d="M0 30C110-12 168 82 280 41C380 4 451 45 544 12L700 0V0H0Z" fill="#f0f4d7" />
      <path
        d="M0 640V407C92 394 75 296 180 327C289 362 258 438 380 429C490 421 473 525 584 538C641 544 679 506 700 523V640Z"
        fill="#b5d68f"
      />
      <path
        d="M-40 435C67 449 84 355 165 375C234 392 204 484 329 483C456 482 412 594 557 588C649 584 665 550 740 583"
        stroke="#98c477"
        strokeWidth="96"
        fill="none"
      />
      <path
        d="M-40 435C67 449 84 355 165 375C234 392 204 484 329 483C456 482 412 594 557 588C649 584 665 550 740 583"
        stroke="#e2f0c1"
        strokeWidth="80"
        fill="none"
      />
      <path
        d="M-40 435C67 449 84 355 165 375C234 392 204 484 329 483C456 482 412 594 557 588C649 584 665 550 740 583"
        stroke="url(#river)"
        strokeWidth="63"
        fill="none"
      />
      <path
        d="M-40 435C67 449 84 355 165 375C234 392 204 484 329 483C456 482 412 594 557 588C649 584 665 550 740 583"
        stroke="#b5e8ef"
        strokeWidth="4"
        fill="none"
        strokeDasharray="28 63"
        opacity=".8"
      />
      <path
        d="M345 33C399 82 275 75 253 136C228 202 455 161 462 250C470 334 227 270 238 370C242 414 329 397 347 443C366 491 268 516 272 561C277 601 355 589 381 640"
        stroke="#b8cb8e"
        strokeWidth="33"
        fill="none"
      />
      <path
        d="M345 33C399 82 275 75 253 136C228 202 455 161 462 250C470 334 227 270 238 370C242 414 329 397 347 443C366 491 268 516 272 561C277 601 355 589 381 640"
        stroke="#fff0c0"
        strokeWidth="26"
        fill="none"
      />
      <g transform="translate(312,444) rotate(37)">
        <rect x="0" y="-34" width="71" height="68" rx="5" fill="#bc8f53" />
        {[-27, -16, -5, 6, 17, 28].map((y) => (
          <path key={y} d={`M-3 ${y}h77`} stroke="#f4cc86" strokeWidth="8" />
        ))}
        <path d="M4-37v76M66-37v76" stroke="#8e6b3e" strokeWidth="4" />
      </g>
      <Tree x={82} y={115} s={1.1} />
      <Tree x={606} y={130} s={0.85} />
      <Tree x={571} y={282} s={1.05} />
      <Tree x={120} y={280} s={0.7} kind={1} />
      <Tree x={80} y={575} s={1.3} />
      <Tree x={635} y={441} s={0.9} kind={1} />
      <Tree x={480} y={640} s={0.65} />
      <g fill="#d7eab2">
        <ellipse cx="151" cy="164" rx="58" ry="23" />
        <ellipse cx="552" cy="74" rx="52" ry="20" />
        <ellipse cx="511" cy="374" rx="70" ry="20" />
        <ellipse cx="182" cy="546" rx="45" ry="19" />
      </g>
      <g fill="#8cb761">
        {[
          [143, 61],
          [528, 188],
          [111, 350],
          [543, 468],
          [410, 569],
          [199, 212],
          [39, 210],
          [619, 600],
        ].map(([x, y]) => (
          <g key={x} transform={`translate(${x},${y})`}>
            <path d="M0 0q-13-21-12-4q-4-17-5 1q8 8 17 3M0 0q2-22 7-8q8-11 11-6q-4 13-18 14" />
          </g>
        ))}
      </g>
      <g fill="#f9f6cc">
        {[
          [80, 200],
          [102, 204],
          [553, 357],
          [573, 366],
          [417, 608],
          [173, 460],
          [47, 326],
          [660, 203],
        ].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="4" />
            <circle cx={x + 8} cy={y - 5} r="3" />
            <circle cx={x + 5} cy={y + 6} r="3" />
          </g>
        ))}
      </g>
      <g fill="#a6b591">
        <ellipse cx="57" cy="155" rx="14" ry="8" />
        <ellipse cx="638" cy="313" rx="17" ry="9" />
        <ellipse cx="586" cy="643" rx="13" ry="7" />
      </g>
      <g transform="translate(499 107)">
        <rect x="-18" y="0" width="40" height="36" rx="3" fill="#c99c5d" />
        <path d="M-26 0L2-25L29 0Z" fill="#6e9851" />
        <rect x="-2" y="15" width="13" height="21" rx="6" fill="#85633e" />
        <rect x="-12" y="8" width="7" height="8" fill="#ffefb9" />
      </g>
      <g fill="white" opacity=".55">
        <path d="M22 46c0-12 15-20 24-11c7-20 38-17 40 1c16-6 27 6 22 15H25Z" />
        <path d="M532 26c2-11 16-14 23-6c6-15 28-11 28 2c14-5 25 5 20 11h-69Z" />
      </g>
    </svg>
  );
}
export function MountainBadge() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 4L89 26V73L50 96L11 73V26Z" fill="#f0eadc" stroke="#e6dfce" strokeWidth="3" />
      <path d="M20 67L40 33L53 55L64 41L83 67Z" fill="#9dad83" />
      <path d="M40 33L32 47L40 43L47 47Z" fill="#fff" />
      <path d="M64 41L58 51L64 48L70 51Z" fill="#fff" />
      <circle cx="69" cy="29" r="6" fill="#f6d477" />
      <path d="M28 75h45" stroke="#c8d2b9" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
