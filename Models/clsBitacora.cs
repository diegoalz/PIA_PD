

namespace Models
{
    public class clsBitacora
    {
        public int IdBitacora { get; set; }
        public int IdTipoMovimiento { get; set; }
        public decimal Monto { get; set; }
        public int IdUsuario { get; set; }
        public string FecRegistro { get; set; }
        public string NombreCompleto { get; set; }

    }
}
