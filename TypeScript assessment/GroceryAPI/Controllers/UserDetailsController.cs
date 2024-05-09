using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace GroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetUserList()
        {
            return Ok(_dbContext.users.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user=_dbContext.users.FirstOrDefault(m=>m.UserID==id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] UserDetails user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] UserDetails user)
        {
            var userOld=_dbContext.users.FirstOrDefault(m=>m.UserID==id);
            if(userOld==null)
            {
                return NotFound();
            }
            userOld.Balance=user.Balance;
            _dbContext.SaveChanges();
            return  Ok();
        }
    }
}