using System.Data;
using System.Data.SqlClient;
using Models;
using DAL;

namespace BLL
{
    public class BLL_Movimiento
    {
        public static List<MOVIMIENTO> ReadMovimiento(string P_Cadena)
        {
            List<MOVIMIENTO> lstMovimiento = new List<MOVIMIENTO>();

            var dpParametros = new
            {
                Accion = 1,
            };

            DataTable Dt = Contexto.Funcion_StoreDB(P_Cadena, "spReadMovimiento", dpParametros);

            lstMovimiento = (from item in Dt.AsEnumerable()
                             select new MOVIMIENTO
                             {
                                 IdTipoMovimiento = item.Field<int>("IdTipoMovimiento"),
                                 CantDolares = item.Field<int>("CantDolares"),
                                 PUnitario = item.Field<decimal>("PUnitario"),
                                 CostoTotal = item.Field<decimal>("CostoTotal"),
                                 Pago = item.Field<decimal>("Pago"),
                                 Cambio = item.Field<decimal>("Cambio"),
                                 FecRegistro = item.Field<DateTime>("FecRegistro"),
                                 IdUsuario = item.Field<int>("IdUsuario"),
                                 NombreCompleto = item.Field<string>("NombreCompleto")
                             }
                            ).ToList<MOVIMIENTO>();
            return lstMovimiento;

        }

        public static List<string> CreateMovimiento(string P_Cadena, clsMovimiento Movimiento)
        {
            List<string> lstValidacion = new List<string>();

            try
            {
                var dpParametros = new
                {
                    IdTipoMovimiento = Movimiento.IdTipoMovimiento,
                    CantDolares = Movimiento.CantDolares,
                    PUnitario = Movimiento.PUnitario,
                    CostoTotal = Movimiento.CostoTotal,
                    Pago = Movimiento.Pago,
                    Cambio = Movimiento.Cambio,
                    IdUsuario = Movimiento.IdUsuario
                };

                Contexto.Procedimiento_StoreDB(P_Cadena, "spCreateMovimiento", dpParametros);

                lstValidacion.Add("00");
                lstValidacion.Add("Registro Guardado con Éxito");
            }
            catch (SqlException e)
            {
                lstValidacion.Add("14");
                lstValidacion.Add(e.Message);
            }
            return lstValidacion;
        }
    }
}
