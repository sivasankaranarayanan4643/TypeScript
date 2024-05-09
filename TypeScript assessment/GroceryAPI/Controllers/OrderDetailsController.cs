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
    public class OrderDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrderDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetorderList()
        {
            return Ok(_dbContext.orders.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult Getorder(int id)
        {
            var order=_dbContext.orders.FirstOrDefault(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult Postorder([FromBody] OrderDetails order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            return Ok();
        }

        
    }
}