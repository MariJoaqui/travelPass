// Cartas informativas
export interface CardItems {
  image       : string,
  title       : string,
  description : string,
  limit       : string,      
  price       : string,
  ubication   : string,
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
  id         : number,
  id_state?  : number, 
  name       : string,
  lastName   : string,
  email      : string,
  password?  : string,
}

