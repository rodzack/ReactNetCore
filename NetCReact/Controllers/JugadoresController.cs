using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCReact.Models;

namespace NetCReact.Controllers
{
    [Route("api/[controller]")]
    public class JugadoresController : Controller
    {
        private ReactNetCoreContext db = new ReactNetCoreContext();

        [HttpPost("[action]")]
        public JsonResult listarJugadores([FromBody] TblJugadores jugadores)
        {
            var listaJugador = db.TblJugadores.Where(z => z.JugIdEquipo == jugadores.JugIdEquipo).
                Select(x => new TblJugadores {
                JugIdEquipo = x.JugIdEquipo,
                JugIdJugador = x.JugIdJugador,
                JugNombreJugador = x.JugNombreJugador
            }).ToList();
            return Json(listaJugador);
        }

        [HttpPost("[action]")]
        public JsonResult eliminarJugadores(TblJugadores jugadores)
        {
            TblJugadores jugador = db.TblJugadores.Find(jugadores.JugIdJugador);
            db.TblJugadores.Remove(jugador);
            db.SaveChanges();

            return Json(new {exitoso = 1 });
        }

        [HttpPost("[action]")]
        public JsonResult actualizarJugadores(TblJugadores jugadores)
        {
            db.Entry(jugadores).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { exitoso = 1 });
        }

        [HttpPost("[action]")]
        public JsonResult agregarJugador([FromBody] TblJugadores jugadores)
        {
            db.TblJugadores.Add(jugadores);
            db.SaveChanges();

            return Json(new { Existoso = 1 });
        }

    }
}