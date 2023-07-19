import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {  onAuthStateChanged, getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
import { getFirestore, setDoc, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

let userUID;
const firebaseConfig = {
    apiKey: "AIzaSyBNTzu_5t7gsovjvcvpwhtAPXDR4SZ0rYM",
    authDomain: "billing-system-9.firebaseapp.com",
    projectId: "billing-system-9",
    storageBucket: "billing-system-9.appspot.com",
    messagingSenderId: "604044977763",
    appId: "1:604044977763:web:01a2a2bd9323f77af03a56"
  };

  const firebase = initializeApp(firebaseConfig);

  const auth = getAuth()

  const db = getFirestore(firebase)



  onAuthStateChanged(auth, (user) => {
    if (!user) {
        location.href="./login.html";
    }
    else
    {
        userUID = user.uid.toString();
    }
  });

  
  let logoutbtn = document.getElementById("logoutbtn")


  logoutbtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        location.href="./login.html";
    }).catch((error) => { 
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage+" "+errorCode)
        });
  })


///////////////////////////////////////////////////


let minus = document.getElementById("minus")
let plus = document.getElementById("plus")
let countertext = document.getElementById("countertext")
var counter = 1
let getdata = document.getElementById("getdata")
var billno = document.getElementById("billno")
var date = document.getElementById("date")
var amount = document.getElementById("amount")
let printbtn = document.getElementById("printbtn")
let billsection = document.getElementById("billsection")
var additem = document.getElementById("additem")

let submitBtn = document.getElementById("submitBtn");

// bill no
 billno = Math.floor(1000 + Math.random() * 9000);
 document.getElementById("billno").innerHTML=billno;

 //date
 date = new Date().toString().slice(0,21)
 document.getElementById("date").innerHTML=date;


 document.getElementById("phoneno").addEventListener("keyup",function(){
    // name = document.getElementById("name").value;
    
    document.getElementById("phoneno2").innerHTML=this.value;
});


document.getElementById("name").addEventListener("keyup",function(){
    // name = document.getElementById("name").value;
    document.getElementById("name2").innerHTML=this.value;
});


//increase quantity
plus.addEventListener('click',() => {
    counter++
    countertext.innerText = counter
    console.log(counter)
})

minus.addEventListener('click',() => {
    if(counter > 1)
    {
        counter--
        countertext.innerText = counter 
    }
    else
        alert("Quantity must be greater than 0")
    
})



// bill total amount

let totalBill = 0;
let gst = 0

//table
const table = document.querySelector("table")
const tbody = document.querySelector('tbody')



// get items

// getdata.addEventListener('click',async () => {
//     const querySnapshot = await getDocs(collection(db, "bill", userUID+"/"+"menu"));
//     querySnapshot.forEach((doc) => {
//     itemArray = doc.data().items
//     });

//     item.push(itemArray)
//     console.log(item)
//     var select = document.getElementById("selectItem");
//     let index = 0
//     for(index in itemArray) {
//         select.options[select.options.length] = new Option(itemArray[index], index);
//     }

// })


let itemArray = []
let itemData = []

getdata.addEventListener('click', async () => {
    const querySnapshot = await getDocs(collection(db, "bill", userUID+"/"+"menu"));
    querySnapshot.forEach((doc) => {
    itemArray = doc.data().items
    });

    console.log(itemArray)


    var select = document.getElementById("selectItem");
    let index = 0
    for(index in itemArray) {
        select.options[select.options.length] = new Option(itemArray[index], index);
    }

})



// add new items

let addNewItem = document.getElementById("addNewItem")

addNewItem.addEventListener('click', async () => {

    let newItem = document.getElementById("newItem").value

    itemArray.push(newItem)
    const frankDocRef = doc(db, "bill", userUID+"/"+"menu"+"/"+userUID);
    await setDoc(frankDocRef, {
        items: itemArray
    });

    document.getElementById("newItem").value = ""
})


//select price 
let sItem = document.getElementById("selectItem")
sItem.addEventListener('change', () => {
    var text = sItem.options[sItem.selectedIndex].text;
    console.log(text)

    if(text == "samosa")
    {
        document.getElementById("price").value = 15
    }
    if(text == "pizza")
    {
        document.getElementById("price").value = 120
    }
    if(text == "burger")
    {
        document.getElementById("price").value = 75
    }
    if(text == "vadapav")
    {
        document.getElementById("price").value = 15
    }
    if(text == "dosa")
    {
        document.getElementById("price").value = 50
    }
    if(text == "paratha")
    {
        document.getElementById("price").value = 40
    }
    if(text == "pavbhaji")
    {
        document.getElementById("price").value = 60
    }
    if(text == "dabeli")
    {
        document.getElementById("price").value = 30
    }
    if(text == "kachori")
    {
        document.getElementById("price").value = 15
    }
    if(text == "momos")
    {
        document.getElementById("price").value = 80
    }
    if(text == "pasta")
    {
        document.getElementById("price").value = 60
    }
    
})




//add item
additem.addEventListener('click',() =>{
let item = document.getElementById("selectItem").value 
var select = document.getElementById('selectItem');
var text = select.options[select.selectedIndex].text;
let price = document.getElementById("price").value

    totalBill = totalBill + (price*counter);
    gst = (totalBill * 18)/100
    totalBill += gst


    if(item!= "" && price!= "")
    {
        tbody.innerHTML += `
        <tr class="bg-white border-b">
            <td class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">${text}</td>  
            <td class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">${price}</td> 
            <td class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">${counter}</td> 
            <td class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">${price*counter}</td>  
            <td class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                <button class="deleteBtn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    X
                </button>
            </td> 
        </tr>
    `

    document.getElementById("selectItem").value = ""
    document.getElementById("price").value = ""
    countertext.innerText = 1
    counter = 1
    totalBill =  Math.round(totalBill * 100) / 100
    document.getElementById("amount").innerText = totalBill;
    }

    else{
        alert("Kindly fill details")
    
    }
          
})

//delete items
function onDeleteRow(e) {
    if(!e.target.classList.contains("deleteBtn")) {
        return
    }

    const btn = e.target
    btn.closest("tr").remove()
    console.log('deleted row')

    var table = document.getElementById("table"),
    amount = 0

    for ( var i = 1 ; i< table.rows.length; i++)
    {
        amount = amount + parseInt(table.rows[i].cells[3].innerHTML)
        
    }
  
    gst = (amount * 18)/100
    totalBill = amount + gst
    document.getElementById("amount").innerText = totalBill;
}
table.addEventListener('click', onDeleteRow)


//////////////
printbtn.addEventListener('click', () => {
    var divContents = billsection.innerHTML;
            var a = window.open('', '', 'height=800, width=800');
            a.document.write(divContents);
            a.print();
})




submitBtn.addEventListener('click',() => {
    let name = document.getElementById("name2").innerHTML;
    let phone_no = document.getElementById("phoneno2").innerHTML;
    let bill_no = document.getElementById("billno").innerHTML;
    let date = document.getElementById("date").innerHTML;
    let amount = document.getElementById("amount").innerHTML;

    const namef = document.getElementById("name").value
    const phonenof = document.getElementById("phoneno").value

    if( namef != "" || phonenof != ""){

        setDoc(doc(db, "bill", userUID+"/"+"billDetails", bill_no.toString()), {
        name: name,
        phoneNo: phone_no,
        billNo: bill_no,
        date: date,
        amount: amount
    });

    window.alert("Submitted successfully");
    }
    else{
        alert("Kindly fill details")
    }
    
})








