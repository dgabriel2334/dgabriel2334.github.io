module.exports = {
  darkMode: 'class',
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: { 50:'#eef6ff',100:'#d9ebff',200:'#bcdcff',300:'#8ec7ff',400:'#58a6ff',500:'#2f83f4',600:'#1864d8',700:'#154fae',800:'#14448c',900:'#122f5f',950:'#0b1f42' },
        ink:   { 50:'#f1f5f9',100:'#e2e8f0',200:'#cbd5e1',300:'#94a3b8',400:'#64748b',500:'#475569',600:'#334155',700:'#1e293b',800:'#0f172a',900:'#0b1220',950:'#060912' },
      },
      fontFamily: { sans:['Inter','system-ui','sans-serif'], mono:['"JetBrains Mono"','ui-monospace','monospace'] },
      boxShadow: {
        'glow':'0 0 0 1px rgb(47 131 244 / 0.25), 0 24px 48px -24px rgb(47 131 244 / 0.45)',
        'card':'0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 20px 40px -24px rgb(0 0 0 / 0.6)',
      },
      animation: {
        'fade-up':'fadeUp .7s cubic-bezier(.2,.7,.2,1) both',
        'blink':'blink 1s steps(1) infinite',
        'float':'float 7s ease-in-out infinite',
        'pulse-ring':'pulseRing 2.2s cubic-bezier(.2,.7,.2,1) infinite',
      },
      keyframes: {
        fadeUp:{'0%':{opacity:0,transform:'translateY(20px)'},'100%':{opacity:1,transform:'none'}},
        blink:{'50%':{opacity:0}},
        float:{'0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-8px)'}},
        pulseRing:{'0%':{transform:'scale(.8)',opacity:.6},'100%':{transform:'scale(2.2)',opacity:0}},
      },
    },
  },
};
