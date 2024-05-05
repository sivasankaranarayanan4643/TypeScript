using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroApi.Data
{
    public class Ticket
    {
        public string? TicketID { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public double? TicketFair { get; set; }
    }
}