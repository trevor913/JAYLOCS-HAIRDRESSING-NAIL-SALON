import React, { useState } from 'react'
import { ShoppingCart, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Order: React.FC = () => {
  const { productItems, clearProducts } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: '',
    notes: '',
    cashAmount: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order submitted:', {
      ...formData,
      items: productItems
    })
    setIsSubmitted(true)
  }

  const total = productItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cashAmount = parseFloat(formData.cashAmount) || 0
  const change = cashAmount - total

  if (productItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products to Order</h2>
          <p className="text-gray-600 mb-6">
            Add some trench coats to your cart first.
          </p>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order! We'll contact you shortly to arrange delivery.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Summary:</p>
            <p className="font-semibold">Total: KES {total.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">Payment: {formData.paymentMethod}</p>
            {formData.paymentMethod === 'cash' && cashAmount > 0 && (
              <div className="text-sm text-gray-600 mt-2">
                <p>Cash Given: KES {cashAmount.toLocaleString()}</p>
                <p>Change: KES {change.toLocaleString()}</p>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({ name: '', phone: '', email: '', address: '', paymentMethod: '', notes: '', cashAmount: '' })
              clearProducts()
            }}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
          >
            Place Another Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Place Your Order</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Complete your trench coat order with delivery details
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="0712345678"
                    />
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your delivery address in Meru..."
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method *
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    required
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Choose payment method...</option>
                    <option value="mpesa">M-Pesa</option>
                    <option value="cash">Cash on Delivery</option>
                    <option value="paypal">PayPal</option>
                    <option value="payless">Payless (Kenya)</option>
                    <option value="kcb">KCB Paybill</option>
                  </select>
                </div>

                {/* Cash Payment Calculator */}
                {formData.paymentMethod === 'cash' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                      Cash Payment Calculator
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="cashAmount" className="block text-sm font-medium text-blue-700 mb-1">
                          Amount You Have (KES)
                        </label>
                        <input
                          type="number"
                          id="cashAmount"
                          name="cashAmount"
                          value={formData.cashAmount}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter cash amount..."
                        />
                      </div>
                      
                      {cashAmount > 0 && (
                        <div className="bg-white rounded-lg p-3 border border-blue-200">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Order Total:</span>
                            <span className="font-medium">KES {total.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Cash Given:</span>
                            <span className="font-medium">KES {cashAmount.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-semibold">
                              <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {change >= 0 ? 'Change:' : 'Short by:'}
                              </span>
                              <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                                KES {Math.abs(change).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <div className="relative">
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Any special delivery instructions..."
                    />
                    <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.name || !formData.phone || !formData.address || !formData.paymentMethod || (formData.paymentMethod === 'cash' && change < 0)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Place Order - KES {total.toLocaleString()}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Your Items</h3>

              {/* Items List */}
              <div className="space-y-4 mb-6">
                {productItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-pink-600">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        KES {item.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-pink-600">
                    KES {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">🚚 Delivery Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free delivery within Meru Town</li>
                  <li>• Delivery to Maua, Nchiru: KES 200</li>
                  <li>• Estimated delivery: 1-2 business days</li>
                  <li>• Cash on delivery available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order