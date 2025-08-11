/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}', // Include all files in the src directory
    './components/**/*.{js,jsx,ts,tsx}', // Include all files in the components directory
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        primary_dark: '#2563eb',
        secondary: '#F6C09F',
        background: '#FFF0E6',
      },
      // fontFamily: {
      //   Regular: ['Inter_18pt-Regular'],
      //   Medium: ['Inter_18pt-Medium'],
      //   MediumItalic: ['Inter_18pt-MediumItalic'],
      //   SemiBold: ['Inter_18pt-SemiBold'],
      //   Bold: ['Inter_18pt-Bold'],
      // },
    },
  },
  // darkMode: 'class',
  plugins: [],
};