using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetCReact.Models;

namespace NetCReact.Controllers
{
    //[Produces("application/json")]
    //[Route("api/Usuarios")]

    [Route("api/[controller]")]
    public class UsuariosController : Controller
    {
        private ReactNetCoreContext db = new ReactNetCoreContext();

        [HttpPost("[action]")]
        public JsonResult validarUsuario([FromBody] TblUsuarios pUsuarios)
        {
            var IdUsuario = db.TblUsuarios.
                Where(p => p.UsuNombreUsuario == pUsuarios.UsuNombreUsuario && p.UsuContrasenia == pUsuarios.UsuContrasenia).
                Select(x => new TblUsuarios
                {
                    UsuIdUsuario = x.UsuIdUsuario,
                }).FirstOrDefault();

            return Json(IdUsuario);
        }

        [HttpPost("[action]")]
        public JsonResult registrarUsuario([FromBody] TblUsuarios pUsuarios)
        {
            db.TblUsuarios.Add(pUsuarios);
            db.SaveChanges();

            return Json(new { Existoso = 1 });
        }



    }
}