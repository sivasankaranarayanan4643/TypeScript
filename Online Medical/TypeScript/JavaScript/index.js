"use strict";
let correctPassword = false;
let correctEmail = false;
let correctPhone = false;
let correctConfirmPassword = false;
let correctAmount = false;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let currentUser;
class UserDetails {
    constructor(email, password, phone) {
        this.balance = 0;
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
    constructor(paramMedicineId, email, paramMedicineName, paramMedicineCount, price, orderStatus) {
        OrderIdAutoIncrement++;
        this.Price = price;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.Email = email;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.OrderStatus = orderStatus;
    }
}
let userList = new Array();
userList.push(new UserDetails("sasi@gmail.com", "Sasi@123", "6369765310"));
let MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 12, 2)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 12, 2)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 12, 2)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 12, 2)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2024, 12, 2)));
let orderList = new Array();
orderList.push(new Order("MID11", "sasi@gmail.com", "Paracetomol", 2, 100, OrderStatus.ordered));
orderList.push(new Order("MID12", "sasi@gmail.com", "Colpal", 2, 120, OrderStatus.ordered));
orderList.push(new Order("MID11", "sasi@gmail.com", "Stepsil", 2, 140, OrderStatus.cancelled));
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
    display.classList.add("notshow");
});
olduser.addEventListener("click", function () {
    signuppage.classList.add("notshow");
    newuser.classList.remove("selected");
    olduser.classList.add("selected");
    signinpage.classList.remove("notshow");
    display.classList.add("notshow");
});
function signIn() {
    let mail = document.getElementById("email");
    let pass = document.getElementById("password");
    let message = document.getElementById("signinmessage").style;
    let index = document.getElementById("index").style;
    let mainpage = document.getElementById("mainpage");
    userList.forEach((user) => {
        if (user.email == mail.value && user.password == pass.value) {
            currentUser = user;
            index.display = "none";
            message.display = "none";
            mainpage.classList.remove("notshow");
            mail.value = "";
            pass.value = "";
        }
        else {
            message.display = "block";
        }
    });
}
function signUp() {
    if (correctEmail == true && correctPassword == true && correctConfirmPassword == true && correctPhone == true) {
        let mail = document.getElementById("email1");
        let pass = document.getElementById("password1");
        let mobile = document.getElementById("phone");
        let repass = document.getElementById("confirmpassword");
        let user = new UserDetails(mail.value, pass.value, mobile.value);
        userList.push(user);
        mail.value = "";
        pass.value = "";
        mobile.value = "";
        repass.value = "";
        alert("Registration Successful!");
        signuppage.classList.add("notshow");
        newuser.classList.remove("selected");
        olduser.classList.add("selected");
        signinpage.classList.remove("notshow");
        display.classList.add("notshow");
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
function recharge() {
    let adding = document.getElementById("amount");
    if (correctAmount == true) {
        currentUser.balance += parseInt(adding.value);
        adding.value = "";
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
function signoutselected() {
    mainpage.classList.add("notshow");
    index.display = "block";
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
    showbalancepage.style.display = "flex";
    let Balance = document.getElementById("Balance");
    Balance.innerHTML = `Your account balance is <strong>Rs.${currentUser.balance}<strong>`;
}
let medicinetable = document.getElementById("medicinetable");
function confirmAddMedicine() {
    let medicinetable = document.getElementById("medicinetable");
    let medicine = document.getElementById("medicinename");
    let quantity = document.getElementById("medicinequantity");
    let price = document.getElementById("medicineprice");
    let expiryDate = document.getElementById("expirydate");
    let date = expiryDate.value.split('-');
    if (medicine.value != "" && quantity.value != "" && Number(quantity.value) > 0 && price.value != "" && Number(price.value) > 0 && expiryDate.value != "") {
        if (edit == false) {
            let vaccine = new MedicineInfo(medicine.value, Number(quantity.value), Number(price.value), new Date(Number(date[0]), Number(date[1]), Number(date[2])));
            MedicineList.push(vaccine);
            alert("Medicine added successfully");
        }
        else {
            MedicineList.forEach((medicine2) => {
                if (medicineEdit == medicine2.MedicineID) {
                    medicine2.MedicineName = medicine.value;
                    medicine2.MedicinePrice = Number(price.value);
                    medicine2.MedicineCount = Number(quantity.value);
                    medicine2.ExpiryDate = new Date(Number(date[0]), Number(date[1]), Number(date[2]));
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
let medicineEdit;
function EditMedicine(id) {
    let medicinename = document.getElementById("medicinename");
    let quantity = document.getElementById("medicinequantity");
    let price = document.getElementById("medicineprice");
    let expiryDate = document.getElementById("expirydate");
    addMedicineForm();
    edit = true;
    MedicineList.forEach((medicine) => {
        if (medicine.MedicineID == id) {
            medicineEdit = medicine.MedicineID;
            medicinename.value = medicine.MedicineName;
            quantity.value = medicine.MedicineCount.toString();
            price.value = medicine.MedicinePrice.toString();
            expiryDate.value = `${medicine.ExpiryDate.getFullYear()}-${medicine.ExpiryDate.getMonth()}-${medicine.ExpiryDate.getDate()}`;
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
    purchasetable.style.display = "block";
    form.style.display = "none";
}
function cancelAddMedicine() {
    let medicine = document.getElementById("table");
    let medicineform = document.getElementById("medicineform");
    medicine.style.display = "block";
    medicineform.style.display = "none";
    let medicinename = document.getElementById("medicinename");
    let quantity = document.getElementById("medicinequantity");
    let price = document.getElementById("medicineprice");
    let expiryDate = document.getElementById("expirydate");
    medicinename.value = "";
    quantity.value = "";
    price.value = "";
    expiryDate.value = "";
    edit = false;
}
function medicinedetails() {
    if (MedicineList.length > 0) {
        let increment = 1;
        medicinetable.innerHTML = "";
        medicinetable.innerHTML += "<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
        MedicineList.forEach((medicine) => {
            medicinetable.innerHTML += `<tr><td>${medicine.MedicineName}</td><td>${medicine.MedicinePrice}</td><td>${medicine.MedicineCount}</td><td>${medicine.ExpiryDate.getDate()}/${medicine.ExpiryDate.getMonth() + 1}/${medicine.ExpiryDate.getFullYear()}</td><td><button id="edit" onclick="EditMedicine('${medicine.MedicineID}')" class="edit pagebtn">Edit</button><button id="delete" onclick="DeleteMedicine('${medicine.MedicineID}')" class="delete pagebtn">Delete</button></td></tr>`;
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
        purchasetable.innerHTML += `<tr><td>${medicine.MedicineName}</td><td>${medicine.MedicinePrice}</td><td>${medicine.MedicineCount}</td><td>${medicine.ExpiryDate.getDate()}/${medicine.ExpiryDate.getMonth() + 1}/${medicine.ExpiryDate.getFullYear()}</td><td><button id="purchase${increment}" onclick="Buy('${medicine.MedicineID}')" class="buy pagebtn">Buy</button></td></tr>`;
        increment++;
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
                if (currentUser.balance >= (quantity * medicine.MedicinePrice)) {
                    currentUser.balance -= quantity * medicine.MedicinePrice;
                    medicine.MedicineCount -= quantity;
                    orderList.push(new Order(medicine.MedicineID, currentUser.email, medicine.MedicineName, quantity, (quantity * medicine.MedicinePrice), OrderStatus.ordered));
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
                alert("Insufficient Quantity");
                CancelPurchase();
            }
        }
    });
    quantityinput.value = "";
}
function CancelOrder(id) {
    let flag = false;
    let isremoved = false;
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
                else {
                    isremoved = true;
                }
            });
            if (isremoved) {
                let date = new Date();
                date.setMonth(date.getMonth() + 12);
                MedicineList.push(new MedicineInfo(order.MedicineName, order.MedicineCount, (order.Price / order.MedicineCount), date));
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