import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1A1C2C",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#FF4C29",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#2EC4B6",
          foreground: "#ffffff",
        },
        neutral: {
          DEFAULT: "#F5F5F5",
          foreground: "#121212",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "float-delayed": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-15px)",
          },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
        "spin-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        "door-open-left": {
          "0%": {
            transform: "perspective(1000px) rotateY(0deg)",
          },
          "50%": {
            transform: "perspective(1000px) rotateY(-45deg)",
          },
          "100%": {
            transform: "perspective(1000px) rotateY(-90deg)",
          },
        },
        "door-open-right": {
          "0%": {
            transform: "perspective(1000px) rotateY(0deg)",
          },
          "50%": {
            transform: "perspective(1000px) rotateY(45deg)",
          },
          "100%": {
            transform: "perspective(1000px) rotateY(90deg)",
          },
        },
        "light-sweep": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "walk-out": {
          "0%": {
            transform: "translateX(-50%) translateY(0px)",
            opacity: "1",
          },
          "50%": {
            transform: "translateX(-50%) translateY(-10px)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-20px)",
            opacity: "0",
          },
        },
        "arm-swing": {
          "0%, 100%": {
            transform: "rotate(12deg)",
          },
          "50%": {
            transform: "rotate(-12deg)",
          },
        },
        "arm-swing-reverse": {
          "0%, 100%": {
            transform: "rotate(-12deg)",
          },
          "50%": {
            transform: "rotate(12deg)",
          },
        },
        "leg-walk": {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(15deg)",
          },
        },
        "leg-walk-reverse": {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(-15deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        float: "float 3s ease-in-out infinite",
        "float-delayed": "float-delayed 3s ease-in-out infinite 0.5s",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "door-open-left": "door-open-left 2.5s ease-in-out forwards",
        "door-open-right": "door-open-right 2.5s ease-in-out forwards",
        "light-sweep": "light-sweep 2.5s ease-in-out",
        "walk-out": "walk-out 2.5s ease-in-out forwards",
        "arm-swing": "arm-swing 0.8s ease-in-out infinite",
        "arm-swing-reverse": "arm-swing-reverse 0.8s ease-in-out infinite",
        "leg-walk": "leg-walk 0.6s ease-in-out infinite",
        "leg-walk-reverse": "leg-walk-reverse 0.6s ease-in-out infinite 0.3s",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
