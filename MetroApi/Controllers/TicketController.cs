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
    public class TicketController : ControllerBase
    {
        private static int _IdInfo=3008;
        private static List<Ticket> _Tickets=new List<Ticket>{
            new Ticket{TicketID="MR3001",FromLocation="AirPort",ToLocation="Egmore",TicketFair=55},
            new Ticket{TicketID="MR3002",FromLocation="AirPort",ToLocation="Koyambedu",TicketFair=25},
            new Ticket{TicketID="MR3003",FromLocation="Alandur",ToLocation="Koyambedu",TicketFair=25},
            new Ticket{TicketID="MR3004",FromLocation="Koyambedu",ToLocation="Egmore",TicketFair=32},
            new Ticket{TicketID="MR3005",FromLocation="Vadapalani",ToLocation="Egmore",TicketFair=45},
            new Ticket{TicketID="MR3006",FromLocation="Arumbakkam",ToLocation="Egmore",TicketFair=25},
            new Ticket{TicketID="MR3007",FromLocation="Vadapalani",ToLocation="Koyambedu",TicketFair=25},
            new Ticket{TicketID="MR3008",FromLocation="Arumbakkam",ToLocation="Koyambedu",TicketFair=16}
        };

        [HttpGet]
        public IActionResult GetTicketList()
        {
            return Ok(_Tickets);
        }

        [HttpGet ("{id}")]
        public IActionResult GetTicket(string id)
        {
            var ticket=_Tickets.Find(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpPost]
        public IActionResult PostTicket([FromBody] Ticket ticket)
        {
            _IdInfo++;
            ticket.TicketID=$"MR{_IdInfo}";
            _Tickets.Add(ticket);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutTicket(string id,[FromBody] Ticket ticket)
        {
            var index=_Tickets.FindIndex(m=>m.TicketID==id);
            if(index<0)
            {
                return NotFound();
            }
            _Tickets[index]=ticket;
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTicket(string id)
        {
            var ticket=_Tickets.Find(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            _Tickets.Remove(ticket);
            return Ok();
        }
    }
}