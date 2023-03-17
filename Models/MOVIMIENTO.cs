namespace Models
{
    public class MOVIMIENTO
    {
        public int IdMovimiento { get; set; }
        public int IdTipoMovimiento { get; set; }
        public int CantDolares { get; set; }
        public decimal PUnitario { get; set; }
        public decimal CostoTotal { get; set; }
        public decimal Pago { get; set; }
        public decimal Cambio { get; set; }
        public DateTime FecRegistro { get; set; }
        public int IdUsuario { get; set; }
        public string NombreCompleto { get; set; }

    }
}