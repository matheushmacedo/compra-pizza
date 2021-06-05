const selector = (elemento) => document.querySelector(elemento);
const selectorAll = (elemento) => document.querySelector(elemento);

pizzaJson.map((item, index) => {
    let pizzaItem = selector('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;


    selector('.pizza-area').append(pizzaItem);
});