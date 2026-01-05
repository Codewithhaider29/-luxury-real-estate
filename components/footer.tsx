"use client"

import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#000] border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-[#C19B76] flex items-center justify-center text-white text-xs font-bold">
                ◆
              </div>
              <span className="text-white font-light tracking-widest text-sm">BRICKSIO</span>
            </div>
            <p className="text-[#666] font-light text-sm leading-relaxed">
              Premier luxury real estate properties and investment opportunities in the world's most desirable
              locations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-light text-sm mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Properties", "About", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[#999] hover:text-[#C19B76] transition-colors font-light text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-light text-sm mb-6 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[#999] hover:text-[#C19B76] transition-colors font-light text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +1 (234) 567-8900
              </li>
              <li className="flex items-center gap-3 text-[#999] hover:text-[#C19B76] transition-colors font-light text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@bricksio.com
              </li>
              <li className="flex items-start gap-3 text-[#999] font-light text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>123 Luxury Avenue, Downtown, City 12345</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-light text-sm mb-6 uppercase tracking-widest">Follow</h4>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 border border-[#222] rounded-full flex items-center justify-center text-[#666] hover:border-[#C19B76] hover:text-[#C19B76] transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#222]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[#666] font-light text-xs">© {currentYear} Bricksio. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#666] hover:text-[#C19B76] font-light text-xs transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <p className="text-[#666] font-light text-xs">Designed by Radiant Templates</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
