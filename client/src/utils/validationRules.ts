import { Rule } from "antd/es/form";

const loginSymbolRegExp = /^[\p{L}\p{N}_-]+$/u;

const specialCharactersRegExp = /[.,!"№;%:?*()_+@#$^&\- ="'/|{}~<>[\]]/;

export const createValidator = (
  condition: RegExp | boolean,
  message: string,
  restOptions?: Rule
): Rule => ({
  validator: (_, value) => {
    const isValid =
      condition instanceof RegExp ? condition.test(value) : condition;

    return isValid ? Promise.resolve() : Promise.reject(message);
  },
  ...restOptions,
});

export const requiredRule = (message = "Обязательно для заполнения"): Rule => ({
  required: true,
  message,
});

const minMaxRule = (min: number, max: number): Rule => {
  const regexp = new RegExp(`^.{${min},${max}}$`);

  return createValidator(
    regexp,
    `Должно содержать от ${min} до ${max} символов`
  );
};

const loginSymbolRule: Rule = {
  message: "Допустимые символы: Кириллица, Латиница, цифры и символы -, _",
  pattern: loginSymbolRegExp,
};

const digitValidator = createValidator(
  /\d/,
  "Строка должна содержать хотя бы одну цифру"
);

const uppercaseValidator = createValidator(
  /[A-Z]/,
  "Строка должна содержать хотя бы одну прописную латинскую букву"
);

const lowercaseValidator = createValidator(
  /[a-z]/,
  "Строка должна содержать хотя бы одну строчную латинскую букву"
);

const specialCharValidator = createValidator(
  specialCharactersRegExp,
  "Строка должна содержать хотя бы один специальный символ"
);

const noCyrillicValidator = createValidator(
  /^[^а-яА-Я]/,
  "Строка не должна содержать кириллицу"
);

export const passwordRule: Rule[] = [
  requiredRule(),
  minMaxRule(6, 20),
  digitValidator,
  uppercaseValidator,
  lowercaseValidator,
  specialCharValidator,
  noCyrillicValidator,
];

export const loginRule: Rule[] = [
  requiredRule(),
  minMaxRule(3, 50),
  loginSymbolRule,
];
