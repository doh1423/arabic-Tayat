import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				heritage: {
					gold: 'hsl(var(--heritage-gold))',
					brown: 'hsl(var(--heritage-brown))',
					beige: 'hsl(var(--heritage-beige))',
					warm: 'hsl(var(--heritage-warm))'
				},
				memory: {
					primary: 'hsl(var(--memory-primary))',
					secondary: 'hsl(var(--memory-secondary))',
					accent: 'hsl(var(--memory-accent))',
					deep: 'hsl(var(--memory-deep))',
					light: 'hsl(var(--memory-light))',
					emerald: 'hsl(var(--memory-emerald))'
				},
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
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-heritage': 'var(--gradient-heritage)',
				'gradient-warm': 'var(--gradient-warm)',
				'gradient-memory': 'var(--gradient-memory)',
				'gradient-memory-bg': 'var(--gradient-memory-bg)',
				'gradient-memory-card': 'var(--gradient-memory-card)',
				'gradient-memory-golden': 'var(--gradient-memory-golden)',
				'gradient-modern': 'var(--gradient-modern)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'heritage': 'var(--shadow-heritage)',
				'warm': 'var(--shadow-warm)',
				'memory': 'var(--shadow-memory)',
				'memory-soft': 'var(--shadow-memory-soft)',
				'glow': 'var(--shadow-glow)',
				'modern': 'var(--shadow-modern)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
