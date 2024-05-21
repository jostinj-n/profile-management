
export function ensurePlusPrefix(phoneNumber: string) {
  if (phoneNumber.startsWith('+')) {
    return phoneNumber;
  } else {
    return '+' + phoneNumber;
  }
}
