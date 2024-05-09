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
    public class ItemDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public ItemDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetitemList()
        {
            return Ok(_dbContext.items.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult Getitem(int id)
        {
            var item=_dbContext.items.FirstOrDefault(m=>m.ItemID==id);
            if(item==null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Postitem([FromBody] ItemDetails item)
        {
            _dbContext.items.Add(item);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}