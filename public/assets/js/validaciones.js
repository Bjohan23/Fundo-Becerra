$(document).ready(function () {
  $(".delete-button").click(function () {
    var id = $(this).data("id");
    console.log("click");
    console.log(id);
    $.ajax({
      url: "/eliminarTrabajadores/" + id,
      type: "DELETE",
      success: function (result) {
        // Actualiza la tabla de trabajadores o haz lo que necesites hacer
      },
      error: function (xhr, status, error) {
        if (xhr.responseJSON.error === "Trabajador con tareas") {
          swal({
            title: "Error",
            text: "No se puede eliminar al trabajador porque tiene tareas registradas",
            icon: "error",
          });
        }
      },
    });
  });
});
