/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#58a6ff', // GitHub Blue
                secondary: '#8b949e', // GitHub Grey
                success: '#238636', // GitHub Green
                danger: '#da3633', // GitHub Red
                background: '#0d1117', // Canvas Default
                surface: '#161b22', // Canvas Subtle
                border: '#30363d', // Border Default
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
