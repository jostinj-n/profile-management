import { NewProfileState } from "@/app/redux/features/newProfileSlice";

export function mapStateToBackendSchema(state: NewProfileState) {
  const {
    firstPage,
    secondPage,
    thirdPage,
    fourthPage,
    fifthPage,
    sixthPage,
    seventhPage,
    eighthPage,
    ninthPage,
  } = state;
  const effectiveDate = firstPage.effectiveDate?.split("T")[0];
  const dateOfBirth = firstPage.dateOfBirth?.split("T")[0];
  const expiryDateTax = secondPage.expiryDateTax?.split("T")[0];
  const effectiveFromDate = secondPage.effectiveFrom?.split("T")[0];
  const effectiveToDate = secondPage.effectiveTo?.split("T")[0];

  const profileDetails = {
    effective_date: effectiveDate,
    resource_type: firstPage.ressourceType,
    employee_number: firstPage.employeeNumber,
    personal_pronoun: firstPage.pronoun,
    legal_first_name: firstPage.personalDetails[0].firstName,
    middle_name: firstPage.middleName,
    legal_last_name: firstPage.personalDetails[0].lastName,
    preferred_name: firstPage.preferredName,
    former_legal_first_name: firstPage.personalDetails[1]?.lastName || "",
    former_legal_last_name: firstPage.personalDetails[1]?.lastName || "",
    gender: firstPage.gender,
    primary_communication_language: firstPage.primaryCommunicationLanguage,
    species: firstPage.species,
    notes: firstPage.notes,
    date_of_birth: dateOfBirth,
    binary_gender: secondPage.binaryGender,
    tax_id_type: secondPage.taxIdType,
    tax_id_issuing_agency: secondPage.taxIssuingAgency,
    tax_id_value: secondPage.taxIdValue,
    tax_id_expiry: expiryDateTax,
    government_ids: secondPage.governmentIDs.map((govId) => ({
      id_type: govId.typeOfId,
      issuing_agency: govId.issuedByAgency,
      id_number: govId.issuedValue,
      expiry_date: govId.expiryDate?.split("T")[0],
    })),
    citizen_country: secondPage.citizenCountry,
    citizen_status: secondPage.status,
    citizen_id_type: secondPage.statusIdType,
    citizen_id_issuing_agency: secondPage.citizenIssuingAgency,
    citizen_id_number: secondPage.idValue,
    citizen_id_effective_from: effectiveFromDate,
    citizen_id_effective_to: effectiveToDate,
    personal_detail_notes: secondPage.notes,
    banking_details: thirdPage.banks.map((bank) => ({
      company: bank.company,
      payment_type_code: bank.paymentTypeCode,
      bank_name: bank.bankName,
      account_type: bank.accountType,
      transit_number: bank.routingNumber,
      account_number: bank.accountNumber,
    })),
  };

  const emergencyContactsArray = Object.values(fifthPage);

  const contactDetails = {
    primary_device_type: fourthPage.phones[0].phoneType,
    primary_phone_number: fourthPage.phones[0].phoneNumber,
    is_sms_allowed_primary: fourthPage.phones[0].allowSMS,
    primary_email_address: fourthPage.emails[0].email,
    is_email_allowed_primary: fourthPage.emails[0].generalCorrespondance,
    secondary_device_type: fourthPage.phones[1]?.phoneType || "",
    secondary_phone_number: fourthPage.phones[1]?.phoneNumber || "",
    is_sms_allowed_secondary: fourthPage.phones[1]?.allowSMS || false,
    secondary_email_address: fourthPage.emails[1]?.email || null,
    is_email_allowed_secondary: fourthPage.emails[1]?.generalCorrespondance,
    residential_address: "string",
    residential_additional_notes: "string",
    residential_city: "string",
    residential_province_state: "string",
    residential_country: "Canada",
    residential_postal_code: "string",
    is_mailing_address_same_as_residential: true,
    mailing_address: "string",
    mailing_additional_notes: "string",
    mailing_city: "string",
    mailing_province_state: "string",
    mailing_country: "Canada",
    mailing_postal_code: "string",
    emergency_contact: emergencyContactsArray.map((contact) => ({
      primary_flag: contact.primaryContact,
      personal_pronoun: contact.pronoun,
      first_name: contact.firstName,
      last_name: contact.lastName,
      relationship: contact.relationship,
      language_of_communication: contact.preferredLanguage,
      language_proficiency: contact.proficiency,
      contact_type:
        contact.phones[0].primaryNumber === true
          ? contact.phones[0].phoneType
          : contact.phones[1].phoneType,
      phone_number:
        contact.phones[0].primaryNumber === true
          ? contact.phones[0].phoneNumber
          : contact.phones[1].phoneNumber,
      email_address:
        contact.emails[0].primaryEmail === true
          ? contact.emails[0].email
          : contact.emails[1]?.email,
      secondary_contact_type:
        contact.phones[0].primaryNumber === true
          ? contact.phones[1]?.phoneType || null
          : contact.phones[0].phoneType,
      secondary_phone_number:
        contact.phones[0].primaryNumber === true
          ? contact.phones[1]?.phoneNumber || null
          : contact.phones[0].phoneNumber,
      secondary_email_address:
        contact.emails[0].primaryEmail === true
          ? contact.emails[1]?.email || null
          : contact.emails[0].email,
      notes: contact.notes,
    })),
  };

  const jobHireDate = sixthPage.jobHireDate?.split("T")[0];
  const firstDayOfWork = sixthPage.firstDayOfWork?.split("T")[0];
  const probationPeriod = sixthPage.probationPeriod?.split("T")[0];
  const originalHireDate = sixthPage.originalHireDate?.split("T")[0];
  const statusClassificationStartDate =
    eighthPage.statusClassificationStartDate?.split("T")[0];
  const effectiveTo = ninthPage.effectiveTo?.split("T")[0];
  const effectiveFrom = ninthPage.effectiveFrom?.split("T")[0];
  const workLocationStartDate = eighthPage.workLocationStartDate?.split("T")[0];
  const vacationEntitlementDate =
    eighthPage.vacationEntitlementDate?.split("T")[0];
  const terminationDate = sixthPage.terminationDate?.split("T")[0];
  const lastDayOnRole = sixthPage.lastDayOnRole?.split("T")[0];

  const employmentDetails = {
    company_name: sixthPage.company,
    division_name: sixthPage.division,
    department_name: sixthPage.department,
    primary_work_location_code:
      sixthPage.primaryWorkLocations[0]?.primaryWorkLocationCode || "",
    organizational_role: sixthPage.organizationRole,
    organizational_role_subtype: sixthPage.organizationalRoleSubtype,
    job_title: sixthPage.jobTitle,
    employment_status: sixthPage.employmentStatus,
    status_classification: sixthPage.statusClassification,
    is_position_unionized: sixthPage.unionizedPosition,
    other_work_location: [],
    job_hire_date: jobHireDate,
    first_day_of_work_on_role: firstDayOfWork,
    probation_date: probationPeriod,
    original_hire_date: originalHireDate,
    last_day_of_work_on_role: lastDayOnRole,
    termination_date: terminationDate,
    work_email_address: sixthPage.workEmail,
    work_contact_device_type: sixthPage.phoneType,
    work_phone_number: sixthPage.workPhone,
    associated_id: seventhPage.IDs.map((id) => ({
      id_number: id.otherEmployeeAssociatedIDValue,
      expiry_date: id.expiryDate?.split("T")[0],
      id_type: id.otherEmployeeAssociatedIDType,
    })),
    is_bilingual: seventhPage.isBilingual,
    languages: seventhPage.languages.map((lang) => ({
      name: lang.name,
    })),
    catsa_job_level: seventhPage.CATSAJobLevel,
    is_active_h_n_s: seventhPage.isActiveHSCommitteeMember,
    is_active_union_steward: seventhPage.activeUnionSteward,
    employment_notes: seventhPage.employmentNotes,
    vacation_entitlement_date: vacationEntitlementDate,
    work_location_start_date: workLocationStartDate,
    work_location_tie_breaker: eighthPage.workLocationTiebreakerValue, //NUMBER
    suppress_work_location: true,
    status_classification_date: statusClassificationStartDate,
    status_classification_tie_breaker:
      eighthPage.statusClassificationTiebreakerValue, //NUMBER
    suppress_status_classification: true,
    seniority_detail_notes: eighthPage.note,
    issued_pass_type: ninthPage.issuedPassType,
    reimbursement_type: ninthPage.reimbursementType,
    reimbursement_percentage_value: ninthPage.reimbursementPercentage, //NUMBER
    reimbursement_value: ninthPage.reimbursementAmount, //NUMBER
    issuing_agency: ninthPage.issuingAgency,
    monthly_rate_with_taxes: ninthPage.monthlyRateWithTaxes, //NUMBER,
    effective_from: effectiveFrom,
    effective_to: effectiveTo,
    pass_number: "test", //CHANGE
    vehicle_make: ninthPage.vehicleMake,
    vehicle_model: ninthPage.vehicleModel,
    vehicle_color: ninthPage.vehicleColor,
    license_plate: ninthPage.vehiclePlate,
  };

  return {
    profile_details: profileDetails,
    contact_details: contactDetails,
    employment_details: employmentDetails,
  };
}
