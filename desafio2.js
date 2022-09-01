console.log('Desafio2 - Manejo de archivos');

const fs = require('fs')


// async function readFile (nameFile){
//         let body = await fs.promises.readFile(`./${nameFile}`,'utf-8')
//         let bodyJson = JSON.parse(body)
//        return a = bodyJson 
//     }


class Contenedor {
    constructor(nFile){
        this.nFile = nFile
    }


    async save(objeto){
        try {
            let body = await fs.promises.readFile(`./${this.nFile}`,'utf-8')
            let bodyJson = JSON.parse(body)
            let lastId = bodyJson[bodyJson.length - 1].id
            objeto.id=lastId+1
            let id = objeto.id
            bodyJson.push(objeto)
                await fs.promises.writeFile(`./${this.nFile}`,JSON.stringify(bodyJson))
            return id

        } catch (err) {
            console.log('Se presento un error en metodo save' + err);
        }


    }

    async getById(number){
        try {
            let body = await fs.promises.readFile(`./${this.nFile}`,'utf-8')
            let bodyJson = JSON.parse(body)
            let result=0
             bodyJson.forEach(e => {
                 if(e.id==number){
                     result = e
                 }
             })
            return result

        } catch (err) {
            console.log('Se presento un error en el metodo getById' + err);
        }

    }

    async getAll(){
        try {
            let body = await fs.promises.readFile(`./${this.nFile}`,'utf-8')
            let bodyJson = JSON.parse(body)
            let catalogo = bodyJson
            return catalogo
        } catch (err) {
            console.log('Se presento un error en el metodo getAll' + err);
        }
    }

    async deleteById(id){
        try {
            let body = await fs.promises.readFile(`./${this.nFile}`,'utf-8')
            let bodyJson = JSON.parse(body)
            let nonDeleted = bodyJson.filter(e=>e.id!==id)
            console.log(nonDeleted);
            await fs.promises.writeFile(`./${this.nFile}`,JSON.stringify(nonDeleted))
        } catch (err) {
            console.log('Se presento un error en el metodo deleteById' + err);
        }

    }

    async deleteAll(){
        try {
            let body = await fs.promises.readFile(`./${this.nFile}`,'utf-8')
            let bodyJson = JSON.parse(body)
            let nothing = []
            await fs.promises.writeFile(`./${this.nFile}`,nothing)
            return nothing;
        } catch (error) {
            console.log('Se presento un error en el metodo deleteAll' + err);
        }
    }


}

let contenedor = new Contenedor("catalogo.json")

let productoNuevo = {
    title:'Medias',
    price:'8000',
    thumbnail:'https://falabella.scene7.com/is/image/FalabellaCO/9127943_1?wid=800&hei=800&qlt=70',
    id:1
}


contenedor.save(productoNuevo).then(res=>{console.log(res)})

contenedor.getById(4).then(res=>{console.log(res);})

contenedor.getAll().then(res=>{console.log(res);})

contenedor.deleteById(2).then(res=>{console.log(res);})

contenedor.deleteAll().then(res=>{console.log(res);})