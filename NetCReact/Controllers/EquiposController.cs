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
                db.TblJugadores.RemoveRange(db.TblJugadores.Where(x => x.JugIdEquipo == pEquipos.EquIdEquipo));
                db.SaveChanges();

                db.TblEquipos.Remove(db.TblEquipos.Where(x => x.EquIdEquipo == pEquipos.EquIdEquipo).FirstOrDefault());
                db.SaveChanges();

                //TblEquipos equipos = db.TblEquipos.Find(pEquipos.EquIdEquipo);
                //db.TblEquipos.Remove(equipos);
                //db.SaveChanges();

            }
            catch(Exception e){
                Console.WriteLine("Error:" + e);
            }
            

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
