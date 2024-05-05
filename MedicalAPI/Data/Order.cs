using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;

namespace MedicalAPI.Data
{
    public class Order
    {
        public string? OrderID { get; set; }
        public string? MedicineID { get; set; }
        public string? Email { get; set; }
        public string? MedicineName { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? OrderStatus { get; set; }
    }
}