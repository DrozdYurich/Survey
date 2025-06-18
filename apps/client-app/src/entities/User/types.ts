export interface LoginData {
  identifier: string;
  password: string;
}
export interface RegistrData {
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: Date | null | string;
  nickName: string;
  password: string;
  email: string;
}
