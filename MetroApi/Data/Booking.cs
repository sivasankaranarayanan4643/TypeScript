using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroApi.Data
{
    public class Booking
    {
        public string? BookingID { get; set; }
        public String? TicketID { get; set; }
        public string? Email { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public int? TicketCount { get; set; }
        public double? TotalPrice { get; set; }
        public DateTime? TravelDate { get; set; }
    }
}