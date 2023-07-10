// Cartas informativas
export interface CardItems {
  id               : number,
  id_profile       : number,
  id_state         : number,
  image            : any,
  title            : string,
  description      : string,
  limit            : number,  
  price            : string,
  publicationDate? : string,
  ubication?       : string,
} 

// Estados
export interface States {
  id   : number,
  name : string
}

// Faqs
export interface Faqs {
  title       : string,
  description : string
}

// Imagenes
export interface Image {
  id             : number,
  id_publication : number,
  name           : string,
  file           : string
}

// Login 
export interface UserLogin {
  success : boolean,
  user    : User
}

// Opciones del menú de navegación
export interface NavItems {
  item : string,
  link : string
}

// Redes sociales
export interface SocialMedia {
  name : string,
  icon : string,
  link : string 
}

// Usuarios
export interface User {
  id          : number,
  id_state    : number, 
  name        : string,
  lastName    : string,
  phoneNumber : string,
  email       : string,
  password    : string,
  image       : any
}

