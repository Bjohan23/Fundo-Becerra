//eliminar todas las clases con el nombre active y luego agregarle otra ves la clase segun la direccion que tenga la url
const navItems = document.querySelectorAll(".nav li");

// Eliminar la clase "active" de todos los elementos <li>
navItems.forEach((item) => {
  item.classList.remove("active");
});

// Obtener la URL actual
const currentUrl = window.location.pathname;

// Función para agregar la clase "active" al elemento <li> correspondiente a la URL actual
const setActiveNavItem = (url) => {
  navItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link && link.getAttribute("href") === url) {
      item.classList.add("active");
    }
  });
};

// Llamar a la función para establecer el elemento activo según la URL actual
setActiveNavItem(currentUrl);
