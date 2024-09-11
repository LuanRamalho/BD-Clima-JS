let cidades = [];

// Função para calcular a média das estações
function calcularMedia(verao, outono, inverno, primavera) {
    return ((verao + outono + inverno + primavera) / 4).toFixed(2);
}

// Salvando os dados no localStorage
document.getElementById('cityForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    let cidade = document.getElementById('cidade').value;
    let pais = document.getElementById('pais').value;
    let continente = document.getElementById('continente').value;
    let verao = parseFloat(document.getElementById('verao').value);
    let outono = parseFloat(document.getElementById('outono').value);
    let inverno = parseFloat(document.getElementById('inverno').value);
    let primavera = parseFloat(document.getElementById('primavera').value);

    let media = calcularMedia(verao, outono, inverno, primavera);

    let novaCidade = {
        cidade, pais, continente,
        verao, outono, inverno, primavera,
        media
    };

    cidades.push(novaCidade);
    localStorage.setItem('cidades', JSON.stringify(cidades));

    alert('Cidade adicionada com sucesso!');
    document.getElementById('cityForm').reset();
    displayData(cidades);
});

// Função para carregar e exibir os dados salvos
window.onload = function () {
    if (localStorage.getItem('cidades')) {
        cidades = JSON.parse(localStorage.getItem('cidades'));
        displayData(cidades);
    }
};

// Exibir os dados na tabela
function displayData(data) {
    let tbody = document.querySelector('#resultTable tbody');
    tbody.innerHTML = '';

    data.forEach((cidade, index) => {
        let row = `
            <tr id="row-${index}">
                <td contenteditable="false">${cidade.cidade}</td>
                <td contenteditable="false">${cidade.pais}</td>
                <td contenteditable="false">${cidade.continente}</td>
                <td contenteditable="false">${cidade.verao}°C</td>
                <td contenteditable="false">${cidade.outono}°C</td>
                <td contenteditable="false">${cidade.inverno}°C</td>
                <td contenteditable="false">${cidade.primavera}°C</td>
                <td>${cidade.media}°C</td>
                <td>
                    <button onclick="editarDados(${index})">Editar</button>
                    <button onclick="salvarEdicao(${index})" style="display: none;">Salvar</button>
                    <button onclick="excluirDados(${index})">Excluir</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Função para habilitar a edição
function editarDados(index) {
    let row = document.getElementById(`row-${index}`);
    let cells = row.querySelectorAll('td');

    // Tornar as células editáveis (exceto a média)
    for (let i = 0; i < cells.length - 2; i++) {
        cells[i].setAttribute('contenteditable', 'true');
    }

    // Mostrar o botão de salvar
    let editButton = row.querySelector('button[onclick^="editarDados"]');
    let saveButton = row.querySelector('button[onclick^="salvarEdicao"]');
    editButton.style.display = 'none';
    saveButton.style.display = 'inline';
}

// Função para salvar a edição
function salvarEdicao(index) {
    let row = document.getElementById(`row-${index}`);
    let cells = row.querySelectorAll('td');

    // Coletar os novos valores
    let cidade = cells[0].textContent.trim();
    let pais = cells[1].textContent.trim();
    let continente = cells[2].textContent.trim();
    let verao = parseFloat(cells[3].textContent);
    let outono = parseFloat(cells[4].textContent);
    let inverno = parseFloat(cells[5].textContent);
    let primavera = parseFloat(cells[6].textContent);

    let media = calcularMedia(verao, outono, inverno, primavera);

    // Atualizar os dados no array
    cidades[index] = {
        cidade, pais, continente,
        verao, outono, inverno, primavera,
        media
    };

    // Salvar no localStorage
    localStorage.setItem('cidades', JSON.stringify(cidades));

    // Atualizar a exibição da tabela
    displayData(cidades);

    alert('Dados atualizados com sucesso!');
}

// Função para excluir dados
function excluirDados(index) {
    cidades.splice(index, 1);
    localStorage.setItem('cidades', JSON.stringify(cidades));
    displayData(cidades);
}

// Função de busca
function searchData() {
    let search = document.getElementById('search').value.toLowerCase();

    // Filtro pelos atributos: cidade, país ou continente
    let filteredData = cidades.filter(cidade => 
        cidade.cidade.toLowerCase().includes(search) || 
        cidade.pais.toLowerCase().includes(search) || 
        cidade.continente.toLowerCase().includes(search)
    );

    displayData(filteredData);
}


// Funções para ordenar dados
function sortData(order) {
    if (order === 'asc') {
        cidades.sort((a, b) => a.cidade.localeCompare(b.cidade));
    } else {
        cidades.sort((a, b) => b.cidade.localeCompare(a.cidade));
    }
    displayData(cidades);
}
