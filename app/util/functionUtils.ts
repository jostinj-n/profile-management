export const handleCsvDownload = async (
  response: Response,
  fileName?: string
) => {
  const hiddenElement = document.createElement("a");
  const url = window.URL || window.webkitURL;
  const csvFile = url.createObjectURL(await response.blob());
  hiddenElement.href = csvFile;
  hiddenElement.download = fileName ?? "file";
  hiddenElement.click();
  url.revokeObjectURL(csvFile);
  hiddenElement.remove();
  return null;
};
