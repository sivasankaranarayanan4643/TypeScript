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
    public class BookingController : ControllerBase
    {
        private static int _IdInfo=2003;
        private static List<Booking> _Bookings=new List<Booking>{
            new Booking{BookingID="TID2001",TicketID="MR3001",Email="sasi@gmail.com",FromLocation="Airport",ToLocation="Egmore",TicketCount=2,TotalPrice=110,TravelDate=new DateTime(2023,10,10)},
            new Booking{BookingID="TID2002",TicketID="MR3004",Email="sasi@gmail.com",FromLocation="Koyambedu",ToLocation="Egmore",TicketCount=1,TotalPrice=32,TravelDate=new DateTime(2023,10,12)},
            new Booking{BookingID="TID2003",TicketID="MR3004",Email="sasi@gmail.com",FromLocation="Koyambedu",ToLocation="Egmore",TicketCount=1,TotalPrice=32,TravelDate=new DateTime(2024,5,12)}
        };

        [HttpGet]
        public IActionResult GetBookingList()
        {
            return Ok(_Bookings);
        }
        [HttpGet("{id}")]
        public IActionResult GetBookingDetails(string id)
        {
            var booking=_Bookings.Find(m=>m.BookingID==id);
            if(booking==null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpPost]
        public IActionResult PostBooking([FromBody] Booking booking)
        {
            _IdInfo++;
            booking.BookingID=$"TID{_IdInfo}";
            _Bookings.Add(booking);
            return Ok();
        }
    }
}