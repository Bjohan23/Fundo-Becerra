// document.addEventListener("DOMContentLoaded", function () {
//     const calendarEl = document.getElementById("calendar");
//     const calendar = new FullCalendar.Calendar(calendarEl, {
//       initialView: "dayGridMonth",
//       locale: 'es',
//       events: <%- JSON.stringify(eventos) %>,
//       eventContent: function(info) {
//         return {
//           html: `<div class="fc-content">
//                     <span class="fc-title">${info.event.title}</span>
//                  </div>
//                  <br>
//                  <div class="fc-horas-trabajadas">${info.event.extendedProps.horas } horas</div>`,

//                 };

//       }
//     });

//     calendar.render();
//   });
