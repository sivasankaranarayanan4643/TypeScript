using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetroApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace MetroApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private static List<User> _Users=new List<User>{
            new User{UserName="Sasi",Email="sasi@gmail.com",Password="Sasi@123",Phone="9578782905",Balance=100},
            new User{UserName="Siva",Email="siva@gmail.com",Password="Siva@123",Phone="6369765310",Balance=500}
        };
        [HttpGet]
        public IActionResult GetUserList()
        {
            return Ok(_Users);
        }

        [HttpGet("{email}")]
        public IActionResult GetUser(string email)
        {
            var user=_Users.Find(m=>m.Email==email);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] User user)
        {
            _Users.Add(user);
            return Ok();
        }

        [HttpPut("{email}")]

        public IActionResult PutUser(string email,[FromBody] User user)
        {
            var index=_Users.FindIndex(m=>m.Email==email);
            if(index<0)
            {
                return NotFound();
            }
            _Users[index]=user;
            return Ok();
        }

    }
}