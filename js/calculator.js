
document.addEventListener('DOMContentLoaded', () => {
  var form = document.getElementById('calc-form');
  var err = document.getElementById('calc-error');
  var res = document.getElementById('results');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    var age = parseInt(document.getElementById('age').value,10);
    var gender = document.getElementById('gender').value;
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var activity = parseFloat(document.getElementById('activity').value);

    if([age, height, weight].some(x => !x || x<=0)){
      err.textContent = 'Please enter valid numbers.';
      return;
    }
    err.textContent = '';

    let bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'Male' ? 5 : -161);
    bmr = Math.round(bmr);
    var tdee = Math.round(bmr * activity);

    var carbs = Math.round((tdee * 0.50) / 4);
    var protein = Math.round((tdee * 0.20) / 4);
    var fat = Math.round((tdee * 0.30) / 9);

    // update UI
    document.getElementById('bmr').textContent = bmr;
    document.getElementById('tdee').textContent = tdee;
    document.getElementById('carb-g').textContent = carbs;
    document.getElementById('protein-g').textContent = protein;
    document.getElementById('fat-g').textContent = fat;

    res.classList.remove('hidden');
    // animate bars roughly proportional
    document.getElementById('bar-carbs').style.width = '50%';
    document.getElementById('bar-protein').style.width = '20%';
    document.getElementById('bar-fat').style.width = '30%';
  });
});
