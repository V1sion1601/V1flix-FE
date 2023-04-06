export const slugifyString: (field: string) => string = (str: string) => {
  return (
    str
      .toLowerCase()
      .trim()
      //  .replace(/[^\w\s-]/g, "")
      .replace(/[\s]+/g, "_")
  );
  //  .replace(/^-+|-+$/g, "");
};
