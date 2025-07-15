// /src/data/users.ts

export type User = {
  id: number,
  username: string,
  email: string,
  photo: string
};

export const users: User[] = [
  {
    id: 1,
    username: "juanfer14",
    email: "a@gmail.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    username: "carla_lpz",
    email: "carla@example.com",
    photo: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 3,
    username: "nicolas89",
    email: "nico@example.com",
    photo: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 4,
    username: "maria_beachlover",
    email: "maria@example.com",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 5,
    username: "tomas_wave",
    email: "tomas@example.com",
    photo: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 6,
    username: "lucia_venturini",
    email: "lucia@example.com",
    photo: "https://randomuser.me/api/portraits/women/30.jpg"
  },
  {
    id: 7,
    username: "gonzalo_tech",
    email: "gonza@example.com",
    photo: "https://randomuser.me/api/portraits/men/21.jpg"
  },
  {
    id: 8,
    username: "agustina_azul",
    email: "agustina@example.com",
    photo: "https://randomuser.me/api/portraits/women/18.jpg"
  },
];
