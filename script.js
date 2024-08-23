async function submitForm() {
    const sentimentInputs = document.getElementsByClassName('sentiment2');
    const sentimentos = [];
    for (let i = 0; i < sentimentInputs.length; i++) {
        if (sentimentInputs[i].value) {
            sentimentos.push(sentimentInputs[i].value);
        }
    }

    if (sentimentos.length < 1) {
        alert('Por favor, preencha pelo menos um campo de sentimento!');
        return;
    }

    const data = {
        recomendacao: sentimentos
    };

    

    try {
        const response = await fetch('http://localhost:5000/filmes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result); 

        const responseDiv = document.getElementById('resposta');
        if (Array.isArray(result) && result.length > 0) {
            
            const recomendacoes = result.map((line, index) => {
                return `
                    <div>
                        ${line}
                    </div>
                `;
            }).join('');
            responseDiv.innerHTML = recomendacoes;
        } else {
            responseDiv.innerHTML = `<p>Erro: Dados não encontrados </p>`;
        }
        responseDiv.style.display = 'block';
    } catch (error) {
        const responseDiv = document.getElementById('resposta');
        responseDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
        responseDiv.style.display = 'block';
    }

    
}
async function addSentiment() {
    const sentimentDiv = document.getElementById('sentiments');
    const sentimentRow = document.createElement('div');
    sentimentRow.className = 'sentimentos';
    
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'sentiment2 my-1';
    newInput.placeholder = 'Informe um sentimento...';

    const removeButton = document.createElement('button');
    removeButton.className = 'excluir px-2 py-1';
    removeButton.innerText = 'Excluir';
    removeButton.onclick = () => removeSentiment(removeButton);

    sentimentRow.appendChild(newInput);
    sentimentRow.appendChild(removeButton);
    
    sentimentDiv.appendChild(sentimentRow);

    updateRemoveButtons();
}
function removeSentiment(button) {
    const sentimentRow = button.parentElement;
    sentimentRow.remove();
    updateRemoveButtons();
}
function ativa(){
    const div = document.getElementById('sobre')
    const div2 = document.getElementById('formulario1')
    if (div.style.display == "inline-block"){
     div.style.display='none'
     div2.style.display='inline-block'
    } else {
      div.style.display='inline-block'
      div2.style.display='none'
    }
 }