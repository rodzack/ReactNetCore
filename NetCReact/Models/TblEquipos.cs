using System;
using System.Collections.Generic;

namespace NetCReact.Models
{
    public partial class TblEquipos
    {
        public TblEquipos()
        {
            TblJugadores = new HashSet<TblJugadores>();
        }

        public int EquIdEquipo { get; set; }
        public string EquNombreEquipo { get; set; }

        public ICollection<TblJugadores> TblJugadores { get; set; }
    }
}
