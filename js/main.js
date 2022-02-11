'use strict';
{
  /* Intersection Observer API */
  
  function inViewCallback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }

  function onScrollCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add('scrolled');
        toTop.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
        toTop.classList.remove('scrolled');
      }
    });
  }

  const header = document.querySelector('header');
  const toTop = document.getElementById('to_top');

  const inViewObserver = new IntersectionObserver(inViewCallback, {
    threshold: 0.2,
  });

  document.querySelectorAll('.animate').forEach(el => {
    inViewObserver.observe(el);
  });

  const onScrollObserver = new IntersectionObserver(onScrollCallback);
  onScrollObserver.observe(document.getElementById('target'));

  toTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  /* メニュー */

  class Menu {
    constructor() {
      this.openMenu = document.getElementById('open-menu');
      this.closeMenu = document.getElementById('close-menu');
      this.overlay = document.querySelector('.overlay');
      this.mask = document.querySelector('.mask');
    }
    addListeners() {
      this.openMenu.addEventListener('click', () => {
        this.overlay.classList.add('show');
        this.mask.classList.remove('disable')
      });
    
      this.closeMenu.addEventListener('click', () => {
        this.overlay.classList.remove('show');
        this.mask.classList.add('disable');
      });
    
      this.mask.addEventListener('click', () => {
        this.closeMenu.click();
      });
    }
  }

  const menu = new Menu();
  menu.addListeners();
  
}