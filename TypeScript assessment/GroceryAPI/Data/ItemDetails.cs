using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryAPI.Data
{
    [Table("itemdetails",Schema ="public")]
    public class ItemDetails
    {
        [Key]
        public int ItemID { get; set; }
        public int OrderID { get; set; }
        public int UserID { get; set; }
        public int ProductID { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}