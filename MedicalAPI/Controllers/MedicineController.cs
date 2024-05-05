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
    public class MedicineController : ControllerBase
    {
        private static int _IdInfo=15;
        private static List<Medicines> _Medicines=new List<Medicines>{
            new Medicines{MedicineID="MID11",MedicineName="Paracetomol",MedicineQuantity= 5,MedicinePrice= 50,ExpiryDate=new DateTime(2024,11,2)},
            new Medicines{MedicineID="MID12",MedicineName="Colpal",MedicineQuantity= 5,MedicinePrice= 60,ExpiryDate=new DateTime(2024,11,2)},
            new Medicines{MedicineID="MID13",MedicineName="Stepsil",MedicineQuantity= 5,MedicinePrice= 70,ExpiryDate=new DateTime(2024,11,2)},
            new Medicines{MedicineID="MID14",MedicineName="Iodex",MedicineQuantity= 5,MedicinePrice= 80,ExpiryDate=new DateTime(2024,11,2)},
            new Medicines{MedicineID="MID15",MedicineName="Acetherol",MedicineQuantity= 5,MedicinePrice= 100,ExpiryDate=new DateTime(2023,11,2)}
        };

        [HttpGet]
        public IActionResult GetMedicineList()
        {
            return Ok(_Medicines);
        }

        [HttpGet("{id}")]

        public IActionResult GetMedicine(string id)
        {
            var medicine=_Medicines.Find(m=>m.MedicineID==id);
            if(medicine==null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        [HttpPost]
        public IActionResult PostMedicine([FromBody]Medicines medicine)
        {
            _IdInfo++;
            medicine.MedicineID="MID"+_IdInfo;
            _Medicines.Add(medicine);
            return Ok();   
        }

        [HttpPut("{id}")]
        public IActionResult PutMedicine(string id,[FromBody] Medicines medicine)
        {
            var index=_Medicines.FindIndex(m=>m.MedicineID==id);
            if(index<0)
            {
                return NotFound();
            }
            _Medicines[index]=medicine;
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMedicine(string id)
        {
            var details=_Medicines.Find(m=>m.MedicineID==id);
            if(details==null)
            {
                return NotFound();
            }
            _Medicines.Remove(details);
            return Ok();
        }
    }
}