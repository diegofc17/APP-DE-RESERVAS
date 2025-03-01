
  

//logica para secciones individuales//
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);

    sections.forEach(section => {
      section.classList.remove('active');
    });

    document.getElementById(targetId).classList.add('active');
  });
});