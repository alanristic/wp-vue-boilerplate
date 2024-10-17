import('tailwindcss').Config
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './*.php', // Ensures Tailwind scans PHP files for classes.
    './**/*.php' // Scans all PHP files in subdirectories as well.
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
