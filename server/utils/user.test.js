const expect = require('expect');

const {Users} = require('./users');
var users;
beforeEach(()=>{
    users = new Users();
    users.users = [{id:1, name: 'adri', room: 'pets'},
    {id:2, name: 'paul', room: 'pets'},
    {id:3, name: 'henry', room: 'a'}]
});
describe ('testing user', ()=>{
    it('should add new user', () =>{
        let responseUser = users.addUser(7, 'adri', 'room');
        expect(users.users.length).toBe(4);
        expect(responseUser.name).toBe('adri');
    });
    it('should return names for node course', ()=> {
        var userList = users.getUserList('pets');
        expect(userList.length).toBe(2);
        expect(userList).toEqual(['adri', 'paul'])
    });
    it('should remove a user', ()=>{
        var user = users.removeUser(2);
        expect(users.getUserList('pets').length).toBe(1);
    });
    it('should not remove user not in list', ()=>{
        var user = users.removeUser(21);
        expect(user).toBe(undefined);
        expect(users.getUserList('pets').length).toBe(2);
    });
    it('should find a user', ()=>{
        var user = users.getUser(2);
        expect(user.name).toBe('paul');
    });
    it('should not find user not in list', ()=>{
        var user = users.getUser(11);
        expect(user).toBe(undefined);
    });
});
