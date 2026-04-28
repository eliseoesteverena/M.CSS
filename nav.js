/* nav.js — M.CSS shared sidebar */
(function () {
  const pages = [
    { label: 'Inicio', href: 'index.html' },
    { label: 'Documentación', href: 'doc.html' }
  ];

  const sections = {
    'index.html': [
      { label: 'Tipografía',    href: '#typography' },
      { label: 'Formularios',   href: '#forms' },
      { label: 'Layouts',       href: '#layouts' },
      { label: 'Accesibilidad', href: '#accessibility' }
    ],
    'doc.html': [
      { label: 'Introducción',       href: '#introduccion' },
      { label: 'Principios',         href: '#principios' },
      { label: 'Instalación',        href: '#instalacion' },
      { label: 'Variables CSS',      href: '#variables' },
      { label: 'Tipografía',         href: '#tipografia' },
      { label: 'Colores',            href: '#colores' },
      { label: 'Espaciado',          href: '#espaciado' },
      { label: 'Layout',             href: '#layout' },
      { label: 'Dimensiones',        href: '#dimensiones' },
      { label: 'Bordes',             href: '#bordes' },
      { label: 'Display',            href: '#display' },
      { label: 'Accesibilidad',      href: '#accesibilidad' },
      { label: 'Responsive',         href: '#responsive' },
      { label: 'Buenas prácticas',   href: '#buenas-practicas' }
    ]
  };

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  function buildNav() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    document.body.appendChild(overlay);

    // Toggle button (mobile)
    const toggle = document.createElement('button');
    toggle.id = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.textContent = '☰';
    document.body.appendChild(toggle);

    // Sidebar
    const nav = document.createElement('nav');
    nav.id = 'site-nav';
    nav.setAttribute('aria-label', 'Navegación principal');

    // Logo
    const logo = document.createElement('a');
    logo.className = 'nav-logo';
    logo.href = 'index.html';
    logo.textContent = 'M.CSS';
    nav.appendChild(logo);

    // Pages
    const pagesTitle = document.createElement('p');
    pagesTitle.className = 'nav-section-title';
    pagesTitle.textContent = 'Páginas';
    nav.appendChild(pagesTitle);

    const pagesList = document.createElement('ul');
    pages.forEach(p => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.href;
      a.textContent = p.label;
      if (p.href === currentPage) a.classList.add('active');
      li.appendChild(a);
      pagesList.appendChild(li);
    });
    nav.appendChild(pagesList);

    // Sections for current page
    const pageSections = sections[currentPage];
    if (pageSections && pageSections.length) {
      const secTitle = document.createElement('p');
      secTitle.className = 'nav-section-title';
      secTitle.textContent = 'Secciones';
      nav.appendChild(secTitle);

      const secList = document.createElement('ul');
      pageSections.forEach(s => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = s.href;
        a.textContent = s.label;
        li.appendChild(a);
        secList.appendChild(li);
      });
      nav.appendChild(secList);
    }

    document.body.prepend(nav);
    document.body.classList.add('has-sidenav');

    // Toggle behaviour
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', () => {
      nav.classList.remove('open');
      overlay.classList.remove('open');
    });

    // Close on section link click (mobile)
    nav.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        overlay.classList.remove('open');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
