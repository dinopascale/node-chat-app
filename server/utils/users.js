[{
    id: 'kkajkdjaojdm',
    name: 'Dino',
    room: 'Viva Zur'
}]


class Users {
    constructor () {
        this.users = []
    }

    addUser (id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        const index = this.users.findIndex(user => user.id === id)
        return index !== -1 
               ? this.users.splice(index, 1)[0]
               : undefined
    }

    getUser (id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUserList (room) {
        return this.users.filter(user => user.room === room).map(user => user.name);
    }
}

module.exports = { Users }