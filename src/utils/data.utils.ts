import { UserData } from '../types/api';

/**
 * Pequenos geradores de dados para os testes.
 * Mantém a lógica centralizada e facilmente reutilizável.
 */
export class DataUtils {
  static randomTimestamp(): number {
    return Date.now();
  }

  static randomEmail(prefix = 'auto'): string {
    return `${prefix}_${this.randomTimestamp()}@example.com`;
  }

  static generateUser(overrides?: Partial<UserData>): UserData {
    const defaultUser: UserData = {
      name: 'API User Test',
      email: this.randomEmail('api_user'),
      password: 'password123',
      title: 'Mr',
      birth_date: '10',
      birth_month: '05',
      birth_year: '1990',
      firstname: 'API',
      lastname: 'Test',
      company: 'QA Corp',
      address1: 'Street 1',
      address2: 'Apt 2',
      country: 'United States',
      zipcode: '90001',
      state: 'California',
      city: 'Los Angeles',
      mobile_number: '1234567890'
    };

    return { ...defaultUser, ...overrides };
  }
}
