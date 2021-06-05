let modalQuantidade = 1;
const selector = (elemento) => document.querySelector(elemento);
const selectorAll = (elemento) => document.querySelectorAll(elemento);

pizzaJson.map((item, index) => {
    let pizzaItem = selector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index); // insere um atributo no html com a chave do item para diferencia-lo

    pizzaItem.querySelector('.pizza-item--img img').src = item.img; // add a imagem do item
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; // add nome do item
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; // add a descrição do item
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.',',')}`; // add o preço do item e fixa em 2 casas decimais após o ponto

    // fica escutando pra ver se houve o click
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); // previne o comportamento padrao do click
        modalQuantidade = 1;

        // CLOSEST -> como estou dentro do elemento "a" eu vou procurar o elemento ".pizza-item" mais prox dele, tanto dentro quanto fora do nó 
        // depois eu uso o GETATTRIBUTE para pegar o conteudo que esta no atributo DATA-KEY do item HTML
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        
        // preencho o modal 
        selector('.pizzaBig img').src = pizzaJson[key].img;
        selector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        selector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.',',')}`;
        
        // retira o selected do item
        selector('.pizzaInfo--size.selected').classList.remove('selected');
        // colocar os tamanhos do item
        selectorAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            // quando chegar no item 2 (GRANDE) insere o SELECTED
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        selector('.pizzaInfo--qt').innerHTML = modalQuantidade;

        selector('.pizzaWindowArea').style.opacity = 0; 
        selector('.pizzaWindowArea').style.display = 'flex'; // faz o item aparecer
        setTimeout(()=>{
            selector('.pizzaWindowArea').style.opacity = 1;
        }, 200); // espera 200 milisegundos para alterar a opacidade de 0 para 1
    });


    selector('.pizza-area').append(pizzaItem);
});