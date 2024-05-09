interface userDetails{
    userID:any,
    userName:string,
    email:string,
    password:string,
    address:string,
    balance:number,
    image:string[]
}

interface productDetails{
    productID:any,
    expiryDate:string,
    purchaseDate:string,
    productName:string,
    quantity:number,
    price:number,
    image:string[]
}

interface itemDetails{
    itemID:any,
    orderID:number,
    userID:number,
    productID:number,
    itemName:string,
    quantity:number,
    price:number
}
interface tempItemDetails{
    productID:number,
    userID:number,
    itemName:string,
    quantity:number,
    price:number
}

interface orderDetails{
    orderID:any,
    userID:number,
    totalPrice:number
}

async function FetchUsers():Promise<userDetails[]>
{
    const response=await fetch("http://localhost:5182/api/userdetails");
    if(!response.ok)
    {
        throw new Error ("Failed fetching user");
    }
    return await response.json();
}
async function AddUsers(user:userDetails):Promise<void>
{
    const response=await fetch ("http://localhost:5182/api/userdetails",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error ("Failed adding user");
    }
}
async function UpdateUsers(id:number,user:userDetails):Promise<void>
{
    const response=await fetch(`http://localhost:5182/api/userdetails/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    });
    if(!response.ok)
        {
            throw new Error("Failed to update user");
        }
}
async function FetchProducts():Promise<productDetails[]>
{
    const response=await fetch(`http://localhost:5182/api/productdetails`);
    if(!response.ok)
        {
            throw new Error("failed to fetch products");
        }
    return await response.json();
}
async function AddProducts(product:productDetails):Promise<void>
{
    const response=await fetch ("http://localhost:5182/api/productdetails",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(product)
    });
    if(!response.ok)
    {
        throw new Error ("Failed adding products");
    }
    productDetails();
}
async function UpdateProducts(id:number,product:productDetails):Promise<void>
{
    const response=await fetch(`http://localhost:5182/api/productdetails/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(product)
    });
    if(!response.ok)
        {
            throw new Error("Failed to update product");
        }
        productDetails();
}
async function DeleteProduct(id:number):Promise<void>
{
    const response=await fetch(`http://localhost:5182/api/productdetails/${id}`,{
        method:'DELETE',
    });
    if(!response.ok)
    {
        throw new Error("Deleting products failed");
    }
    productDetails();
}
async function FetchOrders():Promise<orderDetails[]>
{
    const response=await fetch(`http://localhost:5182/api/orderdetails`);
    if(!response.ok)
        {
            throw new Error("failed to fetch Orders");
        }
    return await response.json();
}
async function AddOrders(order:orderDetails):Promise<void>
{
    const response=await fetch ("http://localhost:5182/api/orderdetails",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(order)
    });
    if(!response.ok)
    {
        throw new Error ("Failed adding Orders");
    }
}
async function FetchItems():Promise<itemDetails[]>
{
    const response=await fetch("http://localhost:5182/api/itemdetails");
    if(!response.ok)
    {
        throw new Error ("Failed fetching user");
    }
    return await response.json();
}
async function AddItems(item:itemDetails):Promise<void>
{
    const response=await fetch ("http://localhost:5182/api/itemdetails",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(item)
    });
    if(!response.ok)
    {
        throw new Error ("Failed adding Items");
    }
    cartdetails();
}

async function ConvertToBase64(file:File):Promise<string>
{
    return new Promise((resolve)=>
    {
        let fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            const buffer=fileReader.result as string;
            resolve(buffer);
        }
    })
}
let currentUser:userDetails;
let signinpage=(document.getElementById("signinpage")as HTMLFormElement);
let signuppage=(document.getElementById("signuppage") as HTMLFormElement);
function NewUser()
{
    let newuser=(document.getElementById("new-user")as HTMLButtonElement);
    let OldUser=(document.getElementById("user")as HTMLButtonElement);
    let useremail=(document.getElementById("useremail")as HTMLInputElement);
    let userpassword=(document.getElementById("userpassword") as HTMLInputElement);
    signinpage.classList.add("notshow");
    signuppage.classList.remove("notshow");
    OldUser.classList.remove("selectedoption");
    newuser.classList.add("selectedoption");
    useremail.value="";
    userpassword.value="";
}
function OldUser()
{
    let newuser=(document.getElementById("new-user")as HTMLButtonElement);
    let OldUser=(document.getElementById("user")as HTMLButtonElement);
    let useremail=(document.getElementById("email")as HTMLInputElement);
    let userpassword=(document.getElementById("password") as HTMLInputElement);
    let userconfirmpassword=(document.getElementById("confirmpassword") as HTMLInputElement);
    let userName=(document.getElementById("username") as HTMLInputElement);
    let address=(document.getElementById("address")as HTMLTextAreaElement);
    let balance=(document.getElementById("balance")as HTMLInputElement);
    let image=(document.getElementById("imageupload")as HTMLInputElement);
    signuppage.classList.add("notshow");
    signinpage.classList.remove("notshow");
    newuser.classList.remove("selectedoption");
    OldUser.classList.add("selectedoption");
    useremail.value="";
    userpassword.value="";
    userconfirmpassword.value="";
    userName.value="";
    address.value="";
    balance.value="";
    image.value="";
}
signinpage.addEventListener("submit",async(event)=>
{
    event.preventDefault();
    let userList=await FetchUsers();
    let exist:boolean=false;
    let index=(document.getElementById("application")as HTMLDivElement);
    let mainpage=(document.getElementById("mainpage")as HTMLDivElement);
    let useremail=(document.getElementById("useremail")as HTMLInputElement);
    let userpassword=(document.getElementById("userpassword") as HTMLInputElement);
    let homepage=(document.getElementById("homepage")as HTMLDivElement);
    let namedisplay=(document.getElementById("nameshow")as HTMLLabelElement);
    userList.forEach((user)=>
    {
        if(user.email==useremail.value && user.password==userpassword.value)
        {
            exist=true;
            index.classList.add("notshow");
            mainpage.classList.remove("notshow");
            homepage.innerHTML=`<img src="${user.image}" class="profile" id="profile">Hi ${user.userName}`
            namedisplay.innerHTML=user.userName;
            currentUser=user;
            homepage.classList.add("selectedpage");
            alert("signin successful");
            return;
        }
    })
    if(!exist)
    {
        alert("Invalid email or password");
    }

});

signuppage.addEventListener("submit",async(event)=>
{
    event.preventDefault();
    let newuser=(document.getElementById("new-user")as HTMLButtonElement);
    let OldUser=(document.getElementById("user")as HTMLButtonElement);
    let exist:boolean=false;
    let useremail=(document.getElementById("email")as HTMLInputElement);
    let userpassword=(document.getElementById("password") as HTMLInputElement);
    let userconfirmpassword=(document.getElementById("confirmpassword") as HTMLInputElement);
    let userName=(document.getElementById("username") as HTMLInputElement);
    let address=(document.getElementById("address")as HTMLTextAreaElement);
    let balance=(document.getElementById("balance")as HTMLInputElement);
    let image:any=(document.getElementById("imageupload")as HTMLInputElement);
    let userList=await FetchUsers();
    userList.forEach((user)=>
    {
        if(user.email==useremail.value)
        {
            exist=true;
            return;
        }
    })
    if(!exist)
    {
        let file=image.files?.[0];
        let data=await ConvertToBase64(file);
        const user:userDetails={
            userID:undefined,
            userName:userName.value,
            email:useremail.value,
            password:userpassword.value,
            address:address.value,
            balance:Number(balance.value),
            image:[data]
        };
        AddUsers(user);
        alert("Registration successful");
        signuppage.classList.add("notshow");
        signinpage.classList.remove("notshow");
        newuser.classList.remove("selectedoption");
        OldUser.classList.add("selectedoption");
        useremail.value="";
        userpassword.value="";
        userconfirmpassword.value="";
        userName.value="";
        address.value="";
        balance.value="";
        image.value="";
    }
});

function homeselected()
{
    let previousmenu=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".selectedpage")as HTMLDivElement);
    let presentpage=(document.getElementById("homepage")as HTMLDivElement);
    let presentmenu=(document.getElementById("home")as HTMLUListElement);
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
}
function productselected()
{
    let previousmenu=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".selectedpage")as HTMLDivElement);
    let presentpage=(document.getElementById("productspage")as HTMLDivElement);
    let presentmenu=(document.getElementById("products")as HTMLUListElement);
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    productDetails();
}
function purchaseselected()
{
    let previousmenu=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".selectedpage")as HTMLDivElement);
    let presentpage=(document.getElementById("purchasepage")as HTMLDivElement);
    let presentmenu=(document.getElementById("purchase")as HTMLUListElement);
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    purchaseview();
}
function cartselected()
{
    let previousmenu=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".selectedpage")as HTMLDivElement);
    let presentpage=(document.getElementById("cartpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("cart")as HTMLUListElement);
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    cartdetails();
}
function historyselected()
{
    let previousmenu=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".selectedpage")as HTMLDivElement);
    let presentpage=(document.getElementById("historypage")as HTMLDivElement);
    let presentmenu=(document.getElementById("history")as HTMLUListElement);
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    orderhistory();
}
function rechargeselected()
{
    let previousmenu=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".selectedpage")as HTMLDivElement);
    let presentpage=(document.getElementById("rechargepage")as HTMLDivElement);
    let presentmenu=(document.getElementById("recharge")as HTMLUListElement);
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    let adding=(document.getElementById("amount")as HTMLInputElement);
    adding.value="";
    let balance=(document.getElementById("balancemessage")as HTMLLabelElement);
    balance.innerHTML=`Your current balance is <span class="balancespan"><b> Rs.${currentUser.balance}<b><span>`;
}
function showbalanceselected()
{
    let previousmenu=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".selectedpage")as HTMLDivElement);
    let presentpage=(document.getElementById("showbalancepage")as HTMLDivElement);
    let presentmenu=(document.getElementById("showbalance")as HTMLUListElement);
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    let Balance=(document.getElementById("Balance")as HTMLHeadingElement);
    Balance.innerHTML=`Your account balance is <strong> Rs.${currentUser.balance}<strong>`;
}
function recharge()
{
    let balance=(document.getElementById("balancemessage")as HTMLLabelElement);
    balance.innerHTML=`Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
    let adding=(document.getElementById("amount")as HTMLInputElement);
    if(Number(adding.value)>0)
    {
        currentUser.balance+=Number(adding.value);
        adding.value="";
        balance.innerHTML=`Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
        UpdateUsers(currentUser.userID,currentUser);
        alert("Recharge Successful");

    }
    else
    {
        adding.value="";
        alert("Enter a valid amount");
    }
}

async function productDetails()
{
    let producttable=(document.getElementById("producttable")as HTMLTableElement);
    let productList=await FetchProducts();
    if(productList.length>0)
    {
        producttable.innerHTML=`<tr><th>Product Name</th><th>Available Quantity</th><th>Purchase Date</th><th>Expiry Date</th><th>Price</th><th>Image</th><th>Action</th></tr>`;
        productList.forEach((product)=>
        {
            producttable.innerHTML+=`<tr>
                            <td>${product.productName}</td>
                            <td>${product.quantity}</td>
                            <td>${product.purchaseDate.split('T')[0].split('-').reverse().join('/')}</td>
                            <td>${product.expiryDate.split('T')[0].split('-').reverse().join('/')}</td>
                            <td>${product.price}</td>
                            <td><img id="productimg" class="productimg" src="${product.image}"></td>
                            <td><button id="edit" class="edit" onclick="Edit('${product.productID}')">Edit</button></td>
                            <td><button id="delete" class="delete" onclick="Delete('${product.productID}')">Delete</button></td>
                            </tr>`
        })
    }
    else
    {
        alert("No stocks in the inventry");
    }
}

function addProductForm()
{
    let product=document.getElementById("table")as HTMLDivElement;
    let productform=document.getElementById("productform")as HTMLDivElement;
    product.classList.add("notshow");
    productform.classList.remove("notshow");
}

function cancelAddproduct()
{
    let productname=(document.getElementById("productname")as HTMLInputElement);
    let purchasedate=(document.getElementById("purchasedate")as HTMLInputElement);
    let expirydate=(document.getElementById("expirydate")as HTMLInputElement);
    let productquantity=(document.getElementById("productquantity")as HTMLInputElement);
    let productprice=(document.getElementById("productprice")as HTMLInputElement);
    let productimage:any=(document.getElementById("productupload")as HTMLInputElement);
    let product=document.getElementById("table")as HTMLDivElement;
    let productform=document.getElementById("productform")as HTMLDivElement;
    productform.classList.add("notshow");
    product.classList.remove("notshow");
    productname.value="";
    productquantity.value="";
    productprice.value="";
    productimage.value="";
    purchasedate.value="";
    expirydate.value="";
    editingID=0;
}
let editingID:number=0;
async function confirmAddproduct()
{
    let productname=(document.getElementById("productname")as HTMLInputElement);
    let purchasedate=(document.getElementById("purchasedate")as HTMLInputElement);
    let expirydate=(document.getElementById("expirydate")as HTMLInputElement);
    let productquantity=(document.getElementById("productquantity")as HTMLInputElement);
    let productprice=(document.getElementById("productprice")as HTMLInputElement);
    let productimage:any=(document.getElementById("productupload")as HTMLInputElement);
    if(editingID==0)
    {
        let imagedata=await ConvertToBase64(productimage.files?.[0]);
        const product:productDetails={
            productID:undefined,
            expiryDate:expirydate.value,
            purchaseDate:purchasedate.value,
            productName:productname.value,
            price:Number(productprice.value),
            quantity:Number(productquantity.value),
            image:[imagedata]
        };
        AddProducts(product);
        alert("Product Added successfully");
    }
    else
    {
        let imagedata=await ConvertToBase64(productimage.files?.[0]);
        console.log(imagedata);
        const product:productDetails={
            productID:editingID,
            expiryDate:expirydate.value,
            purchaseDate:purchasedate.value,
            productName:productname.value,
            price:Number(productprice.value),
            quantity:Number(productquantity.value),
            image:[imagedata]
        };
        UpdateProducts(editingID,product);
        alert("product updated successfully");
    }
    cancelAddproduct();
}
async function Edit(id:number)
{
    let productname=(document.getElementById("productname")as HTMLInputElement);
    let purchasedate=(document.getElementById("purchasedate")as HTMLInputElement);
    let expirydate=(document.getElementById("expirydate")as HTMLInputElement);
    let productquantity=(document.getElementById("productquantity")as HTMLInputElement);
    let productprice=(document.getElementById("productprice")as HTMLInputElement);
    let productimage:any=(document.getElementById("productupload")as HTMLInputElement);
    let productList=await FetchProducts();
    editingID=id;
    productList.forEach((product)=>
    {
        if(product.productID==id)
            {
                productname.value=product.productName;
                productquantity.value=product.quantity.toString();
                productprice.value=product.price.toString();
                purchasedate.value=product.purchaseDate.split('T')[0];
                expirydate.value=product.expiryDate.split('T')[0];
                
            }
    })
    addProductForm();
}

async function Delete(id:number) {
    DeleteProduct(id);
    alert("Product deleted successfully");
}

async function purchaseview()
{
    let purchasepage=(document.getElementById("purchasepage")as HTMLDivElement);
    let productList=await FetchProducts();
    purchasepage.innerHTML="";
    if(productList.length>0)
    {
        productList.forEach((product)=>
        {
            let date=product.expiryDate.split('T')[0].split('-');
            let expiryDate=new Date(Number(date[0]),Number(date[1])-1,Number(date[2]));
            if(expiryDate>new Date())
                {

                    purchasepage.innerHTML+=`<div class="cart">
                                                <img src="${product.image}" class="cartimg" id="cartimg">
                                                <p>${product.productName}</p>
                                                <p>Rs.${product.price}</p>
                                                <button onclick="Addtocart('${product.productID}')" class="addcart add" >Add</button>
                                            </div>`
                }


        })
    }
    else
    {
        purchasepage.innerHTML=`<h2>No Products to display</h2>`;
    }
}

let tempCartList:tempItemDetails[]=[];

async function Addtocart(id:number)
{
    let productList=await FetchProducts();
    let added:boolean=false;
    
    tempCartList.forEach((item)=>
        {
            if(item.productID==id)
            {
                added=true;
            
                return;
            }
        })
    productList.forEach((product)=>
    {
       
        if(product.productID==id&&!added)
        {
            const item:tempItemDetails={
                productID:product.productID,
                userID:currentUser.userID,
                itemName:product.productName,
                quantity:1,
                price:product.price
            }
            
            tempCartList.push(item);
            return;
        }
        else if(product.productID==id)
        {
            tempCartList.forEach((item)=>
                {
                    if(item.productID==id)
                    {
                        added=true;
                        item.quantity+=1;
                        item.price+=product.price;
                        return;
                    }
                })
            return;
        }
    })
    alert("Item added to cart");
    
}

function cartdetails()
{
    let item=(document.getElementById("cartinitiate")as HTMLDivElement);
    let cartable=(document.getElementById("carttable")as HTMLTableElement);
    cartable.innerHTML=`
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Product Price</th>
                            <th>Action</th>
                        </tr>`
    tempCartList.forEach((item)=>
    {
        cartable.innerHTML+=`<tr>
                                <td>${item.itemName}</td>
                                <td>${item.quantity}</td>
                                <td>${item.price}</td>
                                <td><button onclick="Deletecartitem('${item.itemName}')" class="delete" id="delete">Delete</button></td>
                            </tr>`;
    })
}
function Deletecartitem(itemname:string)
{
    for(let i=0;i<tempCartList.length;i++)
    {
        if(tempCartList[i].itemName==itemname)
        {
            tempCartList.splice(i,1);
        }
    }
    cartdetails();
}
async function Buy()
{
    let Price:number=0;
    let ConfirmPurchase:boolean=true;
    if (tempCartList.length==0)
    {
        alert("No items added to cart to purchase");
        return;
    }
   
        for(let i=0;i<tempCartList.length;i++)
        {
           let productList=await FetchProducts();
           productList.forEach((product)=>
        {
            if(product.productID==tempCartList[i].productID)
                {
                    Price+=tempCartList[i].price;
                    let results;
                if(product.quantity<tempCartList[i].quantity||product.quantity==0)
                    {
                    results=window.confirm(`Required quantity is not available confirm to proceed order without the Product${product.productName}`);
                    if(results&&product.quantity<=tempCartList[i].quantity)
                    {
                        Price-=tempCartList[i].price;
                        tempCartList.splice(i,1);
                        cartdetails();
                        i--;
                        ConfirmPurchase=true;
                    }
                    else
                    {
                        alert("purchase cancelled");
                        ConfirmPurchase=false;
                        return;
                    }
                }
                
               
            }
        }) 
        }
        if(currentUser.balance>=Price&&ConfirmPurchase==true)
        {
            currentUser.balance-=Price;
            let order:orderDetails={
                orderID:undefined,
                userID:currentUser.userID,
                totalPrice:Price
            };
            AddOrders(order);
            UpdateUsers(currentUser.userID,currentUser);
            alert("Order placed successfull");
            addcartglobal();
        }
        else if(currentUser.balance<Price)
        {
            alert("Insufficient balance. Please recharge and continue");
        }
        
    
}
async function addcartglobal()
{
    let orderList=await FetchOrders();
    let productList=await FetchProducts();
    let ID=orderList[orderList.length-1].orderID;
    tempCartList.forEach((item)=>
    {
        
        const item1:itemDetails={
            itemID:undefined,
            orderID:ID,
            userID:currentUser.userID,
            productID:item.productID,
            itemName:item.itemName,
            quantity:item.quantity,
            price:item.price
        }
        AddItems(item1);
        productList.forEach(product=>
            {
                if(product.productID==item.productID)
                {
                    product.quantity-=item.quantity;
                    UpdateProducts(product.productID,product);
                    return;
                }
            }
        )
    })
    tempCartList=[];
}
async function orderhistory()
{
    let historypage=(document.getElementById("historypage")as HTMLDivElement);
    let orderList=await FetchOrders();
    historypage.innerHTML="";
    orderList.forEach((order)=>
    {
        if(order.userID==currentUser.userID)
        {
            historypage.innerHTML+=`<div class="historytable" class="history">
            <button class="add" onclick="DownloadCSV('${order.orderID}')">Export</button>
                                    <p>OrderID: ${order.orderID}</p>
                                    <p>Name:${currentUser.userName}</p>
                                    <p>Total Price:${order.totalPrice}</p>
                                    <table  id="${order.orderID}">
                                    <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    </tr>
                                    </table>
                                    </div>`;
            generatingcarttable(order.orderID);
        }
    })
}
async function  generatingcarttable(id:number) {
    let itemList=await FetchItems();
    let content=(document.getElementById(`${id}`)as HTMLTableElement);
    
    itemList.forEach((item)=>
    {
        if(item.orderID==id)
        {
            content.innerHTML+=`<tr>
            <td>${item.itemName}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            </tr>`;
        }
    });
}
async function  DownloadCSV(id:number) {
    let itemList=await FetchItems();
    let data:string="Item Name,Quantity,Price\n";
    itemList.forEach((item)=>
    {
        if(item.orderID==id)
        {
            data+=`${item.itemName},${item.quantity},${item.price}\n`;
        }
    })
    const blob=new Blob([data],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;
    link.download=`OrderID:${id}.CSV`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
function signoutselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".selectedpage")as HTMLDivElement);
    let homemenu=(document.getElementById("home")as HTMLUListElement);
    // let homepage=(document.getElementById("homepage")as HTMLDivElement);
    let index=(document.getElementById("application")as HTMLDivElement);
    let mainpage=(document.getElementById("mainpage")as HTMLDivElement);
    
    mainpage.classList.add("notshow");
    index.classList.remove("notshow");
    // emailmessage.style.display="none";
    // signinmessage.style.display="none";
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("selectedpage");
    homemenu.classList.add("selectedmenu");
    
}