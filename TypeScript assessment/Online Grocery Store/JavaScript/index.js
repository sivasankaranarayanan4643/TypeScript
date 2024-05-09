"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function FetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5182/api/userdetails");
        if (!response.ok) {
            throw new Error("Failed fetching user");
        }
        return yield response.json();
    });
}
function AddUsers(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5182/api/userdetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Failed adding user");
        }
    });
}
function UpdateUsers(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/userdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
    });
}
function FetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/productdetails`);
        if (!response.ok) {
            throw new Error("failed to fetch products");
        }
        return yield response.json();
    });
}
function AddProducts(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5182/api/productdetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error("Failed adding products");
        }
        productDetails();
    });
}
function UpdateProducts(id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/productdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error("Failed to update product");
        }
        productDetails();
    });
}
function DeleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/productdetails/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("Deleting products failed");
        }
        productDetails();
    });
}
function FetchOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5182/api/orderdetails`);
        if (!response.ok) {
            throw new Error("failed to fetch Orders");
        }
        return yield response.json();
    });
}
function AddOrders(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5182/api/orderdetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error("Failed adding Orders");
        }
    });
}
function FetchItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5182/api/itemdetails");
        if (!response.ok) {
            throw new Error("Failed fetching user");
        }
        return yield response.json();
    });
}
function AddItems(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5182/api/itemdetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error("Failed adding Items");
        }
        cartdetails();
    });
}
function ConvertToBase64(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                const buffer = fileReader.result;
                resolve(buffer);
            };
        });
    });
}
let currentUser;
let signinpage = document.getElementById("signinpage");
let signuppage = document.getElementById("signuppage");
function NewUser() {
    let newuser = document.getElementById("new-user");
    let OldUser = document.getElementById("user");
    let useremail = document.getElementById("useremail");
    let userpassword = document.getElementById("userpassword");
    signinpage.classList.add("notshow");
    signuppage.classList.remove("notshow");
    OldUser.classList.remove("selectedoption");
    newuser.classList.add("selectedoption");
    useremail.value = "";
    userpassword.value = "";
}
function OldUser() {
    let newuser = document.getElementById("new-user");
    let OldUser = document.getElementById("user");
    let useremail = document.getElementById("email");
    let userpassword = document.getElementById("password");
    let userconfirmpassword = document.getElementById("confirmpassword");
    let userName = document.getElementById("username");
    let address = document.getElementById("address");
    let balance = document.getElementById("balance");
    let image = document.getElementById("imageupload");
    signuppage.classList.add("notshow");
    signinpage.classList.remove("notshow");
    newuser.classList.remove("selectedoption");
    OldUser.classList.add("selectedoption");
    useremail.value = "";
    userpassword.value = "";
    userconfirmpassword.value = "";
    userName.value = "";
    address.value = "";
    balance.value = "";
    image.value = "";
}
signinpage.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    let userList = yield FetchUsers();
    let exist = false;
    let index = document.getElementById("application");
    let mainpage = document.getElementById("mainpage");
    let useremail = document.getElementById("useremail");
    let userpassword = document.getElementById("userpassword");
    let homepage = document.getElementById("homepage");
    let namedisplay = document.getElementById("nameshow");
    userList.forEach((user) => {
        if (user.email == useremail.value && user.password == userpassword.value) {
            exist = true;
            index.classList.add("notshow");
            mainpage.classList.remove("notshow");
            homepage.innerHTML = `<img src="${user.image}" class="profile" id="profile">Hi ${user.userName}`;
            namedisplay.innerHTML = user.userName;
            currentUser = user;
            homepage.classList.add("selectedpage");
            alert("signin successful");
            return;
        }
    });
    if (!exist) {
        alert("Invalid email or password");
    }
}));
signuppage.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    let newuser = document.getElementById("new-user");
    let OldUser = document.getElementById("user");
    let exist = false;
    let useremail = document.getElementById("email");
    let userpassword = document.getElementById("password");
    let userconfirmpassword = document.getElementById("confirmpassword");
    let userName = document.getElementById("username");
    let address = document.getElementById("address");
    let balance = document.getElementById("balance");
    let image = document.getElementById("imageupload");
    let userList = yield FetchUsers();
    userList.forEach((user) => {
        if (user.email == useremail.value) {
            exist = true;
            return;
        }
    });
    if (!exist) {
        let file = (_a = image.files) === null || _a === void 0 ? void 0 : _a[0];
        let data = yield ConvertToBase64(file);
        const user = {
            userID: undefined,
            userName: userName.value,
            email: useremail.value,
            password: userpassword.value,
            address: address.value,
            balance: Number(balance.value),
            image: [data]
        };
        AddUsers(user);
        alert("Registration successful");
        signuppage.classList.add("notshow");
        signinpage.classList.remove("notshow");
        newuser.classList.remove("selectedoption");
        OldUser.classList.add("selectedoption");
        useremail.value = "";
        userpassword.value = "";
        userconfirmpassword.value = "";
        userName.value = "";
        address.value = "";
        balance.value = "";
        image.value = "";
    }
}));
function homeselected() {
    let previousmenu = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".selectedpage");
    let presentpage = document.getElementById("homepage");
    let presentmenu = document.getElementById("home");
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
}
function productselected() {
    let previousmenu = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".selectedpage");
    let presentpage = document.getElementById("productspage");
    let presentmenu = document.getElementById("products");
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    productDetails();
}
function purchaseselected() {
    let previousmenu = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".selectedpage");
    let presentpage = document.getElementById("purchasepage");
    let presentmenu = document.getElementById("purchase");
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    purchaseview();
}
function cartselected() {
    let previousmenu = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".selectedpage");
    let presentpage = document.getElementById("cartpage");
    let presentmenu = document.getElementById("cart");
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    cartdetails();
}
function historyselected() {
    let previousmenu = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".selectedpage");
    let presentpage = document.getElementById("historypage");
    let presentmenu = document.getElementById("history");
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    orderhistory();
}
function rechargeselected() {
    let previousmenu = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".selectedpage");
    let presentpage = document.getElementById("rechargepage");
    let presentmenu = document.getElementById("recharge");
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    let adding = document.getElementById("amount");
    adding.value = "";
    let balance = document.getElementById("balancemessage");
    balance.innerHTML = `Your current balance is <span class="balancespan"><b> Rs.${currentUser.balance}<b><span>`;
}
function showbalanceselected() {
    let previousmenu = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".selectedpage");
    let presentpage = document.getElementById("showbalancepage");
    let presentmenu = document.getElementById("showbalance");
    previousmenu.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("selectedpage");
    presentpage.classList.add("selectedpage");
    let Balance = document.getElementById("Balance");
    Balance.innerHTML = `Your account balance is <strong> Rs.${currentUser.balance}<strong>`;
}
function recharge() {
    let balance = document.getElementById("balancemessage");
    balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
    let adding = document.getElementById("amount");
    if (Number(adding.value) > 0) {
        currentUser.balance += Number(adding.value);
        adding.value = "";
        balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
        UpdateUsers(currentUser.userID, currentUser);
        alert("Recharge Successful");
    }
    else {
        adding.value = "";
        alert("Enter a valid amount");
    }
}
function productDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let producttable = document.getElementById("producttable");
        let productList = yield FetchProducts();
        if (productList.length > 0) {
            producttable.innerHTML = `<tr><th>Product Name</th><th>Available Quantity</th><th>Purchase Date</th><th>Expiry Date</th><th>Price</th><th>Image</th><th>Action</th></tr>`;
            productList.forEach((product) => {
                producttable.innerHTML += `<tr>
                            <td>${product.productName}</td>
                            <td>${product.quantity}</td>
                            <td>${product.purchaseDate.split('T')[0].split('-').reverse().join('/')}</td>
                            <td>${product.expiryDate.split('T')[0].split('-').reverse().join('/')}</td>
                            <td>${product.price}</td>
                            <td><img id="productimg" class="productimg" src="${product.image}"></td>
                            <td><button id="edit" class="edit" onclick="Edit('${product.productID}')">Edit</button></td>
                            <td><button id="delete" class="delete" onclick="Delete('${product.productID}')">Delete</button></td>
                            </tr>`;
            });
        }
        else {
            alert("No stocks in the inventry");
        }
    });
}
function addProductForm() {
    let product = document.getElementById("table");
    let productform = document.getElementById("productform");
    product.classList.add("notshow");
    productform.classList.remove("notshow");
}
function cancelAddproduct() {
    let productname = document.getElementById("productname");
    let purchasedate = document.getElementById("purchasedate");
    let expirydate = document.getElementById("expirydate");
    let productquantity = document.getElementById("productquantity");
    let productprice = document.getElementById("productprice");
    let productimage = document.getElementById("productupload");
    let product = document.getElementById("table");
    let productform = document.getElementById("productform");
    productform.classList.add("notshow");
    product.classList.remove("notshow");
    productname.value = "";
    productquantity.value = "";
    productprice.value = "";
    productimage.value = "";
    purchasedate.value = "";
    expirydate.value = "";
    editingID = 0;
}
let editingID = 0;
function confirmAddproduct() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let productname = document.getElementById("productname");
        let purchasedate = document.getElementById("purchasedate");
        let expirydate = document.getElementById("expirydate");
        let productquantity = document.getElementById("productquantity");
        let productprice = document.getElementById("productprice");
        let productimage = document.getElementById("productupload");
        if (editingID == 0) {
            let imagedata = yield ConvertToBase64((_a = productimage.files) === null || _a === void 0 ? void 0 : _a[0]);
            const product = {
                productID: undefined,
                expiryDate: expirydate.value,
                purchaseDate: purchasedate.value,
                productName: productname.value,
                price: Number(productprice.value),
                quantity: Number(productquantity.value),
                image: [imagedata]
            };
            AddProducts(product);
            alert("Product Added successfully");
        }
        else {
            let imagedata = yield ConvertToBase64((_b = productimage.files) === null || _b === void 0 ? void 0 : _b[0]);
            console.log(imagedata);
            const product = {
                productID: editingID,
                expiryDate: expirydate.value,
                purchaseDate: purchasedate.value,
                productName: productname.value,
                price: Number(productprice.value),
                quantity: Number(productquantity.value),
                image: [imagedata]
            };
            UpdateProducts(editingID, product);
            alert("product updated successfully");
        }
        cancelAddproduct();
    });
}
function Edit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let productname = document.getElementById("productname");
        let purchasedate = document.getElementById("purchasedate");
        let expirydate = document.getElementById("expirydate");
        let productquantity = document.getElementById("productquantity");
        let productprice = document.getElementById("productprice");
        let productimage = document.getElementById("productupload");
        let productList = yield FetchProducts();
        editingID = id;
        productList.forEach((product) => {
            if (product.productID == id) {
                productname.value = product.productName;
                productquantity.value = product.quantity.toString();
                productprice.value = product.price.toString();
                purchasedate.value = product.purchaseDate.split('T')[0];
                expirydate.value = product.expiryDate.split('T')[0];
            }
        });
        addProductForm();
    });
}
function Delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        DeleteProduct(id);
        alert("Product deleted successfully");
    });
}
function purchaseview() {
    return __awaiter(this, void 0, void 0, function* () {
        let purchasepage = document.getElementById("purchasepage");
        let productList = yield FetchProducts();
        purchasepage.innerHTML = "";
        if (productList.length > 0) {
            productList.forEach((product) => {
                let date = product.expiryDate.split('T')[0].split('-');
                let expiryDate = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
                if (expiryDate > new Date()) {
                    purchasepage.innerHTML += `<div class="cart">
                                                <img src="${product.image}" class="cartimg" id="cartimg">
                                                <p>${product.productName}</p>
                                                <p>Rs.${product.price}</p>
                                                <button onclick="Addtocart('${product.productID}')" class="addcart add" >Add</button>
                                            </div>`;
                }
            });
        }
        else {
            purchasepage.innerHTML = `<h2>No Products to display</h2>`;
        }
    });
}
let tempCartList = [];
function Addtocart(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let productList = yield FetchProducts();
        let added = false;
        tempCartList.forEach((item) => {
            if (item.productID == id) {
                added = true;
                return;
            }
        });
        productList.forEach((product) => {
            if (product.productID == id && !added) {
                const item = {
                    productID: product.productID,
                    userID: currentUser.userID,
                    itemName: product.productName,
                    quantity: 1,
                    price: product.price
                };
                tempCartList.push(item);
                return;
            }
            else if (product.productID == id) {
                tempCartList.forEach((item) => {
                    if (item.productID == id) {
                        added = true;
                        item.quantity += 1;
                        item.price += product.price;
                        return;
                    }
                });
                return;
            }
        });
        alert("Item added to cart");
    });
}
function cartdetails() {
    let item = document.getElementById("cartinitiate");
    let cartable = document.getElementById("carttable");
    cartable.innerHTML = `
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Product Price</th>
                            <th>Action</th>
                        </tr>`;
    tempCartList.forEach((item) => {
        cartable.innerHTML += `<tr>
                                <td>${item.itemName}</td>
                                <td>${item.quantity}</td>
                                <td>${item.price}</td>
                                <td><button onclick="Deletecartitem('${item.itemName}')" class="delete" id="delete">Delete</button></td>
                            </tr>`;
    });
}
function Deletecartitem(itemname) {
    for (let i = 0; i < tempCartList.length; i++) {
        if (tempCartList[i].itemName == itemname) {
            tempCartList.splice(i, 1);
        }
    }
    cartdetails();
}
function Buy() {
    return __awaiter(this, void 0, void 0, function* () {
        let Price = 0;
        let ConfirmPurchase = true;
        if (tempCartList.length == 0) {
            alert("No items added to cart to purchase");
            return;
        }
        for (let i = 0; i < tempCartList.length; i++) {
            let productList = yield FetchProducts();
            productList.forEach((product) => {
                if (product.productID == tempCartList[i].productID) {
                    Price += tempCartList[i].price;
                    let results;
                    if (product.quantity < tempCartList[i].quantity || product.quantity == 0) {
                        results = window.confirm(`Required quantity is not available confirm to proceed order without the Product${product.productName}`);
                        if (results && product.quantity <= tempCartList[i].quantity) {
                            Price -= tempCartList[i].price;
                            tempCartList.splice(i, 1);
                            cartdetails();
                            i--;
                            ConfirmPurchase = true;
                        }
                        else {
                            alert("purchase cancelled");
                            ConfirmPurchase = false;
                            return;
                        }
                    }
                }
            });
        }
        if (currentUser.balance >= Price && ConfirmPurchase == true) {
            currentUser.balance -= Price;
            let order = {
                orderID: undefined,
                userID: currentUser.userID,
                totalPrice: Price
            };
            AddOrders(order);
            UpdateUsers(currentUser.userID, currentUser);
            alert("Order placed successfull");
            addcartglobal();
        }
        else if (currentUser.balance < Price) {
            alert("Insufficient balance. Please recharge and continue");
        }
    });
}
function addcartglobal() {
    return __awaiter(this, void 0, void 0, function* () {
        let orderList = yield FetchOrders();
        let productList = yield FetchProducts();
        let ID = orderList[orderList.length - 1].orderID;
        tempCartList.forEach((item) => {
            const item1 = {
                itemID: undefined,
                orderID: ID,
                userID: currentUser.userID,
                productID: item.productID,
                itemName: item.itemName,
                quantity: item.quantity,
                price: item.price
            };
            AddItems(item1);
            productList.forEach(product => {
                if (product.productID == item.productID) {
                    product.quantity -= item.quantity;
                    UpdateProducts(product.productID, product);
                    return;
                }
            });
        });
        tempCartList = [];
    });
}
function orderhistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let historypage = document.getElementById("historypage");
        let orderList = yield FetchOrders();
        historypage.innerHTML = "";
        orderList.forEach((order) => {
            if (order.userID == currentUser.userID) {
                historypage.innerHTML += `<div class="historytable" class="history">
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
        });
    });
}
function generatingcarttable(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let itemList = yield FetchItems();
        let content = document.getElementById(`${id}`);
        itemList.forEach((item) => {
            if (item.orderID == id) {
                content.innerHTML += `<tr>
            <td>${item.itemName}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            </tr>`;
            }
        });
    });
}
function DownloadCSV(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let itemList = yield FetchItems();
        let data = "Item Name,Quantity,Price\n";
        itemList.forEach((item) => {
            if (item.orderID == id) {
                data += `${item.itemName},${item.quantity},${item.price}\n`;
            }
        });
        const blob = new Blob([data], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `OrderID:${id}.CSV`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}
function signoutselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".selectedpage");
    let homemenu = document.getElementById("home");
    let index = document.getElementById("application");
    let mainpage = document.getElementById("mainpage");
    mainpage.classList.add("notshow");
    index.classList.remove("notshow");
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("selectedpage");
    homemenu.classList.add("selectedmenu");
}
//# sourceMappingURL=index.js.map