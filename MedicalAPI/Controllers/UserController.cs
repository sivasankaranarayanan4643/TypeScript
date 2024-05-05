using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private static List<User> _User=new List<User>{
            new User{UserName="Sasi",Email="sasi@gmail.com",Password="Sasi@123",PhoneNumber="6369765310", Balance=10},
            new User{UserName="Siva",Email="siva@gmail.com",Password="Siva@123",PhoneNumber="9578782905",Balance=12}
        };

        [HttpGet]
        
        public IActionResult GetUsersList()
        {
            return Ok(_User);
        }

        [HttpGet("{email}")]
        public IActionResult GetUser(string email)
        {
            var user=_User.Find(m=>(m.Email==email));
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] User user)
        {
            _User.Add(user);

            return Ok();
        }

        [HttpPut("{email}")]
        public IActionResult PutUser( string email ,[FromBody] User user )
        {
            var index=_User.FindIndex(m=>(m.Email==email));
            if(index<0)
            {
                return NotFound();
            }
            _User[index]=user;
            return Ok();
            
        }

        [HttpDelete("{email}")]
        public IActionResult DeleteUser(string email)
        {
            var user=_User.Find(m=>m.Email==email);
            if(user==null)
            {
                return NotFound();
            }
            _User.Remove(user);
            return Ok();
        }
    }
}