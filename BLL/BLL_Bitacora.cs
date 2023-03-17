using System.Data;
using System.Data.SqlClient;
using Models;
using DAL;

namespace BLL
{
    public class BLL_Bitacora
    {
        public static List<BITACORA> ReadBitacora(string P_Cadena)
        {
            List<BITACORA> lstBitacora = new List<BITACORA>();

            var dpParametros = new
            {
                Accion = 1,
            };

            DataTable Dt = Contexto.Funcion_StoreDB(P_Cadena, "spReadBitacora", dpParametros);

            lstBitacora = (from item in Dt.AsEnumerable()
                            select new BITACORA
                            {
                                IdBitacora = item.Field<int>("IdBITACORA"),
                                IdTipoMovimiento = item.Field<int>("IdTipoMovimiento"),
                                Monto = item.Field<decimal>("Monto"),
                                FecRegistro = item.Field<DateTime>("FecRegistro"),
                                IdUsuario = item.Field<int>("IdUsuario"),
                                NombreCompleto = item.Field<string>("NombreCompleto")
                            }
                            ).ToList<BITACORA>();
            return lstBitacora;

        }

        public static List<string> CreateBitacora(string P_Cadena, clsBitacora Bitacora)
        {
            List<string> lstValidacion = new List<string>();

            try
            {
                var dpParametros = new
                {
                    IdTipoMovimiento = Bitacora.IdTipoMovimiento,
                    Monto = Bitacora.Monto,
                    IdUsuario = Bitacora.IdUsuario
                };

                Contexto.Procedimiento_StoreDB(P_Cadena, "spCreateBitacora", dpParametros);

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
        public static List<string> UpdateBitacora(string P_Cadena, BITACORA Bitacora)
            {
                List<string> lstValidacion = new List<string>();
                try
                {
                    var dpParametros = new
                    {
                        IdBitacora = Bitacora.IdBitacora,
                        Monto = Bitacora.Monto
                    };
                    Contexto.Procedimiento_StoreDB(P_Cadena, "spUpdateBitacora", dpParametros);
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
