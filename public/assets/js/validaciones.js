// Path: public/assets/js/validaciones.js
$(document).ready(function () {
  $(".delete-button").click(function () {
    var id = $(this).data("id");
    $.ajax({
      url: "/eliminarTrabajadores/" + id,
      type: "DELETE",
      success: function (result) {
        // Actualiza la tabla de trabajadores o haz lo que necesites hacer
      },
      error: function (xhr, status, error) {
        if (xhr.responseJSON.error === "Trabajador con tareas") {
          Swal.fire({
            title: "Error",
            text: "No se puede eliminar al trabajador porque tiene tareas registradas",
            icon: "error",
            showClass: {
              popup: "animate__animated animate__backInDown",
            },
            hideClass: {
              popup: "animate__animated animate__backOutDown",
            },
            footer: '<a href="/tareas">Ir a tareas</a>',
          });
        }
      },
    });
  });
});
// si la categoria no tiene productos asociados, se elimina
// si la categoria tiene productos asociados, no se elimina y se muestra un mensaje de error en la vista

$(document).on("click", ".eliminar-categoria", function () {
  var id = $(this).data("id");
  $.ajax({
    url: "/eliminarCategoria/" + id,
    type: "DELETE",
    success: function (result) {
      // Actualiza la tabla de categorías o haz lo que necesites hacer
    },
    error: function (xhr, status, error) {
      if (xhr.responseJSON.error === "Categoria con productos") {
        Swal.fire({
          title: "Error",
          text: "No se puede eliminar la categoría porque tiene productos asociados",
          icon: "error",
          showClass: {
            popup: "animate__animated animate__backInDown",
          },
          hideClass: {
            popup: "animate__animated animate__backOutDown",
          },
          footer: '<a href="/productos">Ir a productos</a>',
        });
      }
    },
  });
});

// Esta función se ejecuta cuando el documento HTML ha sido completamente cargado.
$(document).ready(function () {
  // Manejador de eventos para el formulario de actualización
  $("#formActualizacion").on("submit", function (event) {
    event.preventDefault();
    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/aTrabajadores",
      data: formData,
      success: function (response) {
        Swal.fire({
          title: "Éxito",
          text: response.message,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/tabla";
          }
        });
      },
      error: function (xhr, status, error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al actualizar al trabajador",
          icon: "error",
        });
      },
    });
  });
});
