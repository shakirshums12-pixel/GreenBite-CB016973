
document.addEventListener('DOMContentLoaded', () => {
  // year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // hamburger
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if(btn && nav){

    btn.addEventListener('click', () => {

      const open = nav.style.display === 'flex';
      nav.style.display = open ? 'none' : 'flex';

      btn.setAttribute('aria-expanded', String(!open));
      });
  }

  //  rotating lines
  const lines = [
    'Eat well. Sleep more. Breathe hard.',
    'Walk Small steps but take big leaps bro you got this.',
    'Food is like petrol . You eat more you simulateneously work more (just dont overeat).',
    'Consistency over Stupidity.',
     'Sugar is Mans worst Temptation (Speaking from experience).',
    'Switch off that God Damnn phone and Go to bed tonight early.',

    'Meditate 10 mins after sleeping.',
    'Eat Home Food, your Wife Cooks good  food.'

  ];
  const h = document.getElementById('hero-line');
  if(h){

    let i = new Date().getSeconds() % lines.length;

    h.textContent = lines[i];
    setInterval(() => {

        i = (i + 1) % lines.length;
      h.textContent = lines[i];
    }, 3500);
  }

  // tip of the day (date-based)
  const tips = [
    'Taking the Deepest breath when you Wake is the best way to start your day.',
    'Add a veggie to every meal and dont forget the meat or youll be weak like a bamboo tree.',
    'Cut that sugar and see how your life automatically gets better.',
    'Drink water. 4 litres a day - David gogins.',
    'Run whenever you can. Take the stairs.'
    
  ];
  const tip = document.getElementById('tip');
  if(tip){
    const d = new Date(); // simple day index
    const idx = (d.getFullYear() + d.getMonth() + d.getDate()) % tips.length;
    tip.textContent = tips[idx];
  }

  // Saving the newsletter to the browser local storage
  const form = document.getElementById('newsletter');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = form.email.value.trim();
      const list = load('newsletter', []);

      if(email && !list.includes(email)){
        list.push(email);

        save('newsletter', list);
        showMsg(document.getElementById('news-msg'), 'Subscribed!');
        form.reset();
      }
      else{
        showMsg(document.getElementById('news-msg'), 'Please enter a new email');
      }
    });
  }

  //  recipes on homepage 
  const grid = document.getElementById('featured-grid');
  if(grid && window.recipes){
    grid.innerHTML = window.recipes.slice(0,3).map(r => `
      <div class="card">
        <img src="${r.image}" alt="${r.title}">
        <h3>${r.title}</h3>
        <p class="tiny">${r.category}</p>
        <a class="btn outline" href="recipes.html">View</a>
      </div>
    `).join('');
  }

  // register service worker (PWA)

  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
});
