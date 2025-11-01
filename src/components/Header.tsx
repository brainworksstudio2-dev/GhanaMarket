import { useState } from 'react';
import { Search, ShoppingBag, MessageSquare, User, Menu, LogOut, LayoutGrid } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
  onProfileClick?: () => void;
  onDashboardClick?: () => void;
}

export function Header({ onSearch, onMenuClick, onProfileClick, onDashboardClick }: HeaderProps) {
  const { profile, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="lg:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              GhanaMarket
            </h1>
          </div>

          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, sellers..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative">
              <MessageSquare className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700" />
            </button>
            {profile?.role === 'seller' && (
              <button
                onClick={() => {
                  onDashboardClick?.();
                  setShowMenu(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Seller Dashboard"
              >
                <LayoutGrid className="w-6 h-6 text-gray-700" />
              </button>
            )}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-1 transition-colors"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      onProfileClick?.();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600 border-t border-gray-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
