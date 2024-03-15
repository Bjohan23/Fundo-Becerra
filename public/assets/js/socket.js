const socket = io();
socket.on("numUsers", function (numUsers) {
  // Actualiza la interfaz de usuario con el número de usuarios conectados
  document.querySelector("#numUsers").textContent = "🟢" + numUsers;
});

// ------------ nurevo registro
// Escuchar el evento "nuevoTrabajador"
socket.on("nuevoTrabajador", function (trabajador) {
  // Agregar la fila con los datos del nuevo trabajador a la tabla
  const newRow = `
    <tr>
      <td>${trabajador.nombres}</td>
      <td>${trabajador.apellidos}</td>
      <td>${trabajador.celular}</td>
      <td class="text-center">
        <a href="/trabajadores_edit/${trabajador.id}" class="btn btn-success btn-icon btn-sm">
          <i class="fa fa-edit"></i>
        </a>
        <br />
        <br />
        <form method="post" action="/eliminarTrabajadores/${trabajador.id}">
          <button type="submit" class="btn btn-danger btn-icon btn-sm">
            <i class="fa fa-trash"></i>
          </button>
        </form>
        <br />
        <br />
        <!-- calendario icono  -->
        <a href="/mostraCalendario/${trabajador.id}" class="btn btn-info btn-icon btn-sm">
          <i class="fa fa-calendar"></i>
        </a>
      </td>
    </tr>`;
  // Agregar la nueva fila a la tabla
  document.querySelector("table tbody").innerHTML += newRow;
});

socket.on("nuevaTarea", function (tarea) {
  // Agregar la fila con los datos de la nueva tarea a la tabla
  const newRow = `
    <tr>
      <td>${tarea.id}</td>
      <td>${tarea.trabajador}</td>
      <td>${tarea.descripcion}</td>
      <td><label class="checkbox-btn">
      <label for="checkbox"></label>
      <input id="checkbox" type="checkbox" />
      <span class="checkmark"></span>
    </label></td>
    </tr>
  `;
  document.querySelector("tbody").innerHTML += newRow;
});

// nueva categoria
socket.on("nuevaCategoria", (categoria) => {
  const nuevaFila = `
    <tr data-id="${categoria.id}">
      <th scope="row" style="color: aliceblue">${categoria.id}</th>
      <td>${categoria.nombre}</td>
      <td>
        <a href="/editarCategoria/${categoria.id}" class="btn btn-success btn-icon btn-sm">
          <i class="fa fa-edit"></i>
        </a>
      </td>
      <td>
        <form method="post" action="/eliminarCategoria/${categoria.id}">
          <button type="submit" class="btn btn-danger btn-icon btn-sm eliminar-categoria">
            <i class="fa fa-trash"></i>
          </button>
        </form>
      </td>
    </tr>`;
  // Agregar la nueva fila a la tabla
  document.querySelector("table tbody").innerHTML += nuevaFila;
});

// nuevo cultivo
socket.on("nuevoCultivo", (cultivo) => {
  const nuevaFila = `
    <tr data-id="${cultivo.id}">
      <th scope="row" style="color: aliceblue">${cultivo.id}</th>
      <td>${cultivo.categoria}</td>
      <td>${cultivo.peso}</td>
      <td>${cultivo.cantidad}</td>
      <td>${cultivo.fecha}</td>
      <td>
        <a href="/editarCultivo/${cultivo.id}" class="btn btn-success btn-icon btn-sm">
          <i class="fa fa-edit"></i>
        </a>
      </td>
      <td>
        <form method="post" action="/eliminarCultivos/${cultivo.id}">
          <button type="submit" class="btn btn-danger btn-icon btn-sm eliminar-cultivo">
            <i class="fa fa-trash"></i>
          </button>
        </form>
      </td>
    </tr>`;
  // Agregar la nueva fila a la tabla
  document.querySelector("table tbody").innerHTML += nuevaFila;
});
//-------------------  eliminar
socket.on("trabajadorEliminado", function (data) {
  // Buscar la fila con el id del trabajador eliminado y eliminarla
  const fila = document.querySelector(`tr[data-id='${data.id}']`);
  if (fila) {
    fila.remove();
  }
});

socket.on("cultivoEliminado", (data) => {
  const fila = document.querySelector(`tr[data-id='${data.id}']`);
  if (fila) {
    fila.remove();
  }
});

socket.on("categoriaEliminada", function (data) {
  // Buscar la fila con el id de la categoría eliminada y eliminarla
  const fila = document.querySelector(`tr[data-id='${data.id}']`);
  if (fila) {
    fila.remove();
  }
});
socket.on("tareaEliminada", function (data) {
  // Buscar la fila con el id de la tarea eliminada y eliminarla
  const fila = document.querySelector(`tr[data-id='${data.id}']`);
  if (fila) {
    fila.remove();
  }
});

//------------------------actualizar
socket.on("trabajadorActualizado", function (data) {
  // Buscar la fila con el id del trabajador actualizado
  const fila = document.querySelector(`tr[data-id='${data.id}']`);
  if (fila) {
    // Actualizar los datos de la fila
    fila.querySelector("td:nth-child(1)").textContent = data.nombres;
    fila.querySelector("td:nth-child(2)").textContent = data.apellidos;
    fila.querySelector("td:nth-child(3) a").textContent = data.celular;
    fila.querySelector("td:nth-child(3) a").href = `tel:${data.celular}`;
    fila.querySelector(
      "td:nth-child(4) a:nth-child(1)"
    ).href = `/trabajadores_edit/${data.id}`;
    fila.querySelector(
      "td:nth-child(4) form"
    ).action = `/eliminarTrabajadores/${data.id}`;
    fila.querySelector(
      "td:nth-child(4) a:nth-child(5)"
    ).href = `/mostraCalendario/${data.id}`;
  }
});

socket.on("categoriaActualizada", function (data) {
  const fila = document.querySelector(`tr[data-id='${data.id}']`);
  if (fila) {
    fila.querySelector("td:nth-child(2)").textContent = data.nombre;
    fila.querySelector(
      "td:nth-child(3) a"
    ).href = `/editarCategoria/${data.id}`;
    fila.querySelector(
      "td:nth-child(4) form"
    ).action = `/eliminarCategoria/${data.id}`;
  }
});
socket.on("cultivoActualizado", function (data) {
  const fila = document.querySelector(`tr[data-id='${data.id}']`);
  if (fila) {
    fila.querySelector("td:nth-child(2)").textContent = data.categoria;
    fila.querySelector("td:nth-child(3)").textContent = data.peso;
    fila.querySelector("td:nth-child(4)").textContent = data.cantidad;
    fila.querySelector("td:nth-child(5)").textContent = data.fecha;
    fila.querySelector("td:nth-child(6) a").href = `/editarCultivo/${data.id}`;
    fila.querySelector(
      "td:nth-child(7) form"
    ).action = `/eliminarCultivos/${data.id}`;
  }
});

// mostramos la tarea actualizada io.emit("tareaActualizada", { id, estado });
socket.on("tareaActualizada", function (data) {
  // Buscar la fila con el id de la tarea actualizada
  const fila = document.querySelector(`tr[data-id='${data.id}']`);
  if (fila) {
    // Actualizar el estado del checkbox
    fila.querySelector("td:nth-child(4) input").checked = data.estado == 1;

    // Mostrar u ocultar el botón de eliminación en función del estado
    if (data.estado == 1) {
      console.log("mostrar 1");
      fila.querySelector("td:nth-child(5) button").style.display = "block";
    } else {
      fila.querySelector("td:nth-child(5) button").style.display = "none";
    }
  }
});

// full screen
document
  .getElementById("fullscreenButton")
  .addEventListener("click", function () {
    fullscreenButton.style.display = "none";
    exitFullscreenButton.style.display = "block";
    //
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    }
  });
// salir full screen
document
  .getElementById("exitFullscreenButton")
  .addEventListener("click", function () {
    exitFullscreenButton.style.display = "none";
    fullscreenButton.style.display = "block";
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    }
  });
