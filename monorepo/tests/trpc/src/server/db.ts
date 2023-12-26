export interface User {
  id: string;
  name: string;
}

const allUsers: User[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

export const db = {
  user: {
    async findMany() {
      return allUsers;
    },
    async findById(id: string) {
      return allUsers.find((u) => u.id === id);
    },
    async create(input: { name: string }) {
      const user: User = {
        id: String(allUsers.length + 1),
        name: input.name,
      };
      allUsers.push(user);
      return user;
    },
  },
};
