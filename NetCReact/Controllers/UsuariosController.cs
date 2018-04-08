using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetCReact.Models;
using Newtonsoft.Json;

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
            var cUsuario = db.TblUsuarios.
                Where(p => p.UsuNombreUsuario == pUsuarios.UsuNombreUsuario && p.UsuContrasenia == pUsuarios.UsuContrasenia).
                Select(x => new TblUsuarios
                {
                    UsuIdUsuario = x.UsuIdUsuario
                }).Count();

            //var idUsuario = JsonConvert.DeserializeObject(cUsuario);

            return Json(new { idUsuario = cUsuario });
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