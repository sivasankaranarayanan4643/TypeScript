let correctPassword=false;
let correctEmail=false;
let correctPhone=false;
let correctConfirmPassword=false;
let correctAmount=false;

let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;



let currentUser: UserDetails;

class UserDetails
{
    email:string;
    password: string;
    phone:string;
    balance: number=0;
    
    constructor(email:string,password:string,phone:string)
    {
        this.email=email;
        this.password=password;
        this.phone=phone;
    }
}

class MedicineInfo {

    MedicineID:string;
    MedicineName: string;
    MedicineCount: number;
    MedicinePrice: number;
    ExpiryDate: Date;

    constructor(paramMedicineName: string, paramMedicineCount: number, paramMedicinePrice: number, expiryDate:Date) {
        
        MedicineIdAutoIncrement++;
        this.MedicineID="MID"+MedicineIdAutoIncrement;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.ExpiryDate=expiryDate;
    }

}

enum OrderStatus{ordered="Ordered",cancelled="Cancelled"};
class Order {
    OrderId: string;
    MedicineId: string;
    Email: string;
    MedicineName: string;
    MedicineCount: number;
    Price:number;
    OrderStatus:OrderStatus;

    constructor(paramMedicineId: string, email: string, paramMedicineName: string, paramMedicineCount: number,price:number ,orderStatus:OrderStatus) {
        OrderIdAutoIncrement++;
        this.Price=price;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.Email = email;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.OrderStatus=orderStatus;
    }
}

let userList: Array<UserDetails> =new Array<UserDetails>();

userList.push(new UserDetails("sasi@gmail.com","Sasi@123","6369765310"));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50,new Date(2024,12,2)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60,new Date(2024,12,2)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70,new Date(2024,12,2)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80,new Date(2024,12,2)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100,new Date(2024,12,2)));


let orderList:Array<Order>=new Array<Order>();
orderList.push(new Order("MID11","sasi@gmail.com","Paracetomol",2,100,OrderStatus.ordered));
orderList.push(new Order("MID12","sasi@gmail.com","Colpal",2,120,OrderStatus.ordered));
orderList.push(new Order("MID11","sasi@gmail.com","Stepsil",2,140,OrderStatus.cancelled));


let newuser=(document.getElementById("new-user"))as HTMLButtonElement;
let olduser=document.getElementById("user") as HTMLButtonElement;
let signinpage=document.getElementById("signinpage") as HTMLDivElement;
let signuppage=document.getElementById("signuppage") as HTMLDivElement;
let display=(document.getElementById("IDpage")as HTMLDivElement);
let gonext=(document.getElementById("gonext")as HTMLButtonElement);



newuser.addEventListener("click",function()
{
    signuppage.classList.remove("notshow");
    newuser.classList.add("selected");
    olduser.classList.remove("selected");
    signinpage.classList.add("notshow");
    display.classList.add("notshow");

})

olduser.addEventListener("click",function()
{
    signuppage.classList.add("notshow");
    newuser.classList.remove("selected");
    olduser.classList.add("selected");
    signinpage.classList.remove("notshow");
    display.classList.add("notshow");
})

function signIn()
{
    let mail=(document.getElementById("email")as HTMLInputElement);
    let pass=(document.getElementById("password")as HTMLInputElement);
    let message=(document.getElementById("signinmessage")as HTMLLabelElement).style;
    let index=(document.getElementById("index")as HTMLDivElement).style;
    let mainpage=(document.getElementById("mainpage")as HTMLDivElement);
    userList.forEach((user)=>
    {
        if(user.email==mail.value && user.password==pass.value)
        {
            currentUser=user;
            index.display="none";
            message.display="none";
            mainpage.classList.remove("notshow");
            mail.value="";
            pass.value="";
    

        }
        else
        {
            message.display="block";
        }
            
    })
}


function signUp()
{
    if(correctEmail==true&&correctPassword==true&&correctConfirmPassword==true&&correctPhone==true)
    {
        let mail=(document.getElementById("email1")as HTMLInputElement); 
        let pass=(document.getElementById("password1")as HTMLInputElement);
        let mobile=(document.getElementById("phone")as HTMLInputElement);
        let repass=(document.getElementById("confirmpassword")as HTMLInputElement);

        let user=new UserDetails(mail.value,pass.value,mobile.value);
        userList.push(user);
        mail.value="";
        pass.value="";
        mobile.value="";
        repass.value="";


        alert("Registration Successful!")
        signuppage.classList.add("notshow");
        newuser.classList.remove("selected");
        olduser.classList.add("selected");
        signinpage.classList.remove("notshow");
        display.classList.add("notshow");
        
    }
}


function checkmail(usermail:string)
{
    let mail=(document.getElementById(usermail)as HTMLInputElement).value;
    let label=(document.getElementById(usermail+"message")as HTMLLabelElement);
    let regx=/^([a-z0-9]+)@([a-z]{2,20})\.([a-z]{2,5})(\.[a-z]{2,5})?/;

    if(!regx.test(mail))
    {
        correctEmail=false;
        label.innerHTML="Invalid email";
        label.style.display="block";

    }
    else
    {
        correctEmail=true;
        label.style.display="none";
    }
}

function checkPass(password:string)
{
    let pass=(document.getElementById(password)as HTMLInputElement).value;
    let label=(document.getElementById(password+"message")as HTMLLabelElement).style;
    let regx=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    console.log(pass);
    if(regx.test(pass)&&pass.length>=8)
    {
        correctPassword=true;
        label.display="none";
    }
    else
    {
        correctPassword=false;
        label.display="block";
    }
}

function confirmPass(password: string)
{
    let pass=(document.getElementById("password1")as HTMLInputElement).value;
    let repass=(document.getElementById(password)as HTMLInputElement).value;
    let label=(document.getElementById(password+"message")as HTMLLabelElement).style;
    if(pass==repass)
    {
        correctConfirmPassword=true;
        label.display="none";
    }
    else
    {
        correctConfirmPassword=false;
        label.display="block";
    }
}

function checkPhone(phone :string)
{
    let mobile=(document.getElementById(phone)as HTMLInputElement).value;
    let label=(document.getElementById(phone+"message")as HTMLLabelElement).style;
    let regx=/^[6-9][0-9]{9}$/;
    if(regx.test(mobile))
    {
        correctPhone=true;
        label.display="none";
    }
    else
    {
        correctPhone=false;
        label.display="block";
    }
}
function checkamount(amount:string)
{
    let adding=(document.getElementById(amount)as HTMLInputElement);
    let message=(document.getElementById(amount+"message")as HTMLLabelElement).style;
    let regx=/^[0-9]+$/;
    if(regx.test(adding.value)&& adding.value!="0")
    {
        message.display="none";
        correctAmount=true;
    }
    else
    {
        message.display="block";
        correctAmount=false;
    }
}

function recharge()
{
    let adding=(document.getElementById("amount")as HTMLInputElement);
    if(correctAmount==true)
    {
        currentUser.balance+=parseInt(adding.value);
        adding.value="";
        alert("Recharge Successful");

    }
    else
    {
        adding.value="";
        alert("Enter a valid amount");
    }
}
let mainpage=(document.getElementById("mainpage")as HTMLDivElement);
let home=(document.getElementById("home")as HTMLUListElement);
let medicine=(document.getElementById("medicine")as HTMLUListElement);
let purchase=(document.getElementById("purchase")as HTMLUListElement); 
let cancel=(document.getElementById("cancel")as HTMLUListElement);
let topup=(document.getElementById("topup")as HTMLUListElement);
let orderhistory=(document.getElementById("orderhistory")as HTMLUListElement);
let showbalance=(document.getElementById("showbalance")as HTMLUListElement);
let homepage=(document.getElementById("homepage")as HTMLDivElement);
let medicinepage=(document.getElementById("medicinepage")as HTMLDivElement);
let purchasepage=(document.getElementById("purchasepage")as HTMLDivElement);
let cancelpage=(document.getElementById("cancelpage")as HTMLDivElement);
let topuppage=(document.getElementById("topuppage")as HTMLDivElement);
let orderhistorypage=(document.getElementById("orderhistorypage")as HTMLDivElement);
let showbalancepage=(document.getElementById("showbalancepage")as HTMLDivElement);
let signout=(document.getElementById("signout")as HTMLUListElement);
let index=(document.getElementById("index")as HTMLDivElement).style;
function signoutselected()
{
    mainpage.classList.add("notshow");
    index.display="block";


    
}
function homeselected()
{
    home.classList.add("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="flex";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
}

function medicineselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.add("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="flex";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    medicinedetails();
}

function purchaseselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.add("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="flex";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    purchasedetails();
}

function cancelselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.add("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="flex";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    cancelDetails();
}

function topupselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.add("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="flex";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    let adding=(document.getElementById("amount")as HTMLInputElement);
    adding.value="";
}

function orderhistoryselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.add("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="flex";
    showbalancepage.style.display="none";
    historydetails();
}

function showbalanceselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.add("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="flex";

    let Balance=(document.getElementById("Balance")as HTMLHeadingElement);
    Balance.innerHTML=`Your account balance is <strong>Rs.${currentUser.balance}<strong>`;
    
}
let medicinetable=(document.getElementById("medicinetable") as HTMLTableElement);
function confirmAddMedicine()
{
    let medicinetable=(document.getElementById("medicinetable") as HTMLTableElement);
    let medicine=(document.getElementById("medicinename")as HTMLInputElement);
    let quantity=(document.getElementById("medicinequantity")as HTMLInputElement);
    let price=(document.getElementById("medicineprice")as HTMLInputElement);
    let expiryDate=(document.getElementById("expirydate")as HTMLInputElement);
    let date:string[]=expiryDate.value.split('-');
    if(medicine.value!=""&&quantity.value!=""&&Number(quantity.value)>0&&price.value!=""&&Number(price.value)>0&&expiryDate.value!="")
    {
        if(edit==false)
        {
            let vaccine=new MedicineInfo(medicine.value,Number(quantity.value),Number(price.value),new Date(Number(date[0]),Number(date[1]),Number(date[2])));
            MedicineList.push(vaccine);
            alert("Medicine added successfully")
        }
        else
        {
            MedicineList.forEach((medicine2)=>
            {
                if(medicineEdit==medicine2.MedicineID)
                {
                    medicine2.MedicineName=medicine.value;
                    medicine2.MedicinePrice=Number(price.value);
                    medicine2.MedicineCount=Number(quantity.value);
                    medicine2.ExpiryDate=new Date(Number(date[0]),Number(date[1]),Number(date[2]));
                    alert("Medicine updated successfully");
                    edit=false;
                }
            })
        }
        medicinedetails();
        cancelAddMedicine();
    }
    else
    {
        alert("Please fill out all fields correctly");
    }
}
let edit:boolean=false;
let medicineEdit:string;
function EditMedicine(id:string)
{
    let medicinename=(document.getElementById("medicinename")as HTMLInputElement);
    let quantity=(document.getElementById("medicinequantity")as HTMLInputElement);
    let price=(document.getElementById("medicineprice")as HTMLInputElement);
    let expiryDate=(document.getElementById("expirydate")as HTMLInputElement);
    addMedicineForm();
    edit=true;
    MedicineList.forEach((medicine)=>
    {
        if(medicine.MedicineID==id)
        {
            medicineEdit=medicine.MedicineID;
            medicinename.value=medicine.MedicineName;
            quantity.value=medicine.MedicineCount.toString();
            price.value=medicine.MedicinePrice.toString();
            expiryDate.value=`${medicine.ExpiryDate.getFullYear()}-${medicine.ExpiryDate.getMonth()}-${medicine.ExpiryDate.getDate()}`;
        }
    })
    
}

function DeleteMedicine(id:string)
{
    for(let i=0;i<MedicineList.length;i++)
    {
        if(MedicineList[i].MedicineID==id)
        {
            MedicineList.splice(i,1);
            break;
        }
    }
    medicinedetails();
    alert("Medicine Deleted successfully");
}


function addMedicineForm()
{
    let medicine=document.getElementById("table")as HTMLDivElement;
    let medicineform=document.getElementById("medicineform")as HTMLDivElement;
    medicine.style.display="none";
    medicineform.style.display="block";
    
}
function CancelPurchase()
{
    let form=(document.getElementById("quantityform")as HTMLDivElement);
    let purchasetable=(document.getElementById("handlepurchase")as HTMLDivElement);
    purchasetable.style.display="block";
    form.style.display="none";
}

function cancelAddMedicine()
{
    let medicine=document.getElementById("table")as HTMLDivElement;
    let medicineform=document.getElementById("medicineform")as HTMLDivElement;
    medicine.style.display="block";
    medicineform.style.display="none";
    let medicinename=(document.getElementById("medicinename")as HTMLInputElement);
    let quantity=(document.getElementById("medicinequantity")as HTMLInputElement);
    let price=(document.getElementById("medicineprice")as HTMLInputElement);
    let expiryDate=(document.getElementById("expirydate")as HTMLInputElement);
    medicinename.value="";
    quantity.value="";
    price.value="";
    expiryDate.value="";
    edit=false;
}
function medicinedetails()
{
    if(MedicineList.length>0)
    {
        let increment:number=1;
        medicinetable.innerHTML="";
        medicinetable.innerHTML+="<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
        MedicineList.forEach((medicine)=>
        {
            medicinetable.innerHTML+=`<tr><td>${medicine.MedicineName}</td><td>${medicine.MedicinePrice}</td><td>${medicine.MedicineCount}</td><td>${medicine.ExpiryDate.getDate()}/${medicine.ExpiryDate.getMonth()+1}/${medicine.ExpiryDate.getFullYear()}</td><td><button id="edit" onclick="EditMedicine('${medicine.MedicineID}')" class="edit pagebtn">Edit</button><button id="delete" onclick="DeleteMedicine('${medicine.MedicineID}')" class="delete pagebtn">Delete</button></td></tr>`;
            increment++;
        })
    }

}
// medicinedetails();

let purchasetable=(document.getElementById("purchasetable")as HTMLTableElement);
function purchasedetails()
{
    let increment: number=1;
    purchasetable.innerHTML="";
    purchasetable.innerHTML+="<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
    MedicineList.forEach((medicine)=>
    {
        purchasetable.innerHTML+=`<tr><td>${medicine.MedicineName}</td><td>${medicine.MedicinePrice}</td><td>${medicine.MedicineCount}</td><td>${medicine.ExpiryDate.getDate()}/${medicine.ExpiryDate.getMonth()+1}/${medicine.ExpiryDate.getFullYear()}</td><td><button id="purchase${increment}" onclick="Buy('${medicine.MedicineID}')" class="buy pagebtn">Buy</button></td></tr>`;
        increment++;
    })
}
// purchasedetails();
let purchasemedicine:string;
function Buy(id:string)
{
    let form=(document.getElementById("quantityform")as HTMLDivElement);
    let purchasetable=(document.getElementById("handlepurchase")as HTMLDivElement);
    purchasetable.style.display="none";
    form.style.display="block";
    purchasemedicine=id;
    
}
function ConfirmPurchase()
{
    let quantityinput=(document.getElementById("purchasequantity")as HTMLInputElement);
    let quantity=Number(quantityinput.value);
    MedicineList.forEach((medicine)=>
    {
        if(medicine.MedicineID==purchasemedicine)
        {
            if(quantity<=medicine.MedicineCount)
            {
                if(currentUser.balance>=(quantity*medicine.MedicinePrice))
                {
                    currentUser.balance-=quantity*medicine.MedicinePrice;
                    medicine.MedicineCount-=quantity;
                    orderList.push(new Order(medicine.MedicineID,currentUser.email,medicine.MedicineName,quantity,(quantity*medicine.MedicinePrice),OrderStatus.ordered));
                    alert("Purchase Successful");
                    purchasedetails();
                    CancelPurchase();
                }
                else
                {
                    alert("Insufficient Balance. Please Recharge and continue");
                    CancelPurchase();
                }
            }
            else
            {
                alert("Insufficient Quantity");
                CancelPurchase();
                
            }
        }

    })
    quantityinput.value="";
}
function CancelOrder(id:string)
{
    let flag:boolean=false;
    let isremoved:boolean=false;
    orderList.forEach((order)=>
    {
        if(order.OrderId==id && flag==false)
        {
            order.OrderStatus=OrderStatus.cancelled;
            currentUser.balance+=order.Price;
            MedicineList.forEach((medicine)=>
            {
                if(medicine.MedicineID==order.MedicineId)
                {
                    medicine.MedicineCount+=order.MedicineCount;
                    isremoved=false;
                    return 
                }
                else
                {
                    isremoved=true;
                }
                
            })
            if(isremoved)
            {
                let date =new Date();
                date.setMonth(date.getMonth()+12);
                MedicineList.push(new MedicineInfo(order.MedicineName,order.MedicineCount,(order.Price/order.MedicineCount),date));
            }
            cancelDetails();
            alert("Cancelled Successfully");
        }
    })
}

function cancelDetails()
{
    let canceltable=(document.getElementById("canceltable")as HTMLTableElement);
    canceltable.innerHTML="";
    if(orderList.length>0)
    {

       canceltable.innerHTML+=`<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
        orderList.forEach(order => {
            if(order.Email==currentUser.email && order.OrderStatus==OrderStatus.ordered)
            {
               canceltable.innerHTML+=`<tr><td>${order.MedicineName}</td><td>${order.MedicineCount}</td><td>${order.Price}</td><td><button id="cancel" class="delete cancel pagebtn" onclick="CancelOrder('${order.OrderId}')">Cancel</button></td></tr>`;
            }
        });
       
    }
    else
    {
        let history=(document.getElementById("historyinitiate")as HTMLDivElement);
        history.innerHTML="<h3>No records found</h3>";
    }
}
function historydetails()
{
    let historytable=(document.getElementById("historytable")as HTMLTableElement);
    historytable.innerHTML="";
    if(orderList.length>0)
    {

        historytable.innerHTML+=`<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
        orderList.forEach(order => {
            if(order.Email==currentUser.email)
            {
                historytable.innerHTML+=`<tr><td>${order.MedicineName}</td><td>${order.MedicineCount}</td><td>${order.Price}</td><td>${order.OrderStatus}</td></tr>`;
            }
        });
       
    }
    else
    {
        let history=(document.getElementById("historyinitiate")as HTMLDivElement);
        history.innerHTML="<h3>No records found</h3>";
    }
}

