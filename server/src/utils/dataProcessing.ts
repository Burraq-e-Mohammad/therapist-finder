/**
 * Utility functions for processing and normalizing therapist data
 */

export interface RawTherapistData {
  name: string;
  profile_url: string;
  gender: string;
  city: string;
  experience_years: string;
  email: string;
  phone: string;
  modes: string;
  education: string;
  experience: string;
  expertise: string;
  about: string;
  fees_raw: string;
  fee_amount: string;
  fee_currency: string;
}

export interface ProcessedTherapistData {
  name: string;
  profileUrl: string;
  gender: string;
  city: string;
  experienceYears: number;
  email: string;
  phone: string;
  modes: string[];
  education: string[];
  experience: string[];
  expertise: string[];
  about: string;
  fees: number | null;
  feesRaw: string;
  feesCurrency: string;
}

/**
 * Parse consultation modes from string
 */
export function parseModes(modesString: string): string[] {
  if (!modesString || modesString.trim() === '') {
    return [];
  }
  
  return modesString
    .split(';')
    .map(mode => mode.trim())
    .filter(mode => mode.length > 0);
}

/**
 * Parse education from string
 */
export function parseEducation(educationString: string): string[] {
  if (!educationString || educationString.trim() === '') {
    return [];
  }
  
  return educationString
    .split(';')
    .map(edu => edu.trim())
    .filter(edu => edu.length > 0);
}

/**
 * Parse experience from string
 */
export function parseExperience(experienceString: string): string[] {
  if (!experienceString || experienceString.trim() === '') {
    return [];
  }
  
  return experienceString
    .split(';')
    .map(exp => exp.trim())
    .filter(exp => exp.length > 0);
}

/**
 * Parse expertise from string
 */
export function parseExpertise(expertiseString: string): string[] {
  if (!expertiseString || expertiseString.trim() === '') {
    return [];
  }
  
  return expertiseString
    .split(';')
    .map(exp => exp.trim())
    .filter(exp => exp.length > 0);
}

/**
 * Normalize city names
 */
export function normalizeCity(city: string): string {
  const cityMap: Record<string, string> = {
    'karachi': 'Karachi',
    'lahore': 'Lahore',
    'islamabad': 'Islamabad',
    'rawalpindi': 'Islamabad',
    'peshawar': 'Peshawar',
    'quetta': 'Quetta',
    'multan': 'Multan',
    'faisalabad': 'Faisalabad',
    'larkana': 'Larkana',
    'abbottabad': 'Abbottabad',
  };
  
  const normalized = city.toLowerCase().trim();
  return cityMap[normalized] || city;
}

/**
 * Parse and normalize fee amount
 */
export function parseFeeAmount(feeString: string): number | null {
  if (!feeString || feeString.trim() === '') {
    return null;
  }
  
  // Extract numeric value from fee string
  const match = feeString.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (match) {
    return parseFloat(match[1].replace(/,/g, ''));
  }
  
  return null;
}

/**
 * Process raw therapist data into normalized format
 */
export function processTherapistData(rawData: RawTherapistData): ProcessedTherapistData {
  return {
    name: rawData.name.trim(),
    profileUrl: rawData.profile_url?.trim() || '',
    gender: rawData.gender.trim(),
    city: normalizeCity(rawData.city),
    experienceYears: parseFloat(rawData.experience_years) || 0,
    email: rawData.email?.trim() || '',
    phone: rawData.phone?.trim() || '',
    modes: parseModes(rawData.modes),
    education: parseEducation(rawData.education),
    experience: parseExperience(rawData.experience),
    expertise: parseExpertise(rawData.expertise),
    about: rawData.about?.trim() || '',
    fees: parseFeeAmount(rawData.fee_amount),
    feesRaw: rawData.fees_raw?.trim() || '',
    feesCurrency: rawData.fee_currency?.trim() || 'PKR',
  };
}
