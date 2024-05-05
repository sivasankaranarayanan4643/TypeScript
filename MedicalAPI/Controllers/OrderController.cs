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
    public class OrderController : ControllerBase
    {
        private static int _IdInfo=102;
        private static List<Order> _Orders=new List<Order>{
            new Order{OrderID="OID101",MedicineID="MID11",Email="sasi@gmail.com",MedicineName="Paracetomol",Quantity=2,Price=100,ExpiryDate=new DateTime(2024,11,2),OrderStatus="Ordered"},
            new Order{OrderID="OID102",MedicineID="MID12",Email="sasi@gmail.com",MedicineName="Colpal",Quantity=2,Price=140,ExpiryDate=new DateTime(2024,11,2),OrderStatus="Ordered"}

        };
        [HttpGet]
        public IActionResult GetOrderList()
        {
            return Ok(_Orders);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrder(string id)
        {
            var order=_Orders.Find(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult PostOrder([FromBody] Order order)
        {
            _IdInfo++;
            order.OrderID="OID"+_IdInfo;
            _Orders.Add(order);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutOrder(string id,[FromBody] Order order)
        {
            var index=_Orders.FindIndex(m=>m.OrderID==id);
            if(index<0)
            {
                return NotFound();
            }
            _Orders[index]=order;
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(string id)
        {
            var order=_Orders.Find(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            _Orders.Remove(order);
            return Ok();
            
        }
    }
}