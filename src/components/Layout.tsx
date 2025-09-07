import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronUp,
  ChevronDown,
  LogOut,
  Camera
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdowns, setDropdowns] = useState<{[key: string]: boolean}>({})
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleDropdown = (key: string) => {
    setDropdowns(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const navigationItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Hair Dressing', 
      path: '/hairdressing',
      dropdown: [
        { name: 'Braids - KES 300', path: '/hairdressing/braids' },
        { name: 'Knotless Braids - KES 500', path: '/hairdressing/knotless' },
        { name: 'Weaving - KES 500', path: '/hairdressing/weaving' },
        { name: 'Wash & Blow Dry - KES 200', path: '/hairdressing/wash-blow' },
        { name: 'Twist Out - KES 400', path: '/hairdressing/twist' },
      ]
    },
    {
      name: 'Nail Care',
      path: '/nailcare',
      dropdown: [
        { name: 'Pedicure + Polish - KES 400', path: '/nailcare/pedicure-polish' },
        { name: 'Pedicure + Gel Polish - KES 500', path: '/nailcare/pedicure-gel' },
        { name: 'Manicure + Polish - KES 250', path: '/nailcare/manicure-polish' },
        { name: 'Manicure + Gel Polish - KES 350', path: '/nailcare/manicure-gel' },
        { name: 'Polish - KES 100', path: '/nailcare/polish' },
        { name: 'Gel Polish - KES 200', path: '/nailcare/gel-polish' },
        { name: 'Tip Polish - KES 300', path: '/nailcare/tip-polish' },
        { name: 'Tip Gel - KES 500', path: '/nailcare/tip-gel' },
        { name: 'Stick-on Polish - KES 300', path: '/nailcare/stick-polish' },
        { name: 'Stick-on Gel - KES 400', path: '/nailcare/stick-gel' },
        { name: 'Eyebrows Tattoo - KES 200', path: '/nailcare/eyebrows' },
      ]
    },
    { name: 'Dreadlocks', path: '/dreadlocks' },
    { name: 'Trench Coats', path: '/coats' },
    { name: 'Book Now', path: '/booking' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Announcements Banner */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center text-sm font-medium">
            <div className="text-center">
              🚨 IMPORTANT: Come fully equipped (buy braids/products in advance) & with washed, blow-dried hair! 🚨
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  JAYLOCS
                </h1>
                <p className="text-xs text-gray-600">HAIRDRESSING & NAIL SALON</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <div className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors duration-200 py-2 cursor-pointer">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors duration-200 py-2"
                    >
                      <span>{item.name}</span>
                    </Link>
                  )}
                  
                  {item.dropdown && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search, Cart, User */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden md:flex">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-48 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </form>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* User */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200">
                    <User className="w-6 h-6" />
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 top-full w-48 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-2 text-sm text-gray-600 border-b">
                      {user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200"
                >
                  <User className="w-6 h-6" />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-pink-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </form>
              
              {navigationItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    {item.dropdown ? (
                      <div className="block py-3 text-gray-700 hover:text-pink-600 transition-colors duration-200 flex-1">
                        {item.name}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className="block py-3 text-gray-700 hover:text-pink-600 transition-colors duration-200 flex-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                    {item.dropdown && (
                      <button
                        onClick={() => toggleDropdown(`mobile-${item.name}`)}
                        className="p-3 text-gray-700 hover:text-pink-600"
                      >
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            dropdowns[`mobile-${item.name}`] ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                    )}
                  </div>
                  
                  {item.dropdown && dropdowns[`mobile-${item.name}`] && (
                    <div className="pl-4 pb-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block py-2 text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Working Hours Banner */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-purple-800 font-medium">
            📅 Open Thu-Sun: 8:30AM-7PM | Closed Mon-Wed | 📍 Meru Town
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-pink-400">JAYLOCS SALON</h3>
              <p className="text-gray-300 text-sm mb-4">
                Premier hairdressing & nail salon serving Meru University students and the community with professional care.
              </p>
              <div className="text-sm text-gray-400">
                <p>📍 Meru Town</p>
                <p>📞 Available Thu-Sun</p>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 text-pink-400">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-200"
                    title="WhatsApp"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                    title="Facebook"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors duration-200"
                    title="Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                    title="Pinterest"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                    title="TikTok"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-pink-400">Services</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Hair Dressing & Styling</li>
                <li>Nail Care & Polish</li>
                <li>Dreadlocks (Installation & Maintenance)</li>
                <li>Fashion Trench Coats</li>
              </ul>
            </div>

            {/* Nearby Areas */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-pink-400">Service Areas</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>Nchiru (Main Location)</li>
                <li>Meru Town</li>
                <li>Maua</li>
                <li>Meru University</li>
                <li>Katheri</li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-pink-400">Payment Options</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  M-Pesa
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                  Cash
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.514.893 5.535 2.459 1.008 1.566 1.008 3.618 0 5.184-1.021 1.566-3.027 2.459-5.535 2.459h-4.94l-1.018 4.865h2.629c.484 0 .875.381.875.852 0 .471-.391.852-.875.852H7.076c-.484 0-.875-.381-.875-.852 0-.471.391-.852.875-.852zm1.646-7.896h3.735c1.756 0 3.045-.635 3.598-1.777.553-1.142.553-2.651 0-3.793-.553-1.142-1.842-1.777-3.598-1.777H9.34L8.722 13.441z"/>
                  </svg>
                  PayPal
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                  </svg>
                  Payless (Kenya)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-6.222 6.222a.749.749 0 01-1.06 0L6.432 10.54a.75.75 0 111.061-1.061l3.323 3.323L16.507 7.1a.75.75 0 111.061 1.06z"/>
                  </svg>
                  KCB Paybill
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 JAYLOCS HAIRDRESSING & NAIL SALON. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

export default Layout