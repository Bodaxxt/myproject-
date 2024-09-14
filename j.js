let title = document.getElementById('title');
let price = document.getElementById('price');
let texes = document.getElementById('texes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tbody = document.querySelector('tbody'); // Select the tbody of the table
let deleteall = document.getElementById('deleteAll'); // Select the delete all button container

let mode = 'create';
let temp;

// Function to calculate total
function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +texes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'; // Green background for valid total
    } else {
        total.innerHTML = '';
        total.style.background = 'red'; // Red background when total is empty
    }
}

// Initialize data array from localStorage or set as empty array
let datapro = localStorage.product != null ? JSON.parse(localStorage.product) : [];

// On submit, create new product and add to array
submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        texes: texes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };

    if (mode == 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                datapro.push(newPro);
            }
        } else {
            datapro.push(newPro);
        }
    } else {
        datapro[temp] = newPro;
        mode = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    // Save updated data back to localStorage
    localStorage.setItem('product', JSON.stringify(datapro));

    // Clear form data
    cleardata();

    // Refresh the displayed data
    display();
};

// Function to clear input data
function cleardata() {
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = 'red'; // Set total background to red after clearing
}

// Function to display data in the table
function display() {
    gettotal();
    let table = ''; // Variable to store table rows
    for (let i = 0; i < datapro.length; i++) {
        table += `<tr>
            <td>${i + 1}</td> <!-- Add 1 to index to start from 1 -->
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].texes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
    }

    // Inject the table rows into the tbody
    tbody.innerHTML = table;

    // Display or hide the "Delete All" button
    if (datapro.length > 0) {
        deleteall.innerHTML = `<button onclick='deleteAll()'>Delete All (${datapro.length})</button>`;
    } else {
        deleteall.innerHTML = ''; // Hide button when no data
    }
}

// Function to delete a specific product from the list
function deleteData(index) {
    datapro.splice(index, 1); // Remove the product at the given index
    localStorage.setItem('product', JSON.stringify(datapro)); // Update localStorage
    display(); // Refresh the display
}

// Function to delete all products
function deleteAll() {
    localStorage.clear(); // Clear localStorage
    datapro = []; // Clear the data array
    display(); // Refresh the display
}

// Display the data when the page loads
display();

function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    texes.value = datapro[i].texes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mode = 'Update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
}
let searchMood='title';
function getsearch(id){
    let search=document.getElementById('search');
    if (id=='searchtitle') {
        searchMood='title';
        search.placeholder='search by title';
    }else{
        searchMood='category'
        search.placeholder='search by category';
    }

    search.focus()
}

function searchdata(value){
    if (searchMood=='title') {

    }else{
        
    }

}
