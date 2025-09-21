
// tiny helper (first-year friendly)
function $(sel, scope=document){ return scope.querySelector(sel); }
function $all(sel, scope=document){ return Array.from(scope.querySelectorAll(sel)); }

function save(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function load(key, fallback=null){
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

// Reusable toast-like message
function showMsg(el, text, ms=2000){
  if(!el) return;
  el.textContent = text;
  el.style.opacity = 1;
  setTimeout(()=>{ el.style.opacity = 0; }, ms);
}
