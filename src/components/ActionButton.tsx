interface ActionButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  text: string;
  isTeal?: boolean;
  isRed?: boolean;
}

function ActionButton({
  onClick,
  isDisabled,
  text,
  isTeal,
  isRed,
}: ActionButtonProps) {
  const buttonClass = `relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none ${
    isDisabled ? 'cursor-not-allowed' : ''
  }`;

  const tealClass =
    'from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-lime-200 dark:focus:ring-lime-800';
  const redClass =
    'from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-red-100 dark:focus:ring-red-400';

  return (
    <button
      onClick={onClick}
      className={`${buttonClass} ${isTeal ? tealClass : ''} ${
        isRed ? redClass : ''
      }`}
      disabled={isDisabled}
    >
      <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
        {text}
      </span>
    </button>
  );
}

export default ActionButton;
