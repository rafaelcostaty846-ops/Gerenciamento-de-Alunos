const alunos = []; 

function calcularMedia(notas) {
    if (notas.length === 0) return 0;
    return notas.reduce((a, b) => a + b, 0) / notas.length;
}

function adicionar() {
    const nome = prompt("Nome do aluno:");
    if (nome) {
        alunos.push({ nome, notas: [] });
        exibir(`Aluno ${nome} adicionado!`);
    }
}

function listar() {
    if (alunos.length === 0) {
        exibir("Nenhum aluno cadastrado.");
        return;
    }
    let texto = "Lista de alunos:\n";
    alunos.forEach(a => {
        const media = calcularMedia(a.notas);
        const mediaFormatada = !isNaN(media) ? media.toFixed(2) : "N/A";
        texto += `${a.nome} - Notas: [${a.notas.join(", ")}] - Média: ${mediaFormatada}\n`;
    });
    exibir(texto);
}

function registrarNota() {
    const nome = prompt("Nome do aluno:");
    const aluno = alunos.find(a => a.nome === nome);
    if (!aluno) return exibir("Aluno não encontrado.");
    const nota = parseFloat(prompt("Digite a nota:"));
    if (!isNaN(nota)) {
        aluno.notas.push(nota);
        exibir(`Nota ${nota} adicionada para ${nome}.`);
    } else {
        exibir("Valor inválido.");
    }
}

function calcularMediaAluno() {
    const nome = prompt("Nome do aluno:");
    const aluno = alunos.find(a => a.nome === nome);
    if (!aluno) return exibir("Aluno não encontrado.");
    exibir(`Média de ${nome}: ${calcularMedia(aluno.notas).toFixed(2)}`);
}

function mostrarAprovados() {
    let texto = "Alunos aprovados :\n";
    const aprovados = alunos.filter(a => calcularMedia(a.notas) >= 6);
    if (aprovados.length === 0) {
        texto += "Nenhum aluno aprovado ainda.";
    } else {
        aprovados.forEach(a => {
            const media = calcularMedia(a.notas);
            texto += `${a.nome} - Média: ${media.toFixed(2)}\n`;
        });
    }
    exibir(texto);
}

function estatisticas() {
    if (alunos.length === 0) return exibir("Nenhum aluno cadastrado.");
    const medias = alunos.map(a => calcularMedia(a.notas));
    const mediaGeral = calcularMedia(medias);
    const maior = Math.max(...medias);
    const menor = Math.min(...medias);
    
    let texto = `Estatísticas da Turma:\n`;
    texto += `Média geral: ${mediaGeral.toFixed(2)}\n`;
    texto += `Maior média: ${maior.toFixed(2)}\n`;
    texto += `Menor média: ${menor.toFixed(2)}`;
    
    exibir(texto);
}

function ordenar() {
    const ordenados = [...alunos].sort((a, b) => calcularMedia(b.notas) - calcularMedia(a.notas));
    let texto = "Alunos ordenados por média:\n";
    ordenados.forEach(a => {
        texto += `${a.nome} - Média: ${calcularMedia(a.notas).toFixed(2)}\n`;
    });
    exibir(texto);
}

function remover() {
    const nome = prompt("Nome do aluno a remover:");
    const index = alunos.findIndex(a => a.nome === nome);
    if (index !== -1) {
        alunos.splice(index, 1);
        exibir(`Aluno ${nome} removido.`);
    } else {
        exibir("Aluno não encontrado.");
    }
}

function sair() {
    exibir("Encerrando, até logo...");
}

function exibir(texto) {
    document.getElementById("saida").innerText = texto;
}