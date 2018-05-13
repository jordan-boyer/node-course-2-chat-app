const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jean',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]
    });

    it('should add new user', () => {
        var users = new Users;
        var user = {
            id: '123',
            name: 'andrew',
            room: 'the office fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var user = users.removeUser('1');
        expect(users.users.length).toBe(2);
        expect(user.id).toBe('1');
    });

    it('should not remove user', () => {
        var user = users.removeUser('99');
        expect(users.users.length).toBe(3);
        expect(user).toBeFalsy();
    });

    it('should find a user', () => {
        user = users.getUser('1');

        expect(user).toEqual(users.users[0]);
    });

    it('shoul not find a user', () => {
        user = users.getUser('99');

        expect(user).toBeFalsy();
    });

    it('should return names for nodes course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jean']);
    });


});