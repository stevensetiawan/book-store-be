import bcrypt from 'bcrypt';

// Hash the password
export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
  try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
  } catch (error) {
      throw new Error(`Error hashing password: ${error}`);
  }
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
      const result = await bcrypt.compare(plainPassword, hashedPassword);
      console.log(result, 'ini nh')
      return result;
  } catch (error) {
      throw new Error(`Error comparing passwords: ${error}`);
  }
}