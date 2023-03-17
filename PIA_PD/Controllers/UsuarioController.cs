using Microsoft.AspNetCore.Mvc;
using Models;
using BLL;

namespace CRUDReact.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {

        private readonly string Cadena;

        public UsuarioController(IConfiguration Config)
        {
            Cadena = Config.GetConnectionString("PROD");
        }


        [HttpPost]
        [Route("LoginId")]
        public IActionResult ListaId([FromBody] clsUsuario Usuario)
        {
            List<USUARIO> lstUsuario = BLL_Usuario.LoginId(Cadena, Usuario);

            var dpParametros = new
            {
                IdUsuario = lstUsuario[0].IdUsuario,
                IsActivo = lstUsuario[0].IsActivo
            };


            if (lstUsuario.Count > 0)
            {
                return StatusCode(StatusCodes.Status200OK, dpParametros);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, null);
            }

        }

        [HttpGet]
        [Route("Read")]
        public IActionResult Read()
        {
            List<USUARIO> lstUsuario = BLL_Usuario.ReadUsuario(Cadena);

            if (lstUsuario.Count > 0)
            {
                return StatusCode(StatusCodes.Status200OK, lstUsuario);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, null);
            }

        }


        [HttpPost]
        [Route("Create")]
        public IActionResult Create([FromBody] clsUsuario Usuario)
        {
            List<string> lstValidacion = BLL_Usuario.CreateUsuario(Cadena, Usuario);

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
        public IActionResult Update([FromBody] USUARIO Usuario)
        {

            List<string> lstValidacion = BLL_Usuario.UpdateUsuario(Cadena, Usuario);


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
        [Route("Delete")]
        public IActionResult Delete([FromBody] USUARIO Usuario)
        {

            List<string> lstValidacion = BLL_Usuario.DeleteUsuario(Cadena, Usuario);


            if (lstValidacion[0] == "00")
            {
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, null);
            }
        }

        /*NO LOGICO*/
        //[HttpDelete]
        //[Route("Eliminar/{id:int}")]
        //public IActionResult Eliminar(int id)
        //{

        //    List<string> lstValidacion = BLL_Usuario.EliminarUsuario(Cadena, id);


        //    if (lstValidacion[0] == "00")
        //    {
        //        return StatusCode(StatusCodes.Status200OK, "ok");
        //    }
        //    else
        //    {
        //        return StatusCode(StatusCodes.Status200OK, null);
        //    }
        //}

    }
}
