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
    public class ProductDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public ProductDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetproductList()
        {
            return Ok(_dbContext.products.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult Getproduct(int id)
        {
            var product=_dbContext.products.FirstOrDefault(m=>m.ProductID==id);
            if(product==null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult Postproduct([FromBody] ProductDetails product)
        {
            _dbContext.products.Add(product);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Putproduct(int id, [FromBody] ProductDetails product)
        {
            var productOld=_dbContext.products.FirstOrDefault(m=>m.ProductID==id);
            if(productOld==null)
            {
                return NotFound();
            }
            productOld.ProductName=product.ProductName;
            productOld.Quantity=product.Quantity;
            productOld.Price=product.Price;
            productOld.ExpiryDate=product.ExpiryDate;
            productOld.PurchaseDate=product.PurchaseDate;
            productOld.Image=product.Image;
            _dbContext.SaveChanges();
            return  Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product=_dbContext.products.FirstOrDefault(m=>m.ProductID==id);
            if(product==null)
            {
                return NotFound();
            }
            _dbContext.products.Remove(product);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}