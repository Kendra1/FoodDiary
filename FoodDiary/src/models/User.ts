export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  settingsId: string;
  dailyInputs: Array<string>;
}
