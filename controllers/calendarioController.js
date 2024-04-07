const { render } = require("ejs");
const db = require("../db/db3");
const { format } = require("date-fns");

const obtenerEventosTrabajador = (id, callback) => {
  db.query(
    "SELECT Fecha, Horas FROM RegistroHoras WHERE ID_Trabajador = ?",
    [id],
    (error, eventos) => {
      if (error) {
        console.error(error);
        callback(error);
      } else {
        const eventosFormateados = eventos.map((row) => {
          return {
            title: "Horas trabajadas",
            start: format(row.Fecha, "yyyy-MM-dd"),
            end: format(row.Fecha, "yyyy-MM-dd"),
            extendedProps: {
              horas: row.Horas,
            },
          };
        });
        console.log("eventos formateados", eventosFormateados);
        callback(null, eventosFormateados);
      }
    }
  );
};

const mostrarCalendario = (req, res) => {
  const idTrabajadorSeleccionado = req.params.id;
  obtenerEventosTrabajador(
    idTrabajadorSeleccionado,
    (error, eventosTrabajador) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error al mostrar el calendario");
      } else {
        console.log("eventos trabajador >: ", { eventos: eventosTrabajador });
        res.render("calendario.ejs", {
          eventos: eventosTrabajador,
          idTrabajador: idTrabajadorSeleccionado,
        });
      }
    }
  );
};

module.exports = { mostrarCalendario };
