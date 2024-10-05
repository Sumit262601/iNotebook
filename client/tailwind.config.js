/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // Border Background
        customBorderColor: '#4D869C',

        backgroundColor: '#7AB2B2', // Add customer in background colors
        customBlue: '#4D869C', // Add custom color
        lightBlue: '#7AB2B2',  // Optionally, add other custom colors
        lighterBlue: '#EEF7FF',
        customWhite: '#ffffff',
        // About
        customPrimary: '#3b4b76', // For text color
        customSecondary: '#dbc9db', // For border color
        // Login
        customPrimaryLogin: '#4D869C',   // Primary color for buttons and headings
        customSecondaryLogin: '#7AB2B2', // Secondary color for focus rings
        customAccentLogin: '#123D6A',    // Accent color for smaller headings or text
        // Sign UP
        customPrimarySignup: '#4D869C',
        customSecondarySignup: '#CDE8E5',
        customAccentSignup: '#7AB2B2',
        customBackgroundSignup: '#EEF7FF',
        customDarkSignup: '#123D6A',
        // NotesItem
        customPrimaryNotes: '#3b4b76', // For text color
        customSecondaryNotes: '#4D869C', // For border color
        customBackgroundNotes: '#EEF7FF', // For background color
        customTagNotes: '#CDE8E5', // For tag background color
        

      }
    },
  },
  plugins: [],
}