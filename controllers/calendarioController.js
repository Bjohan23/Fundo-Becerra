const { render } = require("ejs");
// const db = require("../db/db");
// const { format, isValid } = require("date-fns");

// const obtenerEventosTrabajador = (id, callback) => {
//   db.query(
//     "SELECT Fecha, Horas FROM RegistroHoras WHERE ID_Trabajador = ?",
//     [id],
//     (error, eventos) => {
//       if (error) {
//         console.error(error);
//         callback(error);
//       } else {
//         const eventosFormateados = eventos.map((row) => {
//           return {
//             title: "Horas trabajadas",
//             start: format(row.Fecha, "yyyy-MM-dd"),
//             end: format(row.Fecha, "yyyy-MM-dd"),
//             extendedProps: {
//               horas: row.Horas,
//             },
//           };
//         });
//         console.log("eventos formateados", eventosFormateados);
//         callback(null, eventosFormateados);
//       }
//     }
//   );
// };

// const mostrarCalendario = (req, res) => {
//   const idTrabajadorSeleccionado = req.params.id;
//   obtenerEventosTrabajador(
//     idTrabajadorSeleccionado,
//     (error, eventosTrabajador) => {
//       if (error) {
//         console.error(error);
//         res.status(500).send("Error al mostrar el calendario");
//       } else {
//         console.log("eventos trabajador >: ", { eventos: eventosTrabajador });
//         res.render("calendario.ejs", {
//           eventos: eventosTrabajador,
//           idTrabajador: idTrabajadorSeleccionado,
//         });
//       }
//     }
//   );
// };

// module.exports = { mostrarCalendario };



// -------postgrest-------------------------------------------------------------postgrest

const db = require("../db/db"); // Asegúrate de actualizar esta ruta al archivo donde exportas tu conexión db
const { format, isValid } = require("date-fns");
const obtenerEventosTrabajador = async (id) => {
  try {
    const eventos =
      await db`SELECT fecha, Horas FROM RegistroHoras WHERE ID_Trabajador = ${id}`;
    console.log("events hora:", eventos);
    const eventosFormateados = eventos
      .map((row) => {
        const fecha = new Date(row.fecha);
        if (!isValid(fecha)) {
          console.error(`Fecha no válida: ${row.fecha}`);
          return null;
        }
        return {
          title: "Horas trabajadas",
          start: format(fecha, "yyyy-MM-dd"),
          end: format(fecha, "yyyy-MM-dd"),
          extendedProps: {
            horas: row.horas,
          },
        };
      })
      .filter((evento) => evento !== null); // Filtrar los eventos nulos
    console.log("eventos formateados", eventosFormateados);
    return eventosFormateados;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const mostrarCalendario = async (req, res) => {
  const idTrabajadorSeleccionado = req.params.id;
  try {
    const eventosTrabajador = await obtenerEventosTrabajador(
      idTrabajadorSeleccionado
    );
    console.log("eventos trabajador >: ", { eventos: eventosTrabajador });
    res.render("calendario.ejs", {
      eventos: eventosTrabajador,
      idTrabajador: idTrabajadorSeleccionado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al mostrar el calendario");
  }
};

module.exports = { mostrarCalendario };
