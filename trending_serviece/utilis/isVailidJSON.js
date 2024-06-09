export const isValidJSON = (string) => {
    try {
      JSON.parse(string);
      return true;
    } catch (error) {
        return false;
    }
  };
