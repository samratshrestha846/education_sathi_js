# Online Education Consultancy Platform Schema

This is the initial domain schema for a monorepo with:

- `apps/edu_sathi_backend` for Express.js/Node.js
- `apps/edu_sathi_frontend` for React.js
- `packages/*` for shared contracts, repositories, test utilities, and domain types
- NoSQL database assumed to be MongoDB

The schema below is collection-oriented so it fits a repository pattern cleanly.

## 1. `students`

Purpose: registered student profiles and their eligibility context.

```ts
type Student = {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  nationality?: string;
  currentAddress?: string;
  preferredCountries: string[];
  preferredStudyLevels: ("diploma" | "bachelors" | "masters" | "phd")[];
  preferredIntakes: string[];
  educationRecords: EducationRecord[];
  englishTests: EnglishTestScore[];
  financialProfile?: FinancialProfile;
  profileCompletion: number;
  eligibilityStatus: "draft" | "reviewed" | "eligible" | "partially_eligible" | "not_eligible";
  referralCode?: string;
  createdAt: Date;
  updatedAt: Date;
};

type EducationRecord = {
  level: "see" | "plus_two" | "diploma" | "bachelors" | "masters" | "other";
  institutionName: string;
  boardOrUniversity?: string;
  country?: string;
  fieldOfStudy?: string;
  gradingType?: "gpa" | "percentage" | "cgpa" | "division";
  score?: number;
  passingYear?: number;
  backlogs?: number;
};

type EnglishTestScore = {
  examType: "ielts" | "pte" | "toefl" | "duolingo" | "other";
  overallScore?: number;
  listening?: number;
  reading?: number;
  writing?: number;
  speaking?: number;
  examDate?: string;
};

type FinancialProfile = {
  annualFamilyIncome?: number;
  sponsorType?: "self" | "parents" | "relative" | "other";
  availableFunds?: number;
  loanApproved?: boolean;
  loanAmount?: number;
};
```

## 2. `consultancies`

Purpose: consultancy company listing and profile details.

```ts
type Consultancy = {
  _id: ObjectId;
  slug: string;
  name: string;
  logoUrl?: string;
  description: string;
  establishedYear?: number;
  headquarters?: string;
  branches: Branch[];
  contactEmail?: string;
  contactPhone?: string;
  websiteUrl?: string;
  socialLinks?: SocialLinks;
  services: ConsultancyService[];
  partnerCountries: string[];
  partnerUniversityIds: ObjectId[];
  counsellingModes: ("online" | "physical" | "hybrid")[];
  applicationFee?: number;
  discountPolicy?: string;
  averageRating: number;
  totalReviews: number;
  verificationStatus: "pending" | "verified" | "rejected";
  isFeatured: boolean;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
};

type Branch = {
  city: string;
  address?: string;
  phone?: string;
};

type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
};

type ConsultancyService =
  | "career_counselling"
  | "university_selection"
  | "visa_guidance"
  | "documentation"
  | "sop_support"
  | "interview_preparation"
  | "scholarship_support"
  | "test_preparation";
```

## 3. `consultancyUniversityPartnerships`

Purpose: many-to-many mapping between consultancies and universities.

```ts
type ConsultancyUniversityPartnership = {
  _id: ObjectId;
  consultancyId: ObjectId;
  universityId: ObjectId;
  supportedCountries: string[];
  notes?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
};
```

## 4. `countries`

Purpose: destination country metadata and high-level rules.

```ts
type Country = {
  _id: ObjectId;
  slug: string;
  name: string;
  code: string;
  flagUrl?: string;
  description?: string;
  currency?: string;
  languageRequirements: LanguageRequirement[];
  financialRequirements?: CountryFinancialRequirement;
  visaInfo?: VisaInfo;
  popularFor: string[];
  averageLivingCostPerYear?: number;
  averageTuitionRange?: {
    min?: number;
    max?: number;
  };
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
};

type LanguageRequirement = {
  examType: "ielts" | "pte" | "toefl" | "duolingo" | "other";
  minimumOverallScore?: number;
  minimumBandScore?: number;
};

type CountryFinancialRequirement = {
  minimumFundProof?: number;
  allowEducationLoan?: boolean;
  notes?: string;
};

type VisaInfo = {
  processingTimeDays?: number;
  embassyInterviewRequired?: boolean;
  notes?: string;
};
```

## 5. `universities`

Purpose: university catalogue.

```ts
type University = {
  _id: ObjectId;
  slug: string;
  name: string;
  countryId: ObjectId;
  city?: string;
  type?: "public" | "private" | "college" | "institute";
  ranking?: number;
  websiteUrl?: string;
  logoUrl?: string;
  overview?: string;
  intakeMonths: string[];
  tuitionFeeRange?: {
    min?: number;
    max?: number;
  };
  scholarshipAvailable?: boolean;
  accommodationAvailable?: boolean;
  applicationFee?: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
};
```

## 6. `courses`

Purpose: course/program data under universities.

```ts
type Course = {
  _id: ObjectId;
  universityId: ObjectId;
  countryId: ObjectId;
  slug: string;
  title: string;
  studyLevel: "diploma" | "bachelors" | "masters" | "phd";
  discipline: string;
  durationMonths?: number;
  intakeMonths: string[];
  tuitionFee?: number;
  applicationFee?: number;
  scholarshipAvailable?: boolean;
  requirements: CourseRequirement;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
};

type CourseRequirement = {
  minimumAcademicScore?: number;
  gradingType?: "gpa" | "percentage" | "cgpa";
  acceptedPreviousLevels: string[];
  maxBacklogs?: number;
  englishRequirements: LanguageRequirement[];
  documentsRequired: string[];
  workExperienceRequired?: boolean;
  minimumWorkExperienceMonths?: number;
  notes?: string;
};
```

## 7. `eligibilityAssessments`

Purpose: computed or manually reviewed student eligibility results.

```ts
type EligibilityAssessment = {
  _id: ObjectId;
  studentId: ObjectId;
  preferredCountryIds: ObjectId[];
  matchingCourseIds: ObjectId[];
  matchingUniversityIds: ObjectId[];
  matchingConsultancyIds: ObjectId[];
  rejectedReasons: string[];
  summary: string;
  assessmentSource: "system" | "consultant" | "admin";
  createdAt: Date;
  updatedAt: Date;
};
```

## 8. `studentConsultancySelections`

Purpose: track shortlisted or chosen consultancies.

```ts
type StudentConsultancySelection = {
  _id: ObjectId;
  studentId: ObjectId;
  consultancyId: ObjectId;
  status: "shortlisted" | "contacted" | "consultation_booked" | "selected" | "rejected";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};
```

## 9. `referrals`

Purpose: referral and commission tracking.

```ts
type Referral = {
  _id: ObjectId;
  studentId: ObjectId;
  consultancyId: ObjectId;
  referralCode: string;
  discountAmount?: number;
  commissionAmount?: number;
  commissionType?: "flat" | "percentage";
  referralStatus: "generated" | "shared" | "converted" | "cancelled";
  conversionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};
```

## 10. `reviews`

Purpose: student feedback on consultancies.

```ts
type Review = {
  _id: ObjectId;
  studentId: ObjectId;
  consultancyId: ObjectId;
  rating: number;
  title?: string;
  comment?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
```

## 11. `admins`

Purpose: internal platform management.

```ts
type Admin = {
  _id: ObjectId;
  email: string;
  passwordHash: string;
  fullName: string;
  role: "super_admin" | "editor" | "reviewer";
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
};
```

## 12. `auditLogs`

Purpose: admin-side audit trail for sensitive updates.

```ts
type AuditLog = {
  _id: ObjectId;
  actorId: ObjectId;
  actorType: "admin" | "system";
  action: string;
  entityType: string;
  entityId: ObjectId;
  metadata?: Record<string, unknown>;
  createdAt: Date;
};
```

## Relationships Summary

- A `student` can have many `eligibilityAssessments`
- A `student` can shortlist many `consultancies`
- A `consultancy` can work with many `universities`
- A `country` has many `universities`
- A `university` has many `courses`
- A `student` can create many `referrals`
- A `student` can post many `reviews`

## Suggested Indexes

```ts
students: email(unique), referralCode(unique)
consultancies: slug(unique), name(text), partnerCountries
countries: slug(unique), code(unique)
universities: slug(unique), countryId
courses: universityId, countryId, studyLevel, discipline
eligibilityAssessments: studentId, matchingConsultancyIds
studentConsultancySelections: studentId + consultancyId(unique compound)
referrals: referralCode(unique), studentId, consultancyId, referralStatus
reviews: consultancyId, studentId
```

## Notes Before Implementation

- Use repositories per aggregate root:
  - `StudentRepository`
  - `ConsultancyRepository`
  - `CountryRepository`
  - `UniversityRepository`
  - `CourseRepository`
  - `EligibilityAssessmentRepository`
  - `ReferralRepository`
- Keep API contracts separate from persistence models so repository implementations can evolve.
- Eligibility should be computed from:
  - academic history
  - English proficiency
  - financial profile
  - preferred country
  - course requirements
- Initial MVP can skip:
  - payments
  - live chat
  - document storage
  - appointment calendar sync
