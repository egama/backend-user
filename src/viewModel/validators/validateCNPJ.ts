import isValidCnpj from '@brazilian-utils/is-valid-cnpj';

export const validateCNPJ = (cnpj: string): boolean => {
    return isValidCnpj(cnpj)
}