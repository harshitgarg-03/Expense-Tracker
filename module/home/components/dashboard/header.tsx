import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { HeaderProps } from '../../types';

export function Header({ title, subtitle }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          console.log("hii theme ");
          
          setTheme(theme === 'dark' ? 'light' : 'dark')}}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle Theme</span>
      </Button>
    </div>
  );
}
