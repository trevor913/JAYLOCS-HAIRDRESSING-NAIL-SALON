import React from 'react'
import { ShoppingCart, Plus, Minus, X, CreditCard, ArrowRight } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const Cart: React.FC = () => {
  const { items, serviceItems, productItems, removeItem, updateQuantity, clearCart, total, serviceTotal, productTotal } = useCart()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const paymentMethods = [
    { 
      name: 'M-Pesa', 
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ), 
      description: 'Pay via M-Pesa mobile money' 
    },
    { 
      name: 'Cash', 
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      ), 
      description: 'Pay cash at the salon' 
    },
    { 
      name: 'PayPal', 
      icon: (
        <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.514.893 5.535 2.459 1.008 1.566 1.008 3.618 0 5.184-1.021 1.566-3.027 2.459-5.535 2.459h-4.94l-1.018 4.865h2.629c.484 0 .875.381.875.852 0 .471-.391.852-.875.852H7.076c-.484 0-.875-.381-.875-.852 0-.471.391-.852.875-.852zm1.646-7.896h3.735c1.756 0 3.045-.635 3.598-1.777.553-1.142.553-2.651 0-3.793-.553-1.142-1.842-1.777-3.598-1.777H9.34L8.722 13.441z"/>
        </svg>
      ), 
      description: 'Secure online payment' 
    },
    { 
      name: 'Payless', 
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
        </svg>
      ), 
      description: 'Payless Kenya payment' 
    },
    { 
      name: 'KCB Paybill', 
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-6.222 6.222a.749.749 0 01-1.06 0L6.432 10.54a.75.75 0 111.061-1.061l3.323 3.323L16.507 7.1a.75.75 0 111.061 1.06z"/>
        </svg>
      ), 
      description: 'KCB mobile banking' 
    }
  ]

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
            <p className="text-xl opacity-90">Your beauty items are waiting for you</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Explore our services and add items to get started with your beauty journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/hairdressing"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
              >
                Browse Hair Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/coats"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition-all duration-200"
              >
                Shop Trench Coats
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
            <p className="text-xl opacity-90">
              Review your selected items and proceed to booking
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Cart Items ({items.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.type === 'service' ? 'Beauty Service' : 'Fashion Item'}
                        </p>
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold text-pink-600">
                            KES {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500">
                            KES {item.price.toLocaleString()} each
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 text-red-400 hover:text-red-600 transition-colors duration-200"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/hairdressing"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center"
                >
                  <div className="text-pink-600 font-semibold mb-1">Hair Services</div>
                  <div className="text-sm text-gray-600">Braids, styling & more</div>
                </Link>
                <Link
                  to="/nailcare"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center"
                >
                  <div className="text-purple-600 font-semibold mb-1">Nail Care</div>
                  <div className="text-sm text-gray-600">Manicures & pedicures</div>
                </Link>
                <Link
                  to="/coats"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center"
                >
                  <div className="text-pink-600 font-semibold mb-1">Trench Coats</div>
                  <div className="text-sm text-gray-600">Fashion collection</div>
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

              {/* Subtotal Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="font-medium">KES {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-pink-600">
                      KES {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-3 mb-6">
                {serviceItems.length > 0 && (
                  <Link
                    to="/booking"
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Book Appointments (KES {serviceTotal.toLocaleString()})</span>
                  </Link>
                )}
                {productItems.length > 0 && (
                  <Link
                    to="/order"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Place Order (KES {productTotal.toLocaleString()})</span>
                  </Link>
                )}
              </div>

              {/* Payment Methods */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Payment Options</h4>
                <div className="space-y-3">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">{method.icon}</div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{method.name}</div>
                        <div className="text-xs text-gray-600">{method.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Discount Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">💳 Student Discounts</h4>
                <p className="text-sm text-gray-600">
                  Show your valid student ID for additional discounts on selected services!
                </p>
              </div>

              {/* Security Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Your information is secure and protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart