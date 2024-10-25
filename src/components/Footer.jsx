import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Company</h3>
          <ul>
            <li>
              <a href="/about" className="hover:underline">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Support</h3>
          <ul>
            <li>
              <a href="/faq" className="hover:underline">FAQ</a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-2">Social</h3>
          <ul>
            <li>
              <a href="https://facebook.com" className="hover:underline">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com" className="hover:underline">Twitter</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2024 NextBuy. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer