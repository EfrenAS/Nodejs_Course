// Una factory funcion es una funcion que devuelve otra funcion
interface BuildMakePersonProps {
  getUUID: () => string
  getAge: ({ birthday }: { birthday: string }) => string
}

interface PersonProps {
  name: string
  birthday: string
}

export const buildMakePerson = ({ getUUID, getAge }: BuildMakePersonProps) => {
  return ({ name, birthday }: PersonProps) => {
    return {
      id: getUUID(),
      name,
      birthday,
      age: getAge({ birthday })
    }
  }
}
