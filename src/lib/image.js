export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function fileToImageData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const comma = dataUrl.indexOf(',');
      if (comma < 0) { reject(new Error('Invalid data URL')); return; }
      resolve({
        base64: dataUrl.slice(comma + 1),
        mimeType: file.type || 'image/jpeg',
      });
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}
