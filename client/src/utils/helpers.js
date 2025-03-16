function validateEducationalEmail(email) {
  const educationalEmailPattern =
    /^[a-zA-Z0-9_.+-]+@(?:\w+\.)+(edu|ac\.[a-z]{2,}|sch\.[a-z]{2,}|uni\.[a-z]{2,})$/;

  return educationalEmailPattern.test(email);
}

export { validateEducationalEmail };
