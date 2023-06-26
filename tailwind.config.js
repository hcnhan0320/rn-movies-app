/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './App.{js,jsx,ts,tsx}',
      './<custom directory>/**/*.{js,jsx,ts,tsx}',
      './screens/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      extend: {
         colors: {
            // Primary Colors
            darkgrey: '#1E1E1E',
            gold: '#525252',

            // Text Colors
            title: '#2E2E2E',
            bd: '#808080',
            infield: '#CCCCCC',
            disable: '#E6E6E6',

            // Secondary Colors
            medgrey: '#3D3D3D',
            shadowgold: '#302D28',
            yellow: '#FED530',

            main: '#080A1A',
            subMain: '#F20000',
            dry: '#0B0F29',
            star: '#FFB000',
            text: '#C0C0C0',
            border: '#4B5563',
            dryGray: '#E0D5D5',
         },
      },
   },
   plugins: [],
};
