module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {}
  },
  // Temporary safelist for dev: ensures commonly-used dynamic or edge-case
  // utilities are always generated while we diagnose why some color
  // utilities were not appearing in the injected dev stylesheet.
  safelist: [
    'bg-blue-600',
    'text-white',
    'px-3',
    'py-2',
    'rounded',
    'bg-white',
    'text-slate-600',
    'bg-slate-50',
    'text-slate-900',
    'min-h-screen'
  ],
  plugins: [
    require('@tailwindcss/forms')
  ]
}