import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeContext } from '@/lib/context/ThemeContext';

const SiteThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle site theme"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-white" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default SiteThemeToggle;