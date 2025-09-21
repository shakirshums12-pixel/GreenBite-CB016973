
document.addEventListener('DOMContentLoaded', () => {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('cstatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    var name = document.getElementById('cname').value.trim();
    var email = document.getElementById('cemail').value.trim();
    var msg = document.getElementById('cmsg').value.trim();

    if(!name || !email || !msg){
      status.textContent = 'Please fill all fields correctly.';
      status.style.color = 'crimson';
      return;
    }
    //  email validation
    if(!email.includes('@') || !email.includes('.')){
      status.textContent = 'Please enter a valid email.';
      status.style.color = 'crimson';
      return;
    }
    // store feedback stuff in localStorage
    var list = load('feedback', []);
    list.push({ name, email, msg, at: new Date().toISOString() });
    save('feedback', list);
    status.textContent = 'Thanks! Your message was saved in this browser.';
    status.style.color = 'green';
    form.reset();
  });
});
