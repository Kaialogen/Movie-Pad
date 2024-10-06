function ClearBasket() {
  //Function to clear basket array and refresh page
  localStorage.setItem('basket', '[]');
  window.location.reload();
}

//check if basket is empty
function CheckBasket() {
  if (document.getElementById("total-price").textContent == 0.0) {
    alert("Basket is empty!")
  }
  else {
    window.location.href='/order.html';
  }
}

function RemoveMovie(movieinput, basket, save) {
  const moviename = movieinput.split(".")[0];
  basket.splice(save.indexOf(moviename), 1);
  save.splice(save.indexOf(moviename), 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  localStorage.setItem("save", JSON.stringify(save));
  window.location.reload();
}
  
function AddDays(movieinput, basket, save) {
  const moviename = movieinput.split(".")[0];
  if (basket[save.indexOf(moviename)].rentDays < 30) {
    basket[save.indexOf(moviename)].rentDays += 1;
    localStorage.setItem("basket", JSON.stringify(basket));
    window.location.reload();
  }
  else {
    alert("Sorry you cannot rent a movie longer than 30 days.");
  }
}
  
function SubDays(movieinput){
  const moviename = movieinput.split(".")[0];
  if (basket[save.indexOf(moviename)].rentDays > 1){
    basket[save.indexOf(moviename)].rentDays -= 1;
    localStorage.setItem("basket", JSON.stringify(basket));
    window.location.reload();
  }
  else {
    basket.splice(save.indexOf(moviename), 1);
    save.splice(save.indexOf(moviename), 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("save", JSON.stringify(save));
    window.location.reload();
  }
}

const basketContainer = document.getElementById("basket");
const basket = JSON.parse(localStorage.getItem("basket") ?? "[]");
const save = JSON.parse(localStorage.getItem("save") ?? "[]");


let totalPrice = 0.00;
let itemPrice = 0.00;

basket.forEach((basketItem) => {
  itemPrice = basketItem.price * basketItem.rentDays;
  itemPrice = itemPrice.toFixed(2);
  save.push(basketItem.name);
  index = save.indexOf(basketItem.name);
  basketContainer.insertAdjacentHTML(
    "beforeend",
      `
      <tr>
        <td><a id="${basketItem.name}.rem" onclick="RemoveMovie(this.id, basket, save)" class="red-x">x</a> ${basketItem.name}</td>
        <td><a id="${basketItem.name}.neg" onclick="SubDays(this.id, basket, save)" class="neg">-</a> ${basketItem.rentDays} <a id="${basketItem.name}.add" onclick="AddDays(this.id, basket, save)" class="add">+</a> </td>
        <td>£${itemPrice}</td>
      </tr>
      `
  );
  totalPrice += basketItem.price * basketItem.rentDays;
});
    
totalPrice = totalPrice.toFixed(2);
document.getElementById("total-price").textContent = totalPrice;
