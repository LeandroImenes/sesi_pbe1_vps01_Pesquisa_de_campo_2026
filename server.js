const express = require("express")
const ias = require("./dados.json")

function autoIncrement() {
    return Number(ias[ias.length - 1].id) + 1
}

const mostrarIa = (req, res) => {
    res.send(ias)
}

const novaIa=(req, res) => {
    if(req.body){
        req.body.id = autoIncrement()
        ias.push(req.body)
        res.send("IA cadastrada")
    }else{
        res.send("Erro ao cadastrar a IA")
    }
}

const excluirIa = (req, res) => {
    const id = req.query.id
    ias.forEach((ia, indice) => {
        if(ia.id == id) {
            ias.splice(indice, 1)
        }
    })
    res.send("IA excluída com sucesso.")
}

const alterarIa = (req, res) => {
    const id = req.params.id
    const dados = req.body

    ias.forEach((ia) => {
        if(ia.id == id) {
            ia.sistema = dados.sistema
            ia.tipo = dados.tipo
            ia.finalidade = dados.finalidade
            ia.tecnologia = dados.tecnologia
            ia.nivel_risco = dados.nivel_risco
            ia.possui_revisao_humana = dados.possui_revisao_humana
        }
    })
    res.send("IA atualizada com sucesso!")
}

const buscarId = (req, res) => {
    const id = req.params.id
    const ia = ias.find((p) => p.id == id)

    if(ia) {
        return res.send(ia)
    }
    res.status(404).send("IA não encontrada")
}
const buscarRisco = (req, res) => {
    const risco = req.params.risco
    const resultado = ias.filter((p) => p.nivel_risco == risco)

    if(resultado.length > 0) {
        return res.send(resultado)
    }
    res.status(404).send("IA não encontrada")
}
const buscarTipo = (req, res) => {
    const tipo = req.params.tipo
    const resultado = ias.filter((p) => p.tipo == tipo)

    if(resultado.length > 0) {
        return res.send(resultado)
    }
    res.status(404).send("IA não encontrada")
}

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const porta = 3000

app.get("/", mostrarIa)
app.post("/ia", novaIa)
app.get("/ia/id/:id", buscarId)
app.get("/ia/risco/:risco", buscarRisco)
app.get("/ia/tipo/:tipo", buscarTipo)
app.delete("/ia", excluirIa)
app.put("/ia/:id", alterarIa)

app.listen(porta, () => {
    console.log(`Servidor: http://localhost:${porta}/`)
})