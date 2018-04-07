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
    public class EquiposController : Controller
    {
        private ReactNetCoreContext db = new ReactNetCoreContext();

        [HttpPost("[action]")]
        public JsonResult agregarEquipo([FromBody] TblEquipos pEquipos)
        {
            db.TblEquipos.Add(pEquipos);
            db.SaveChanges();

            return Json(new { Existoso = 1 });
        }

        [HttpPost("[action]")]
        public JsonResult listarEquipos()
        {
            var equipos = db.TblEquipos.Select(x => new TblEquipos
            {
                EquIdEquipo = x.EquIdEquipo,
                EquNombreEquipo = x.EquNombreEquipo
            }).ToList();

            return Json(equipos);
        }

        [HttpPost("[action]")]
        public JsonResult eliminarEquipos([FromBody] TblEquipos pEquipos)
        {
            try
            {
                var Jugadores = db.TblJugadores.FirstOrDefault(x => x.JugIdEquipo == pEquipos.EquIdEquipo);
                db.TblJugadores.Remove(Jugadores);
            }
            catch{

            }

            TblEquipos equipos =db.TblEquipos.Find(pEquipos.EquIdEquipo);
            db.TblEquipos.Remove(equipos);
            db.SaveChanges();

            return Json(new {exitoso = 1 });
        }

        [HttpPost("[action]")]
        public JsonResult actualizarEquipo([FromBody] TblEquipos pEquipos)
        {
            db.Entry(pEquipos).State = EntityState.Modified;
            db.SaveChanges();
            return Json(new { exitoso = 1 });
        }
    }
}
