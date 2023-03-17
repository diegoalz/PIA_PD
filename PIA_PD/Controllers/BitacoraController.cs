using Microsoft.AspNetCore.Mvc;
using Models;
using BLL;

namespace CRUDReact.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BitacoraController : Controller
    {

        private readonly string Cadena;

        public BitacoraController(IConfiguration Config)
        {
            Cadena = Config.GetConnectionString("PROD");
        }

        [HttpGet]
        [Route("Read")]
        public IActionResult Read()
        {
            List<BITACORA> lstBitacora = BLL_Bitacora.ReadBitacora(Cadena);

            if (lstBitacora.Count > 0)
            {
                return StatusCode(StatusCodes.Status200OK, lstBitacora);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, null);
            }

        }


        [HttpPost]
        [Route("Create")]
        public IActionResult Create([FromBody] clsBitacora Bitacora)
        {
            List<string> lstValidacion = BLL_Bitacora.CreateBitacora(Cadena, Bitacora);

            if (lstValidacion[0] == "00")
            {
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, null);
            }

        }

        [HttpPut]
        [Route("Update")]
        public IActionResult Update([FromBody] BITACORA Bitacora)
        {

            List<string> lstValidacion = BLL_Bitacora.UpdateBitacora(Cadena, Bitacora);


            if (lstValidacion[0] == "00")
            {
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, null);
            }
        }

    }
}
