using Microsoft.AspNetCore.Mvc;
using Models;
using BLL;

namespace CRUDReact.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MovimientoController : Controller
    {

        private readonly string Cadena;

        public MovimientoController(IConfiguration Config)
        {
            Cadena = Config.GetConnectionString("PROD");
        }

        [HttpGet]
        [Route("Read")]
        public IActionResult Read()
        {
            List<MOVIMIENTO> lstMovimiento = BLL_Movimiento.ReadMovimiento(Cadena);

            if (lstMovimiento.Count > 0)
            {
                return StatusCode(StatusCodes.Status200OK, lstMovimiento);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, null);
            }

        }

        [HttpPost]
        [Route("Create")]
        public IActionResult Create([FromBody] clsMovimiento Movimiento)
        {
            List<string> lstValidacion = BLL_Movimiento.CreateMovimiento(Cadena, Movimiento);

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
