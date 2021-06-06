let modalQuantidade = 1;
let carrinho = [];
let modalKey = 0;
const selector = (elemento) => document.querySelector(elemento);
const selectorAll = (elemento) => document.querySelectorAll(elemento);

// Listagem dos Itens
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

        modalKey = key; // mantem nessa variavel qual é a pizza que estou add
        
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

// função para fechar o Modal
function closeModal() {
    selector('.pizzaWindowArea').style.opacity = 0; 
    
    // espera 500 milisegundos e depois muda o display para none fazendo sumir o modal
    setTimeout(() => {
        selector('.pizzaWindowArea').style.display = 'none'; 
    }, 500);
}

// Chamando a funcao closeModal() e atribuindo um click nas classes de fechar
selectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

selector('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQuantidade > 1) {
        modalQuantidade--;    
        selector('.pizzaInfo--qt').innerHTML = modalQuantidade;
    }

});

selector('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQuantidade++;
    selector('.pizzaInfo--qt').innerHTML = modalQuantidade;
});

selectorAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e) => {
        // retira o selected do item
        selector('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

selector('.pizzaInfo--addButton').addEventListener('click', () => {
    //let tamanhoTexto = selector('.pizzaInfo--size.selected').innerText;
    let tamanho = parseInt(selector('.pizzaInfo--size.selected').getAttribute('data-key'));
       
    // serve para facilitar a pesquisa no array
    let identificador = pizzaJson[modalKey].id+'@'+tamanho; 

    // varre o array carrinho e se encontrar um identificador igual retorna o id que esta no carrinho 
    let chave = carrinho.findIndex((item)=>item.identificador == identificador);

    // quando nao encontra retorna -1
    if(chave > -1) {
        // encontrou entao soma + 1 na quantidade
        carrinho[chave].qt += modalQuantidade;
    } else {
        // nao encontrou entao add normalmente
        carrinho.push({
            identificador,
            id:pizzaJson[modalKey].id,
            size:tamanho,
            qt:modalQuantidade
        });
    }
    atualizarCarrinho();
    closeModal();
});

function atualizarCarrinho () {
    if(carrinho.length > 0) {
        // mostra o carrinho de compras 
        selector('aside').classList.add('show');
        // zera a lista do carrinho sempre que abrir pra carregar novamente
        selector('.cart').innerHTML = '';


        // percorre o array carrinho passando por cada item
        for(let i in carrinho) {
            let pizzaItem = pizzaJson.find((item)=>item.id == carrinho[i].id);
            // clona o HTML .cart--item
            let carrinhoItem = selector('.models .cart--item').cloneNode(true);
            // adiciona o item na tela

            let pizzaSizeName;
            switch(carrinho[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;    
                case 2:
                    pizzaSizeName = 'G';
                break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            carrinhoItem.querySelector('img').src = pizzaItem.img;
            carrinhoItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            carrinhoItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt;

            carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(carrinho[i].qt > 1) {
                    carrinho[i].qt--;
                } else {
                    carrinho.splice(i,1);
                }
                atualizarCarrinho();
            });
            carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                carrinho[i].qt++;
                atualizarCarrinho();
            });


            
            selector('.cart').append(carrinhoItem);
        }
    } else {
        selector('aside').classList.remove('show');
    }
}