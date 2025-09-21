
document.addEventListener('DOMContentLoaded', () => {
  const circle = document.getElementById('circle');
  const btn = document.getElementById('breath-btn');
  const medBtn = document.getElementById('med-start');
  const mins = document.getElementById('mins');
  const left = document.getElementById('med-left');
  const sessions = document.getElementById('sessions');

  sessions.textContent = load('sessions', 0);

  let breathing = null;

  btn.addEventListener('click', () => {
    if(breathing){ 
      clearInterval(breathing); breathing = null;
      circle.style.animation = 'none';
      circle.textContent = 'Paused';
      return;
    }
    circle.textContent = 'Inhale';
    let phase = 0; // 0 inhale, 1 hold, 2 exhale
    circle.style.animation = 'pulse 8s infinite';
    breathing = setInterval(()=>{
      phase = (phase + 1) % 3;
      circle.textContent = phase === 0 ? 'Inhale' : phase === 1 ? 'Hold' : 'Exhale';
    }, 2600);
  });

  // meditation timer
  medBtn.addEventListener('click', () => {
    let total = parseInt(mins.value,10) * 60;
    const i = setInterval(() => {
      total--;
      const m = Math.floor(total/60);
      const s = String(total%60).padStart(2,'0');
      left.textContent = m + ':' + s;
      if(total <= 0){
        clearInterval(i);
        left.textContent = 'Complete';
        const n = (load('sessions', 0) || 0) + 1;
        save('sessions', n);
        sessions.textContent = n;
      }
    }, 1000);
  });

  // ambient sounds (use oscillator to avoid files)
  let audioCtx = null, osc = null;
  document.body.addEventListener('click', (e) => {
    if(!e.target.matches('button[data-sound]')) return;
    const type = e.target.getAttribute('data-sound');
    if(type === 'stop'){ stopSound(); return; }
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    stopSound();
    osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = type === 'rain' ? 200 : 120; // rough vibe
    gain.gain.value = 0.03;
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
  });

  function stopSound(){
    if(osc){ try { osc.stop(); } catch{}; osc = null; }
  }
});

// simple CSS animation via JS-injected style
const style = document.createElement('style');
style.textContent = `@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.2)}100%{transform:scale(1)}}`;
document.head.appendChild(style);
