type IconProps = { className?: string };

const base = (d: string) =>
  function Icon({ className = 'h-6 w-6' }: IconProps) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={d} />
      </svg>
    );
  };

export const IconModel = base('M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6');
export const IconBoard = base('M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z');
export const IconTasks = base('M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2');
export const IconShopping = base('M5 7h14l-1.5 12h-11zM9 7a3 3 0 0 1 6 0');
export const IconTimeline = base('M4 12h16M7 8v8M12 6v12M17 9v6');
export const IconSettings = base(
  'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4',
);
export const IconClose = base('M6 6l12 12M18 6 6 18');
