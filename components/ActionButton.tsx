interface ActionButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  text: string;
  buttonProperties?: string;
}

function ActionButton({
  onClick,
  isDisabled,
  text,
  buttonProperties,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none ${buttonProperties} ${
        isDisabled ? 'cursor-not-allowed' : ''
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
