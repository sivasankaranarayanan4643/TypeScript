"use strict";
let correctPassword = false;
let correctEmail = false;
let correctPhone = false;
let correctConfirmPassword = false;
let correctAmount = false;
let correctuserName = false;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let currentUser;
class UserDetails {
    constructor(userName, email, password, phone) {
        this.balance = 0;
        this.UserName = userName;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
}
class MedicineInfo {
    constructor(paramMedicineName, paramMedicineCount, paramMedicinePrice, expiryDate) {
        MedicineIdAutoIncrement++;
        this.MedicineID = "MID" + MedicineIdAutoIncrement;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.ExpiryDate = expiryDate;
    }
}
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["ordered"] = "Ordered";
    OrderStatus["cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
;
class Order {
    constructor(paramMedicineId, email, paramMedicineName, paramMedicineCount, price, orderStatus, expiryDate) {
        OrderIdAutoIncrement++;
        this.Price = price;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.Email = email;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.OrderStatus = orderStatus;
        this.ExpiryDate = expiryDate;
    }
}
let userList = new Array();
userList.push(new UserDetails("Sasi", "sasi@gmail.com", "Sasi@123", "6369765310"));
let MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 11, 2)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 11, 2)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 11, 2)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 11, 2)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2023, 11, 2)));
let orderList = new Array();
orderList.push(new Order("MID11", "sasi@gmail.com", "Paracetomol", 2, 100, OrderStatus.ordered, new Date(2024, 12, 2)));
orderList.push(new Order("MID12", "sasi@gmail.com", "Colpal", 2, 120, OrderStatus.ordered, new Date(2024, 12, 2)));
orderList.push(new Order("MID11", "sasi@gmail.com", "Stepsil", 2, 140, OrderStatus.cancelled, new Date(2024, 12, 2)));
let newuser = (document.getElementById("new-user"));
let olduser = document.getElementById("user");
let signinpage = document.getElementById("signinpage");
let signuppage = document.getElementById("signuppage");
let display = document.getElementById("IDpage");
let gonext = document.getElementById("gonext");
newuser.addEventListener("click", function () {
    signuppage.classList.remove("notshow");
    newuser.classList.add("selected");
    olduser.classList.remove("selected");
    signinpage.classList.add("notshow");
    let mail = document.getElementById("email");
    let pass = document.getElementById("password");
    mail.value = "";
    pass.value = "";
    let emailmessage = document.getElementById("emailmessage");
    let signinmessage = document.getElementById("signinmessage");
    emailmessage.style.display = "none";
    signinmessage.style.display = "none";
});
olduser.addEventListener("click", function () {
    signuppage.classList.add("notshow");
    newuser.classList.remove("selected");
    olduser.classList.add("selected");
    signinpage.classList.remove("notshow");
    let name = document.getElementById("username");
    let mail = document.getElementById("email1");
    let pass = document.getElementById("password1");
    let mobile = document.getElementById("phone");
    let repass = document.getElementById("confirmpassword");
    let namemessage = document.getElementById("usernamemessage").style;
    let mailmessage = document.getElementById("email1message").style;
    let passmessage = document.getElementById("password1message").style;
    let mobilemessage = document.getElementById("phonemessage").style;
    let repassmessage = document.getElementById("confirmpasswordmessage").style;
    name.value = "";
    mail.value = "";
    pass.value = "";
    mobile.value = "";
    repass.value = "";
    namemessage.display = "none";
    mailmessage.display = "none";
    passmessage.display = "none";
    repassmessage.display = "none";
    mobilemessage.display = "none";
    correctuserName = false;
    correctPassword = false;
    correctEmail = false;
    correctPhone = false;
    correctConfirmPassword = false;
    correctAmount = false;
});
function signIn() {
    let mail = document.getElementById("email");
    let pass = document.getElementById("password");
    let message = document.getElementById("signinmessage").style;
    let index = document.getElementById("index").style;
    let mainpage = document.getElementById("mainpage");
    let namedisplay = document.getElementById("namedisplay");
    userList.forEach((user) => {
        if (user.email == mail.value && user.password == pass.value) {
            currentUser = user;
            index.display = "none";
            message.display = "none";
            mainpage.classList.remove("notshow");
            mail.value = "";
            pass.value = "";
            let emailmessage = document.getElementById("emailmessage");
            let signinmessage = document.getElementById("signinmessage");
            emailmessage.style.display = "none";
            signinmessage.style.display = "none";
            namedisplay.innerHTML = user.UserName;
            homepage.innerHTML = `<h1>Welcome ${currentUser.UserName}</h1>`;
        }
        else {
            message.display = "block";
        }
    });
}
function signUp() {
    if (correctuserName == true && correctEmail == true && correctPassword == true && correctConfirmPassword == true && correctPhone == true) {
        let name = document.getElementById("username");
        let mail = document.getElementById("email1");
        let pass = document.getElementById("password1");
        let mobile = document.getElementById("phone");
        let repass = document.getElementById("confirmpassword");
        let user = new UserDetails(name.value, mail.value, pass.value, mobile.value);
        userList.push(user);
        name.value = "";
        mail.value = "";
        pass.value = "";
        mobile.value = "";
        repass.value = "";
        correctuserName = false;
        correctPassword = false;
        correctEmail = false;
        correctPhone = false;
        correctConfirmPassword = false;
        correctAmount = false;
        alert("Registration Successful!");
        signuppage.classList.add("notshow");
        newuser.classList.remove("selected");
        olduser.classList.add("selected");
        signinpage.classList.remove("notshow");
        display.classList.add("notshow");
    }
}
function checkusername(name) {
    let username = document.getElementById(name);
    let message = document.getElementById(name + "message");
    let regx = /^[a-zA-Z@]+$/;
    if (regx.test(username.value)) {
        correctuserName = true;
        message.style.display = "none";
    }
    else {
        correctuserName = false;
        message.style.display = "block";
    }
}
function checkmail(usermail) {
    let mail = document.getElementById(usermail).value;
    let label = document.getElementById(usermail + "message");
    let regx = /^([a-z0-9]+)@([a-z]{2,20})\.([a-z]{2,5})(\.[a-z]{2,5})?/;
    if (!regx.test(mail)) {
        correctEmail = false;
        label.innerHTML = "Invalid email";
        label.style.display = "block";
    }
    else {
        correctEmail = true;
        label.style.display = "none";
    }
}
function checkPass(password) {
    let pass = document.getElementById(password).value;
    let label = document.getElementById(password + "message").style;
    let regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    console.log(pass);
    if (regx.test(pass) && pass.length >= 8) {
        correctPassword = true;
        label.display = "none";
    }
    else {
        correctPassword = false;
        label.display = "block";
    }
}
function confirmPass(password) {
    let pass = document.getElementById("password1").value;
    let repass = document.getElementById(password).value;
    let label = document.getElementById(password + "message").style;
    if (pass == repass) {
        correctConfirmPassword = true;
        label.display = "none";
    }
    else {
        correctConfirmPassword = false;
        label.display = "block";
    }
}
function checkPhone(phone) {
    let mobile = document.getElementById(phone).value;
    let label = document.getElementById(phone + "message").style;
    let regx = /^[6-9][0-9]{9}$/;
    if (regx.test(mobile)) {
        correctPhone = true;
        label.display = "none";
    }
    else {
        correctPhone = false;
        label.display = "block";
    }
}
function checkamount(amount) {
    let adding = document.getElementById(amount);
    let message = document.getElementById(amount + "message").style;
    let regx = /^[0-9]+$/;
    if (regx.test(adding.value) && adding.value != "0") {
        message.display = "none";
        correctAmount = true;
    }
    else {
        message.display = "block";
        correctAmount = false;
    }
}
let correctMedicineName = false;
function checkmedicinename(medicine) {
    let medicine1 = document.getElementById(medicine);
    let label = document.getElementById(medicine + "message");
    let regx = /^[a-zA-Z0-9\-]+$/;
    if (regx.test(medicine1.value)) {
        label.style.display = "none";
        correctMedicineName = true;
    }
    else {
        correctMedicineName = false;
        label.style.display = "block";
    }
}
let correctQuantity = false;
let correctPrice = false;
function checkNumber(quantity) {
    let quantityinput = document.getElementById(quantity);
    let label = document.getElementById(quantity + "message");
    if (Number(quantityinput.value) > 0) {
        label.style.display = "none";
        correctQuantity = true;
    }
    else {
        label.style.display = "block";
        correctQuantity = false;
    }
}
function checkPrice(quantity) {
    let quantityinput = document.getElementById(quantity);
    let label = document.getElementById(quantity + "message");
    if (Number(quantityinput.value) > 0) {
        label.style.display = "none";
        correctPrice = true;
    }
    else {
        label.style.display = "block";
        correctPrice = false;
    }
}
let correctDate = false;
function checkdate(date) {
    let date1 = document.getElementById(date);
    let label = document.getElementById(date + "message");
    let datedetails = date1.value.split('-');
    let entereddate = new Date(Number(datedetails[0]), Number(datedetails[1]) - 1, Number(datedetails[2]));
    let currentdate = new Date();
    if (entereddate > currentdate && date1.value != "" && date1.value.length >= 10) {
        label.style.display = "none";
        correctDate = true;
    }
    else {
        label.style.display = "block";
        correctDate = false;
    }
}
function recharge() {
    let balance = document.getElementById("balancemessage");
    balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
    let adding = document.getElementById("amount");
    if (correctAmount == true) {
        currentUser.balance += parseInt(adding.value);
        adding.value = "";
        balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
        alert("Recharge Successful");
    }
    else {
        adding.value = "";
        alert("Enter a valid amount");
    }
}
let mainpage = document.getElementById("mainpage");
let home = document.getElementById("home");
let medicine = document.getElementById("medicine");
let purchase = document.getElementById("purchase");
let cancel = document.getElementById("cancel");
let topup = document.getElementById("topup");
let orderhistory = document.getElementById("orderhistory");
let showbalance = document.getElementById("showbalance");
let homepage = document.getElementById("homepage");
let medicinepage = document.getElementById("medicinepage");
let purchasepage = document.getElementById("purchasepage");
let cancelpage = document.getElementById("cancelpage");
let topuppage = document.getElementById("topuppage");
let orderhistorypage = document.getElementById("orderhistorypage");
let showbalancepage = document.getElementById("showbalancepage");
let signout = document.getElementById("signout");
let index = document.getElementById("index").style;
let amountmessage = document.getElementById("amountmessage");
function signoutselected() {
    mainpage.classList.add("notshow");
    index.display = "block";
    home.classList.add("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "flex";
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
}
function homeselected() {
    home.classList.add("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "flex";
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
}
function medicineselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.add("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    medicinepage.style.display = "flex";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    medicinedetails();
}
function purchaseselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.add("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    medicinepage.style.display = "none";
    purchasepage.style.display = "flex";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    purchasedetails();
}
function cancelselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.add("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "flex";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    cancelDetails();
}
function topupselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.add("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "flex";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    let adding = document.getElementById("amount");
    adding.value = "";
    let balance = document.getElementById("balancemessage");
    balance.innerHTML = `Your current balance is <span class="balancespan"><b> Rs.${currentUser.balance}<b><span>`;
}
function orderhistoryselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.add("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "flex";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    historydetails();
}
function showbalanceselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.add("selectedmenu");
    homepage.style.display = "none";
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    amountmessage.style.display = "none";
    showbalancepage.style.display = "flex";
    let Balance = document.getElementById("Balance");
    Balance.innerHTML = `Your account balance is <strong> Rs.${currentUser.balance}<strong>`;
}
let medicinetable = document.getElementById("medicinetable");
function confirmAddMedicine() {
    let medicinetable = document.getElementById("medicinetable");
    let medicine = document.getElementById("medicinename");
    let quantity = document.getElementById("medicinequantity");
    let price = document.getElementById("medicineprice");
    let expiryDate = document.getElementById("expirydate");
    let date = expiryDate.value.split('-');
    if (correctMedicineName == true && correctQuantity == true && correctPrice == true && correctDate == true) {
        if (edit == false) {
            let vaccine = new MedicineInfo(medicine.value, Number(quantity.value), Number(price.value), new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2])));
            MedicineList.push(vaccine);
            alert("Medicine added successfully");
        }
        else {
            MedicineList.forEach((medicine2) => {
                if (storemedicine == medicine2.MedicineID) {
                    medicine2.MedicineName = medicine.value;
                    medicine2.MedicinePrice = Number(price.value);
                    medicine2.MedicineCount = Number(quantity.value);
                    medicine2.ExpiryDate = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
                    alert("Medicine updated successfully");
                    edit = false;
                }
            });
        }
        medicinedetails();
        cancelAddMedicine();
    }
    else {
        alert("Please fill out all fields correctly");
    }
}
let edit = false;
let storemedicine;
function EditMedicine(id) {
    let medicinename = document.getElementById("medicinename");
    let quantity = document.getElementById("medicinequantity");
    let price = document.getElementById("medicineprice");
    let expiryDate = document.getElementById("expirydate");
    addMedicineForm();
    correctMedicineName = true;
    correctQuantity = true;
    correctPrice = true;
    correctDate = true;
    edit = true;
    MedicineList.forEach((medicine) => {
        if (medicine.MedicineID == id) {
            medicinename.value = medicine.MedicineName;
            quantity.value = medicine.MedicineCount.toString();
            price.value = medicine.MedicinePrice.toString();
            let date = new Date(medicine.ExpiryDate.getFullYear(), medicine.ExpiryDate.getMonth(), medicine.ExpiryDate.getDate() + 1).toISOString();
            expiryDate.value = (date.split('T'))[0];
            storemedicine = id;
        }
    });
}
function DeleteMedicine(id) {
    for (let i = 0; i < MedicineList.length; i++) {
        if (MedicineList[i].MedicineID == id) {
            MedicineList.splice(i, 1);
            break;
        }
    }
    medicinedetails();
    alert("Medicine Deleted successfully");
}
function addMedicineForm() {
    let medicine = document.getElementById("table");
    let medicineform = document.getElementById("medicineform");
    medicine.style.display = "none";
    medicineform.style.display = "block";
}
function CancelPurchase() {
    let form = document.getElementById("quantityform");
    let purchasetable = document.getElementById("handlepurchase");
    let quantityinput = document.getElementById("purchasequantity");
    quantityinput.value = "";
    purchasetable.style.display = "block";
    form.style.display = "none";
}
function cancelAddMedicine() {
    let medicine = document.getElementById("table");
    let medicineform = document.getElementById("medicineform");
    medicine.style.display = "flex";
    medicineform.style.display = "none";
    let medicinename = document.getElementById("medicinename");
    let quantity = document.getElementById("medicinequantity");
    let price = document.getElementById("medicineprice");
    let expiryDate = document.getElementById("expirydate");
    let medicinemessage = document.getElementById("medicinenamemessage").style;
    let quantitymessage = document.getElementById("medicinequantitymessage").style;
    let pricemessage = document.getElementById("medicinepricemessage").style;
    let expirymessage = document.getElementById("expirydatemessage").style;
    medicinename.value = "";
    quantity.value = "";
    price.value = "";
    expiryDate.value = "";
    medicinemessage.display = "none";
    quantitymessage.display = "none";
    pricemessage.display = "none";
    expirymessage.display = "none";
    correctMedicineName = false;
    correctQuantity = false;
    correctPrice = false;
    correctDate = false;
    edit = false;
}
function medicinedetails() {
    if (MedicineList.length > 0) {
        let increment = 1;
        medicinetable.innerHTML = "";
        medicinetable.innerHTML += "<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
        MedicineList.forEach((medicine) => {
            medicinetable.innerHTML += `<tr><td>${medicine.MedicineName}</td><td>${medicine.MedicinePrice}</td><td>${medicine.MedicineCount}</td><td>${(medicine.ExpiryDate.getDate()).toString().padStart(2, '0')}/${(medicine.ExpiryDate.getMonth() + 1).toString().padStart(2, '0')}/${medicine.ExpiryDate.getFullYear()}</td><td><button id="edit" onclick="EditMedicine('${medicine.MedicineID}')" class="edit pagebtn">Edit</button><button id="delete" onclick="DeleteMedicine('${medicine.MedicineID}')" class="delete pagebtn">Delete</button></td></tr>`;
            increment++;
        });
    }
}
let purchasetable = document.getElementById("purchasetable");
function purchasedetails() {
    let increment = 1;
    purchasetable.innerHTML = "";
    purchasetable.innerHTML += "<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
    MedicineList.forEach((medicine) => {
        if (medicine.ExpiryDate > new Date()) {
            purchasetable.innerHTML += `<tr><td>${medicine.MedicineName}</td><td>${medicine.MedicinePrice}</td><td>${medicine.MedicineCount}</td><td>${medicine.ExpiryDate.getDate()}/${medicine.ExpiryDate.getMonth() + 1}/${medicine.ExpiryDate.getFullYear()}</td><td><button id="purchase${increment}" onclick="Buy('${medicine.MedicineID}')" class="buy pagebtn">Buy</button></td></tr>`;
            increment++;
        }
    });
}
let purchasemedicine;
function Buy(id) {
    let form = document.getElementById("quantityform");
    let purchasetable = document.getElementById("handlepurchase");
    purchasetable.style.display = "none";
    form.style.display = "block";
    purchasemedicine = id;
}
function ConfirmPurchase() {
    let quantityinput = document.getElementById("purchasequantity");
    let quantity = Number(quantityinput.value);
    MedicineList.forEach((medicine) => {
        if (medicine.MedicineID == purchasemedicine) {
            if (quantity <= medicine.MedicineCount) {
                if (medicine.ExpiryDate >= new Date()) {
                    if (currentUser.balance >= (quantity * medicine.MedicinePrice)) {
                        currentUser.balance -= quantity * medicine.MedicinePrice;
                        medicine.MedicineCount -= quantity;
                        orderList.push(new Order(medicine.MedicineID, currentUser.email, medicine.MedicineName, quantity, (quantity * medicine.MedicinePrice), OrderStatus.ordered, medicine.ExpiryDate));
                        alert("Purchase Successful");
                        purchasedetails();
                        CancelPurchase();
                    }
                    else {
                        alert("Insufficient Balance. Please Recharge and continue");
                        CancelPurchase();
                    }
                }
                else {
                    alert("Sorry! choosen medicine expired");
                    CancelPurchase();
                }
            }
            else {
                alert("Insufficient Quantity");
                CancelPurchase();
            }
        }
    });
    quantityinput.value = "";
}
function CancelOrder(id) {
    let flag = false;
    let isremoved = true;
    orderList.forEach((order) => {
        if (order.OrderId == id && flag == false) {
            order.OrderStatus = OrderStatus.cancelled;
            currentUser.balance += order.Price;
            MedicineList.forEach((medicine) => {
                if (medicine.MedicineID == order.MedicineId) {
                    medicine.MedicineCount += order.MedicineCount;
                    isremoved = false;
                    return;
                }
            });
            if (isremoved) {
                MedicineList.push(new MedicineInfo(order.MedicineName, order.MedicineCount, (order.Price / order.MedicineCount), new Date(order.ExpiryDate.getFullYear(), order.ExpiryDate.getMonth() - 1, order.ExpiryDate.getDate())));
            }
            cancelDetails();
            alert("Cancelled Successfully");
        }
    });
}
function cancelDetails() {
    let canceltable = document.getElementById("canceltable");
    canceltable.innerHTML = "";
    if (orderList.length > 0) {
        canceltable.innerHTML += `<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
        orderList.forEach(order => {
            if (order.Email == currentUser.email && order.OrderStatus == OrderStatus.ordered) {
                canceltable.innerHTML += `<tr><td>${order.MedicineName}</td><td>${order.MedicineCount}</td><td>${order.Price}</td><td><button id="cancel" class="delete cancel pagebtn" onclick="CancelOrder('${order.OrderId}')">Cancel</button></td></tr>`;
            }
        });
    }
    else {
        let history = document.getElementById("historyinitiate");
        history.innerHTML = "<h3>No records found</h3>";
    }
}
function historydetails() {
    let historytable = document.getElementById("historytable");
    historytable.innerHTML = "";
    if (orderList.length > 0) {
        historytable.innerHTML += `<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
        orderList.forEach(order => {
            if (order.Email == currentUser.email) {
                historytable.innerHTML += `<tr><td>${order.MedicineName}</td><td>${order.MedicineCount}</td><td>${order.Price}</td><td>${order.OrderStatus}</td></tr>`;
            }
        });
    }
    else {
        let history = document.getElementById("historyinitiate");
        history.innerHTML = "<h3>No records found</h3>";
    }
}
//# sourceMappingURL=index.js.map