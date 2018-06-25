const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Anna',
            room: 'Node Course'
        }]
    })


    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Dino',
            room: 'Zur'
        };
        const result = users.addUser(user.id, user.name, user.room);
        
        expect(users.users[0]).toMatchObject(user)
    })

    it('should remove a user', () => {
        const result = users.removeUser('1');

        expect(result.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        const result = users.removeUser('4');
        expect(result).toBeFalsy();
        expect(users.users.length).toBe(3);     
    });

    it('should find a user', () => {
        const result = users.getUser('2');
        expect(result.id).toBe('2');
    });

    it('should not find a user', () => {
        const result = users.getUser('72');
        expect(result).toBeFalsy()
    });

    it('should return names for node course', () => {
        const userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Anna'])
    });

    it('should return names for react course', () => {
        const userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen'])
    });
})