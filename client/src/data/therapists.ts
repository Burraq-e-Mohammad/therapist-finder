// Mock therapist data based on the CSV structure
export interface Therapist {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  city: string;
  yearsOfExperience: number;
  fee: number;
  rating: number;
  phone: string;
  email: string;
  education: string[];
  experience: string[];
  expertise: string[];
  about: string;
  consultationModes: {
    inPerson: boolean;
    online: boolean;
  };
  photoUrl?: string;
  title: string;
}

export const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    gender: 'Female',
    city: 'Karachi',
    yearsOfExperience: 10,
    fee: 3000,
    rating: 4.8,
    phone: '+92 300 1234567',
    email: 'dr.sarah@email.com',
    title: 'Clinical Psychologist',
    education: [
      'PhD in Clinical Psychology - University of Karachi (2010)',
      'Masters in Psychology - Aga Khan University (2006)',
      'Certified Cognitive Behavioral Therapist (CBT)',
    ],
    experience: [
      'Senior Psychologist at Mind Wellness Center (2015-Present)',
      'Clinical Psychologist at Aga Khan Hospital (2010-2015)',
      'Internship at Institute of Mental Health (2008-2010)',
    ],
    expertise: [
      'Anxiety Disorders',
      'Depression',
      'PTSD',
      'Relationship Counseling',
      'Stress Management',
      'Cognitive Behavioral Therapy',
      'Family Therapy',
    ],
    about: 'Dr. Sarah Ahmed is a compassionate and experienced clinical psychologist with over 10 years of experience helping individuals overcome mental health challenges. She specializes in evidence-based therapeutic approaches and creates a safe, non-judgmental space for healing.',
    consultationModes: {
      inPerson: true,
      online: true,
    },
  },
  {
    id: '2',
    name: 'Dr. Ali Hassan',
    gender: 'Male',
    city: 'Lahore',
    yearsOfExperience: 7,
    fee: 2500,
    rating: 4.2,
    phone: '+92 321 2345678',
    email: 'dr.ali@email.com',
    title: 'Psychiatrist',
    education: [
      'MBBS - King Edward Medical University (2010)',
      'FCPS Psychiatry - College of Physicians and Surgeons Pakistan (2015)',
    ],
    experience: [
      'Consultant Psychiatrist at Services Hospital (2016-Present)',
      'Medical Officer at Jinnah Hospital (2010-2016)',
    ],
    expertise: [
      'Bipolar Disorder',
      'Schizophrenia',
      'Depression',
      'Anxiety Disorders',
      'Sleep Disorders',
    ],
    about: 'Dr. Ali Hassan is a board-certified psychiatrist dedicated to providing comprehensive mental health care. He combines medication management with supportive psychotherapy.',
    consultationModes: {
      inPerson: true,
      online: false,
    },
  },
  {
    id: '3',
    name: 'Dr. Fatima Khan',
    gender: 'Female',
    city: 'Islamabad',
    yearsOfExperience: 15,
    fee: 4000,
    rating: 4.9,
    phone: '+92 333 3456789',
    email: 'dr.fatima@email.com',
    title: 'Clinical Psychologist & Therapist',
    education: [
      'PhD in Clinical Psychology - Quaid-i-Azam University (2005)',
      'Masters in Counseling Psychology - National Institute of Psychology (2000)',
    ],
    experience: [
      'Director of Mental Health Services at Capital Hospital (2010-Present)',
      'Clinical Psychologist at PIMS Hospital (2005-2010)',
    ],
    expertise: [
      'Trauma and PTSD',
      'Marriage Counseling',
      'Child Psychology',
      'Eating Disorders',
      'OCD',
      'Panic Disorders',
    ],
    about: 'Dr. Fatima Khan brings over 15 years of expertise in clinical psychology and psychotherapy. She is known for her empathetic approach and evidence-based interventions.',
    consultationModes: {
      inPerson: true,
      online: true,
    },
  },
  {
    id: '4',
    name: 'Dr. Usman Shah',
    gender: 'Male',
    city: 'Karachi',
    yearsOfExperience: 5,
    fee: 2000,
    rating: 4.5,
    phone: '+92 345 4567890',
    email: 'dr.usman@email.com',
    title: 'Counseling Psychologist',
    education: [
      'Masters in Clinical Psychology - Karachi University (2015)',
      'Diploma in Counseling Psychology (2017)',
    ],
    experience: [
      'Counseling Psychologist at Life Care Center (2017-Present)',
    ],
    expertise: [
      'Career Counseling',
      'Stress Management',
      'Youth Counseling',
      'Academic Stress',
      'Personal Development',
    ],
    about: 'Dr. Usman Shah specializes in counseling young adults and professionals dealing with career transitions and stress management.',
    consultationModes: {
      inPerson: true,
      online: true,
    },
  },
  {
    id: '5',
    name: 'Dr. Ayesha Malik',
    gender: 'Female',
    city: 'Lahore',
    yearsOfExperience: 12,
    fee: 3500,
    rating: 4.7,
    phone: '+92 300 5678901',
    email: 'dr.ayesha@email.com',
    title: 'Child & Adolescent Psychologist',
    education: [
      'PhD in Child Psychology - Punjab University (2008)',
      'Masters in Developmental Psychology (2003)',
    ],
    experience: [
      'Head of Child Psychology Department at Children\'s Hospital (2012-Present)',
      'Clinical Psychologist at Mayo Hospital (2008-2012)',
    ],
    expertise: [
      'ADHD',
      'Autism Spectrum Disorders',
      'Learning Disabilities',
      'Behavioral Issues',
      'Child Development',
    ],
    about: 'Dr. Ayesha Malik is a leading expert in child and adolescent psychology with a passion for helping young minds thrive.',
    consultationModes: {
      inPerson: true,
      online: true,
    },
  },
  {
    id: '6',
    name: 'Dr. Hassan Raza',
    gender: 'Male',
    city: 'Islamabad',
    yearsOfExperience: 20,
    fee: 5000,
    rating: 4.9,
    phone: '+92 321 6789012',
    email: 'dr.hassan@email.com',
    title: 'Senior Psychiatrist',
    education: [
      'MBBS - Aga Khan University (1995)',
      'FCPS Psychiatry (2000)',
      'Fellowship in Addiction Medicine - UK (2002)',
    ],
    experience: [
      'Consultant Psychiatrist & Head of Department at Shifa International (2005-Present)',
      'Senior Registrar at Aga Khan University Hospital (2000-2005)',
    ],
    expertise: [
      'Addiction Medicine',
      'Mood Disorders',
      'Personality Disorders',
      'Complex PTSD',
      'Psychopharmacology',
    ],
    about: 'Dr. Hassan Raza is one of Pakistan\'s most experienced psychiatrists, specializing in complex mental health conditions and addiction treatment.',
    consultationModes: {
      inPerson: true,
      online: true,
    },
  },
];

export const cities = ['Karachi', 'Lahore', 'Islamabad', 'Other'];
export const experienceRanges = ['0-5 years', '5-10 years', '10-15 years', '15+ years'];
export const feeRanges = ['Under Rs.2000', 'Rs.2000-4000', 'Rs.4000-6000', 'Above Rs.6000'];
export const consultationModes = ['In-person', 'Online'];
