using System;
using System.Collections.Generic;

namespace NetCReact.Models
{
    public partial class TblJugadores
    {
        public int JugIdJugador { get; set; }
        public string JugNombreJugador { get; set; }
        public int JugIdEquipo { get; set; }

        public TblEquipos JugIdEquipoNavigation { get; set; }
    }
}
