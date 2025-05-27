import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fontcolor: '#333333',
        gray: '#E1E1E1',
        bgGray: '#F0F0F5',
        mainBlue: '#3B37FD',
        bgBlue: '#3293CA',
        white: '#FFFFFF',
        red: '#EC5249',
        green: '#66D14D',
        yellow: '#FFA621',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
    screens: {
      // PCファースト設計（max-width）
      lg: { max: '1023px' }, // 1023px以下を対象（＝タブレット以下）
      md: { max: '767px' },  // 767px以下を対象（＝スマホ）
      sm: { max: '639px' },  // 639px以下を対象（＝小型スマホ）
    },
  },
  plugins: [],
};
export default config;
