using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAPI.Data
{
    public class Medicines
    {
        public string? MedicineID { get; set; }
        public string? MedicineName { get; set; }
        public int? MedicineQuantity { get; set; }
        public double? MedicinePrice { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}