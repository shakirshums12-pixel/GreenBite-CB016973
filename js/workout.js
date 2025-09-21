
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('workout-form');
  const plan = document.getElementById('plan');

  const list = document.getElementById('ex-list');
  const startBtn = document.getElementById('start');

  const timer = document.getElementById('timer');

  let current = [];
  let idx = 0;
  let secs = 30;
  let t = null;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

      const part = document.getElementById('part').value;
    const eq = document.getElementById('equipment').value;

    const options = window.workouts[part][eq];

    // pick maximum 4 random exercises
    current = shuffle(options).slice(0, Math.min(4, options.length));

    list.innerHTML = current.map((x,i)=>`<li>${i+1}. ${x} (30s)</li>`).join('');

    plan.classList.remove('hidden');
    timer.textContent = 'Ready';
  });

  startBtn.addEventListener('click', () => {
    if(current.length === 0) return;

    idx = 0; secs = 30;
    runTimer();
  });

  function runTimer(){

    speak(current[idx]);

    timer.textContent = current[idx] + ' — ' + secs + 's';

    t = setInterval(() => {
      secs--;
      timer.textContent = current[idx] + ' — ' + secs + 's';
      if(secs <= 0){

        clearInterval(t);
        idx++;

        if(idx < current.length){

          secs = 30;
          runTimer();
        } 
        else {
          timer.textContent = 'Done! Great job bro/sis.';
          speak('Workout DONE!');
        }
      }
    }, 1000);
  }

  function shuffle(arr){ return arr.slice().sort(()=>Math.random()-0.5); }

  // simple "beep" using speech synthesis no need to have downlodede audio files 
  function speak(text){

    try {
      const u = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(u);
    } 
    catch {}
  }
});
