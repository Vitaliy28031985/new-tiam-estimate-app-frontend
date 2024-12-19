import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        alternates: ['Montserrat Alternates', 'sans-serif'],
      },
     container: {
      center: true,
      // padding: { DEFAULT: '16px', md: '60px', lg: '120px' },
      screens: { sm: '375px', md: '768px', lg: '1024px', xl: '1440px' }
    },
      screens: {
      mobile: '375px',
      tablet: '768px',
      tabletBig: '1024px',
      desktop: '1440px'
    },
      boxShadow: {
      base: '0px 4px 4px -4px rgba(12, 12, 13, 0.05)'
    },
      colors: {
        black: 'rgb(9, 9, 11)',
        green: 'rgb(22, 163, 74)',
        white: 'rgb(255, 255, 255)',
        modalFon: 'rgba(0, 0, 0, 0.35)',
        blue: {
          5: 'rgb(224, 242, 254)',
          10: 'rgb(186, 230, 253)',
          15: 'rgb(147, 197, 253)',
          20: 'rgb(2, 132, 199)',
          25: 'rgb(3, 105, 161)',
          30: 'rgb(12, 74, 110)'
        },
        gray: {
          0: 'rgb(240, 240, 240)',
          5: 'rgb(223, 223, 223)',
          10: 'rgb(245, 245, 245)',
          15: 'rgb(229, 231, 235)',
          20: 'rgb(163, 163, 163)',
          25: 'rgb(115, 115, 115)',
          30: 'rgb(55, 65, 81)'
        },
        red: {
          10: 'rgba(239, 68, 68, 0.1)',
          20: 'rgba(239, 68, 68, 0.2)',
          40: 'rgba(239, 68, 68, 0.4)',
          50: 'rgba(239, 68, 68, 0.5)',
          0: 'rgb(239, 68, 68)'
        }
      },
      //   backgroundImage: {
      //   bgImg: 'url("/bg-img.png")'
        
      // },
     
    },
  },
  plugins: [],
} satisfies Config;
