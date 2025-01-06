import { FiSun, FiMoon } from 'react-icons/fi';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-yellow-400" />
      ) : (
        <FiMoon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
