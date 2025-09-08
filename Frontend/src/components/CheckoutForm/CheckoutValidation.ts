export const validateFirstName = (name: string): boolean => {
  const nameRegex = /^[A-Za-z]{2,}$/;
  return nameRegex.test(name);
};

export const validateLastName = (name: string): boolean => {
  const nameRegex = /^[A-Za-z]{2,}$/;
  return nameRegex.test(name);
};

export const validatePostcode = (postcode: string): boolean => {
  const postcodeRegex = /^[A-Za-z0-9\s-]{3,10}$/;
  return postcodeRegex.test(postcode);
};

export const validateCardName = (name: string): boolean => {
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  return nameRegex.test(name);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cardRegex = /^\d{13,19}$/;
  return cardRegex.test(cardNumber.replace(/\s+/g, ''));
};

export const validateExpiry = (expiry: string): boolean => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  if (!expiryRegex.test(expiry)) return false;

  const [month, year] = expiry.split('/').map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last two digits of current year
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false; // Card is expired
  }
  return true;
};

export const validateCVV = (cvv: string): boolean => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};
