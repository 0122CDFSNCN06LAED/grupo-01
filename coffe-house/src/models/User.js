//1. Guardar al usuario en la DB.
//2. Buscar al usuario que se quiere loguear por su email.
//3. Buscar a un usuario por su id. findByPk(req.body)
//4. Editar la información  de un usuario.por metodo POST?
//5. Eliminar a un usuario de la DB.
const fs = require('fs');
const path = require('path');

const User = {
    //método que guarda el origen del archivo usersDB
    fileName: path.resolve(__dirname, "../data/usersDataBase.json"),
    //trae la DB en un array de objetos
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    generateId: function(){
        let allUsers = this.findAll();
        //con pop traemos al último elemento del array
        let lastUser = allUsers.pop();
        //si existe un usuario, la condicion dará truthy
        if(lastUser){
        return lastUser.id + 1;
        }
        //si el array está vacío, la condicion dará falsy
        return 1;
    },
    //trae todos los usuarios
    findAll: function(){
        return this.getData()
    },
    //busco en la DB por id
    findByPk: function(id){
        //llamo al método findall y guardo a todos los usuarios en una variable
        let allUsers = this.findAll();
        //en una variable guardo al user cuyo id coincida con el parámetro que le paso
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        //retorna el user encontrado
        return userFound;
    },
    findByField: function(field, text){
        //llamo al método findall y guardo a todos los usuarios en una variable
        let allUsers = this.findAll();
        //en una variable guardo al user, indicando el campo en el que quiero buscar y el valor de dicho campo.
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        //console.log(findByField('email','lu.wagner@gmail.com'))

        //retorna el PRIMER user encontrado que cumpla la condición
        return userFound;
    },
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            //uso spread operator para copiar todas las propiedades del objeto userData
            ...userData
        }
        //Hago un push del nuevo user a la DB.
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    delete: function (id) {
        let allUsers= this.findAll();
        //compara si el id del usuario es distinto del id que le pasamos, si es así lo guarda en el array.
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        //sobrescribe el archivo original con todos los usuarios excepto el eliminado.
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
    }
}

module.exports = User;
