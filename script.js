const selector = (elemento) => document.querySelector(elemento);
const selectorAll = (elemento) => document.querySelector(elemento);

pizzaJson.map((item, index) => {
    let pizzaItem = selector('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img; // add a imagem do item
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; // add nome do item
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; // add a descrição do item
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; // add o preço do item e fixa em 2 casas decimais após o ponto

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Clicou na pizza')
    })


    selector('.pizza-area').append(pizzaItem);
});