// Get element
let body = document.body;
let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let create = document.getElementById('create');
let search = document.getElementById('search');
let searchValue = document.getElementById('searchValue');
let searchType = document.getElementById('searchType');
let noResult = document.getElementById('no_result');
let searchResult = [];
let mode = 'create';
let tmp;
let searchMode = false;

// Reset value of each input to an empty string after each reload
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''; 
    });
});

// Ignore non-numeric characters in number inputs
document.addEventListener('input', (e) => {
    const numberInput = document.querySelectorAll(`[type="number"]`)
    numberInput.forEach(input => {
        input.value = input.value.replace(/[^0-9]/g, '');
    })
});

const closePopup = document.getElementById('closePopup');
const popup = document.getElementById('popup');
const popupTitle = document.querySelector('#popup h3');
const popupMessage = document.querySelector('#popup p');
const overlay = document.getElementById('overlay');

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

// Get total
let getTotal = () => {
    if (price.value != '') {
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML = result;
        document.getElementById('total-parent').style.background = '#07b8e9';
    } else {
        total.innerHTML = '';
        document.getElementById('total-parent').style.background = 'greenyellow';
    }
}

// Create
let productsData;
try {
    productsData = localStorage.product ? JSON.parse(localStorage.product) : [];
} catch (error) {
    productsData = [];
    console.error('Error parsing localStorage data:', error);
}

let idCounter = productsData.length > 0 ? productsData[productsData.length - 1].id + 1 : 0;

create.onclick = () => {
    let id = mode === 'create' ? idCounter++ : productsData[tmp].id;

    let product = {
        id: id,
        title: title.value,
        count: count.value,
        category: category.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
    };

    if (mode === 'create') {
        productsData.push(product);
        localStorage.setItem('product', JSON.stringify(productsData));
    } else {
        productsData[tmp] = product;
        create.innerHTML = 'Create';
        mode = 'create';
    }

    clear();
    showData(productsData);
};

// Clear
function clear(){
    title.value= '';
    count.value= '';
    category.value= '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value= '';
    total.innerHTML= '';
    document.getElementById('total-parent').style.background = 'greenyellow';
};

// Read
let showData = (data) => {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach((el) => {
        tbody.innerHTML += `
        <tr>
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.category}</td>
            <td>${el.count}</td>
            <td>${el.price}</td>
            <td>${el.taxes}</td>
            <td>${el.ads}</td>
            <td>${el.discount}</td>
            <td>${el.total}</td>
            <td><button class="update" onclick="updateData(${el.id})">Update</button></td>
            <td><input type="number" name="delete" placeholder="Count"><button onclick="deleteData(${el.id})" class='del-btn'>Delete</button></td>
        </tr>
        `
    });
    let deleteBtn = document.querySelector('.delete.parent');
    if (data.length > 0) {
        deleteBtn.innerHTML = `
            <div class="search fx fx-cc g">
                    <p class="total-products">Total items: ${productsData.length}</p>
                    <button id="deleteBtn">Delete All</button>
            </div>
        `
    } else deleteBtn.innerHTML = '';
};
showData(productsData)

function getIndex(id, data){
    return data.findIndex(el => el.id === id);
}

// Delete
function deleteData(index){
    let list = searchValue.value !== '' ? searchResult: productsData;
    let inx = getIndex(index, list);
    let del = document.querySelectorAll('[name="delete"]')[inx]
    let element = list[inx]
    let delValue = Number(del.value)
    if (element['count'] === delValue) {
        productsData.splice(inx, 1)
    } else if (element['count'] > delValue && delValue > 0) {
        if (list === searchResult) {
            searchResult[inx]['count'] -= delValue;
        } else productsData[inx]['count'] -= delValue;
    } else {
        let message = delValue > list[inx]['count'] ? `The maximum number that can be entered is ${list[inx]['count']}`: `Your input must be greater than ZERO`;
        popupTitle.innerHTML = 'Wrong Input'
        popupMessage.innerHTML = message;
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }
    localStorage.product = JSON.stringify(productsData);
    showData(list);
};

const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', e => {
    popupTitle.innerHTML = 'Confirm'
    popupMessage.innerHTML = `Are you sure to delete all items`;

    popup.style.display = 'block';
    overlay.style.display = 'block';
    const confirm = document.getElementById('confirmBtn')
    confirm.onclick = () => {
        productsData.splice(0);
        showData(productsData)
        popup.style.display = 'none';
        overlay.style.display = 'none';
        localStorage.product = JSON.stringify(productsData);
    }
})

// Update
function updateData(index) {
    let id = getIndex(index, productsData)
    title.value = productsData[id]['title']
    count.value = productsData[id]['count']
    category.value = productsData[id]['category']
    price.value = productsData[id]['price']
    taxes.value = productsData[id]['taxes']
    ads.value = productsData[id]['ads']
    discount.value = productsData[id]['discount']
    getTotal()
    create.innerHTML = 'Update';
    mode = 'update';
    tmp = id;
    scrollTo({top:0, behavior:'smooth'})
}

let toValue = null; // Initialize it as null initially, to handle the undefined case properly

function searchTypeMode() {
    if (['price', 'taxes', 'ads', 'count'].includes(searchType.value) && !document.getElementById('toValue')) {
        searchValue.type = 'number';
        searchValue.placeholder = 'From ...';
        let input = document.createElement('input'); 
        input.type = 'text';
        input.name = 'search';
        input.id = 'toValue';
        input.placeholder = 'To';
        searchValue.after(input);
        toValue = document.getElementById('toValue');
        // Make sure to add event listener for toValue here if needed
        toValue.addEventListener('keyup', searchAlgo);
    } else {
        searchValue.type = 'text';
        searchValue.placeholder = 'Search';
        if (toValue) {
            toValue.remove();
            toValue = null; // Reset toValue to null when removed
        }
    }
    return true;
};

searchTypeMode()

searchType.addEventListener('click', searchTypeMode)



function searchAlgo () {
    searchResult = [];
    let searchData = productsData;
    let toValue = document.getElementById('toValue');
    
    searchData.forEach(pro => {
        if (['price', 'taxes', 'ads', 'count'].includes(searchType.value)){
            let fromValue = Number(searchValue.value);  // Convert from search input to number
            let toVal = Number(toValue.value) > 0 ? Number(toValue.value) : Infinity;  // Convert to search input to number (if it exists)
            if (Number(pro[searchType.value]) >= fromValue && Number(pro[searchType.value]) <= toVal) {
                searchResult.push(pro);
            }            
        }
        else {
            if (pro[searchType.value] && pro[searchType.value].includes(searchValue.value)) {
                searchResult.push(pro);
            }
        }
    });
    showData(searchResult);
    if (searchValue.value.length > 0 && searchResult.length === 0){
        noResult.innerHTML = `
            <h3>No result is found</h3>
            <i class="fa-solid fa-ban"></i>
        `
    }
    else noResult.innerHTML = '';
}

searchValue.addEventListener('keyup', (event) => {
    if (event.target.value.length === 0) {
        showData(productsData);
    } else {
        searchAlgo();
    }
});

if (toValue) {
    toValue.addEventListener('keyup', (event) => {
        if (event.target.value.length === 0) {
            showData(productsData);
        } else {
            searchAlgo();
        }
    });
}
