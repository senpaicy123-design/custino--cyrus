// ✏️ CHANGE THE TYPING WORDS HERE
const words = ['Frontend Developer', 'Web Designer', 'Freelancer'];

// Tell CSS that JavaScript is running (enables scroll-reveal animation)
document.documentElement.classList.add('js');

// Mobile menu
const nav = document.getElementById('nav');
document.getElementById('menu').onclick = () => nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a => a.onclick = () => nav.classList.remove('open'));

// Active link while scrolling
const secs = [...document.querySelectorAll('section[id]')];
const links = [...nav.querySelectorAll('a')];
addEventListener('scroll', () => {
  const y = scrollY + 140;
  let cur = secs[0].id;
  secs.forEach(s => { if (y >= s.offsetTop) cur = s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
});

// Scroll reveal (shows everything right away if the browser lacks support)
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add('show'));
}

// Typing effect
const typed = document.getElementById('typed');
let w = 0, c = 0, del = false;
(function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1200); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 50 : 100);
})();

// Contact form: sends messages to your email
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append('access_key', '1dc3247d-614b-4cc2-a822-66d4cb254137');

  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  msg.textContent = '';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();

    if (response.ok) {
      msg.textContent = 'Thanks! Your message was sent.';
      form.reset();
    } else {
      msg.textContent = 'Error: ' + data.message;
    }
  } catch (error) {
    msg.textContent = 'Something went wrong. Please try again.';
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
// Fill the skill bars when the Skills list scrolls into view
const skillsList = document.querySelector('.skills-list');
function fillBars() {
  if (!skillsList || skillsList.classList.contains('go')) return;
  if (skillsList.getBoundingClientRect().top < window.innerHeight * 0.85) {
    skillsList.classList.add('go');
  }
}
addEventListener('scroll', fillBars);
addEventListener('load', fillBars);