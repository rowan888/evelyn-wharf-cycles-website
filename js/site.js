document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-navigation');

  if (btn && nav) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
    });
  }

  var year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  initCmsContent();
});

async function initCmsContent() {
  var site = await loadJson('content/site.json');
  var services = await loadJson('content/services.json');
  var bikes = await loadJson('content/bikes.json');

  if (site) {
    renderHeader(site);
    renderHome(site, services);
    renderAbout(site);
    renderContact(site);
    renderFooter(site);
  }

  if (services) {
    renderServicesPage(services);
  }

  if (bikes) {
    renderBikesPage(bikes);
  }
}

async function loadJson(path) {
  try {
    var response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

function renderHome(site, services) {
  var heroTitle = document.querySelector('[data-home-hero-title]');
  var heroText = document.querySelector('[data-home-hero-text]');
  var aboutTitle = document.querySelector('[data-home-about-title]');
  var aboutText = document.querySelector('[data-home-about-text]');
  var servicesPreview = document.querySelector('[data-services-preview]');

  if (heroTitle) heroTitle.textContent = site.home.hero_title;
  if (heroText) heroText.textContent = site.home.hero_text;
  if (aboutTitle) aboutTitle.textContent = site.home.about_title;
  if (aboutText) aboutText.textContent = site.home.about_text;

  if (servicesPreview && services && Array.isArray(services.services)) {
    servicesPreview.innerHTML = services.services.slice(0, 3).map(function (service) {
      return '<article><h3>' + escapeHtml(service.title) + '</h3><p>' + escapeHtml(service.description) + '</p><p class="price-tag">' + escapeHtml(service.price) + '</p></article>';
    }).join('');
  }
}

function renderHeader(site) {
  var brand = document.querySelectorAll('[data-site-brand]');
  var tagline = document.querySelectorAll('[data-site-tagline]');

  brand.forEach(function (node) {
    node.textContent = site.brand;
  });

  tagline.forEach(function (node) {
    node.textContent = site.tagline;
  });
}

function renderAbout(site) {
  var title = document.querySelector('[data-about-title]');
  var intro = document.querySelector('[data-about-intro]');
  var valuesTitle = document.querySelector('[data-about-values-title]');
  var valuesList = document.querySelector('[data-about-values]');

  if (title) title.textContent = site.about.title;
  if (intro) intro.textContent = site.about.intro;
  if (valuesTitle) valuesTitle.textContent = site.about.values_title;

  if (valuesList && Array.isArray(site.about.values)) {
    valuesList.innerHTML = site.about.values.map(function (value) {
      return '<li>' + escapeHtml(value) + '</li>';
    }).join('');
  }
}

function renderServicesPage(services) {
  var title = document.querySelector('[data-services-title]');
  var intro = document.querySelector('[data-services-intro]');
  var list = document.querySelector('[data-services-list]');
  var note = document.querySelector('[data-services-note]');

  if (title) title.textContent = services.title;
  if (intro) intro.textContent = services.intro;
  if (note) note.textContent = services.note;

  if (list && Array.isArray(services.services)) {
    list.innerHTML = services.services.map(function (service) {
      return '<section class="service-card"><h3>' + escapeHtml(service.title) + '</h3><p>' + escapeHtml(service.description) + '</p><p class="price-tag">' + escapeHtml(service.price) + '</p></section>';
    }).join('');
  }
}

function renderBikesPage(bikes) {
  var title = document.querySelector('[data-gallery-title]');
  var intro = document.querySelector('[data-gallery-intro]');
  var grid = document.querySelector('[data-gallery-grid]');

  if (title) title.textContent = bikes.title;
  if (intro) intro.textContent = bikes.intro;

  if (grid && Array.isArray(bikes.bikes)) {
    grid.innerHTML = bikes.bikes.map(function (bike) {
      var statusClass = bike.status && bike.status.toLowerCase() === 'sold' ? 'is-sold' : 'is-available';
      return '<article class="gallery-card ' + statusClass + '">'
        + '<img src="' + escapeAttribute(bike.image) + '" alt="' + escapeAttribute(bike.name) + '">'
        + '<div class="gallery-card-body">'
        + '<h3>' + escapeHtml(bike.name) + '</h3>'
        + '<p class="price-tag">' + escapeHtml(bike.price) + '</p>'
        + '<p>' + escapeHtml(bike.description) + '</p>'
        + '<p class="status-tag">' + escapeHtml(bike.status || 'Available') + '</p>'
        + '</div></article>';
    }).join('');
  }
}

function renderContact(site) {
  var title = document.querySelector('[data-contact-title]');
  var intro = document.querySelector('[data-contact-intro]');
  var address = document.querySelector('[data-contact-address]');
  var hours = document.querySelector('[data-contact-hours]');
  var phone = document.querySelector('[data-contact-phone]');
  var form = document.querySelector('[data-contact-form]');
  var iframe = document.querySelector('[data-contact-map]');

  if (title) title.textContent = site.contact.title;
  if (intro) intro.textContent = site.contact.intro;
  if (address) address.textContent = site.contact.address;
  if (hours) hours.textContent = site.contact.hours;
  if (phone) {
    phone.textContent = site.contact.phone;
    phone.setAttribute('href', 'tel:' + site.contact.phone_digits);
  }
  if (form) {
    form.setAttribute('action', 'mailto:' + site.contact.email);
  }
  if (iframe) {
    iframe.setAttribute('src', 'https://www.google.com/maps?q=' + encodeURIComponent(site.contact.map_query) + '&output=embed');
  }
}

function renderFooter(site) {
  var footerHours = document.querySelector('[data-footer-hours]');
  var footerPhone = document.querySelector('[data-footer-phone]');
  var footerPhoneLink = document.querySelector('[data-footer-phone-link]');

  if (footerHours) footerHours.textContent = site.footer.hours;
  if (footerPhone) footerPhone.textContent = site.footer.phone;
  if (footerPhoneLink) footerPhoneLink.setAttribute('href', 'tel:' + site.footer.phone_digits);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}
