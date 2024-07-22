export const formatDate = (date: Date): string => {
  const pad = (num: number): string => num.toString().padStart(2, "0");

  const year = date.getFullYear().toString().slice(-2);
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

interface FormData {
  name: string;
  phone: string;
  comment: string;
}

export const validateFormData = (data: any): { success: boolean; data?: FormData; errors?: string[] } => {
  const errors: string[] = [];

  if (typeof data.name !== "string" || data.name.length < 2 || data.name.length > 50) {
    errors.push("Name must be between 2 and 100 characters");
  }

  if (typeof data.phone !== "string" || data.phone.length > 25) {
    errors.push("Phone number must not exceed 20 characters");
  }

  if (typeof data.comment !== "string" || data.comment.length > 1000) {
    errors.push("Comment must not exceed 1000 characters");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name: data.name,
      phone: data.phone,
      comment: data.comment,
    },
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};
