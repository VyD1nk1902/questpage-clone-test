/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			muted: 'var(--muted)',
  			'muted-foreground': 'var(--muted-foreground)',
  			card: 'var(--card)',
  			'card-foreground': 'var(--card-foreground)',
  			popover: 'var(--popover)',
  			'popover-foreground': 'var(--popover-foreground)',
  			border: 'var(--border)',
  			input: 'var(--input)',
  			primary: 'var(--primary)',
  			'primary-foreground': 'var(--primary-foreground)',
  			secondary: 'var(--secondary)',
  			'secondary-foreground': 'var(--secondary-foreground)',
  			accent: 'var(--accent)',
  			'accent-foreground': 'var(--accent-foreground)',
  			destructive: 'var(--destructive)',
  			'destructive-foreground': 'var(--destructive-foreground)',
  			success: 'var(--success)',
  			'success-foreground': 'var(--success-foreground)',
  			ring: 'var(--ring)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			shadow: 'var(--shadow)'
  		},
  		translate: {
  			boxShadowX: '4px',
  			boxShadowY: '4px',
  			reverseBoxShadowX: '-4px',
  			reverseBoxShadowY: '-4px'
  		},
  		fontWeight: {
  			base: '500',
  			heading: '700'
  		}
  	}
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
        },
        ".touch-pan-none": {
          "touch-action": "none",
        },

        ".btn-box-shadow": {
          "box-shadow":
            "0px var(--shadow-sm-offset-y, 1px) var(--shadow-sm-blur, 2px) 0px rgba(0, 0, 0, 0.05)",
        },
      });
    },
    require("tailwindcss-animate"),
  ],
};
