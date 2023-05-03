export async function convertFileToBase64String(file: Blob) {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result);
      } else {
        reject(Error("No base64 string found"));
      }
    };
    reader.readAsDataURL(file);
  });
}

export function convertBase64StringToFile(
  base64String: string,
  mimeType: string
) {
  const binaryString = Buffer.from(base64String, "base64").toString("binary");
  return new Blob([binaryString], { type: mimeType });
}
