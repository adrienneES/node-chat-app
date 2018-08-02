// add user (id, name, room)
// removeUser (id)
// getUser (id)
// getUserList (room)
class Users {
    constructor () {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        const user = this.users.filter((user)=>user.id === id)[0];
        this.users = this.users.filter((user)=>user.id !== id);
        return user;
    }
    getUser(id){ 
        return this.users.filter((user)=>user.id === id)[0];
    }
    getUserList(room){
        var users = this.users.filter((user)=>user.room === room)
        return users.map((user)=>user.name);
    }
}

module.exports = {
    Users
}