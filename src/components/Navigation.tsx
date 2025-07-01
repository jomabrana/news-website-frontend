
import React, { useState } from 'react';
import { Search, Menu, X, User, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    { name: 'World', path: '/category/world' },
    { name: 'Politics', path: '/category/politics' },
    { name: 'Business', path: '/category/business' },
    { name: 'Sports', path: '/category/sports' },
    { name: 'Entertainment', path: '/category/entertainment' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-1 px-4 text-sm">
        <div className="container mx-auto">
          <span className="font-semibold">BREAKING:</span>
          <span className="ml-2 animate-pulse">Major economic summit concludes with historic agreement</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-hierarchy-2 text-primary hover:text-primary/80 transition-colors"
            >
              NewsToday
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => navigate(category.path)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Hidden on mobile */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pr-10"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* User Button */}
            <Button variant="ghost" size="sm" className="p-2">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4 mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Mobile Categories */}
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    navigate(category.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 hover:bg-muted rounded-md transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
