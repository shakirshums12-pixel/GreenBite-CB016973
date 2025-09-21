
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.getElementById('cards');
  const q = document.getElementById('q');
  const category = document.getElementById('category');
  const modal = document.getElementById('recipe-modal');
  const closeBtn = document.getElementById('close-modal');
  const content = document.getElementById('modal-content');

  function render(list){
    cards.innerHTML = list.map(r => `
      <div class="card">
        <img src="${r.image}" alt="${r.title}">
        <h3>${r.title}</h3>
        <p class="tiny">${r.category}</p>
        <p>${r.desc}</p>
        <button class="btn outline" data-id="${r.id}">Open</button>
      </div>
    `).join('');
  }

  function openRecipe(id){
    const r = window.recipes.find(x => x.id == id);
    if(!r) return;
    const rows = Object.entries(r.nutrition).map(([k,v])=>`<tr><th>${k}</th><td>${v}</td></tr>`).join('');
    content.innerHTML = `
      <h2>${r.title}</h2>
      <img src="${r.image}" alt="${r.title}" style="width:100%;border-radius:.6rem">
      <h3>Ingredients</h3>
      <ul>${r.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul>
      <h3>Steps</h3>
      <ol>${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol>
      <h3>Nutrition</h3>
      <table class="card" style="width:100%">
        <tbody>${rows}</tbody>
      </table>
    `;
    modal.showModal();
  }

  function filter(){
    const text = q.value.trim().toLowerCase();
    const cat = category.value;
    const filtered = window.recipes.filter(r => {
      const matchText = r.title.toLowerCase().includes(text);
      const matchCat = !cat || r.category === cat;
      return matchText && matchCat;
    });
    render(filtered);
  }

  cards.addEventListener('click', (e)=>{
    const id = e.target.getAttribute('data-id');
    if(id) openRecipe(id);
  });
  closeBtn.addEventListener('click', ()=> modal.close());
  q.addEventListener('input', filter);
  category.addEventListener('change', filter);

  render(window.recipes);
});
