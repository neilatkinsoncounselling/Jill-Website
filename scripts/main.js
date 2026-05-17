document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.site-nav__toggle');
  const navLinks = document.querySelector('.site-nav__links');
  const siteNav = document.querySelector('.site-nav');

  if (!toggle || !navLinks) return;

  /* Keep --nav-height in sync with actual header size */
  const updateNavHeight = () => {
    if (siteNav) {
      document.documentElement.style.setProperty(
        '--nav-height',
        siteNav.offsetHeight + 'px'
      );
    }
  };
  updateNavHeight();

  const closeMenu = () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    updateNavHeight();
    navLinks.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      window.innerWidth <= 960 &&
      document.body.classList.contains('menu-open') &&
      !navLinks.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    updateNavHeight();
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });
});
