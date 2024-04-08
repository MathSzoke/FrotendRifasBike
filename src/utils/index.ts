export const phoneNumberAutoFormat = (phoneNumber: string): string =>
{
    let number = phoneNumber.trim().replace(/[^0-9]/g, "");

    if (number.length === 1) number = "55";
    if (number.length === 2) return `+${number}`;
    if (number.length <= 4) return `${number.replace(/(\d{2})(\d+)/, "+$1 ($2")}`;
    if (number.length <= 5) return `${number.replace(/(\d{2})(\d{2})(\d+)/, "+$1 ($2) $3")}`;
    if (number.length <= 9) return `${number.replace(/(\d{2})(\d{2})(\d{1})(\d+)/, "+$1 ($2) $3 $4")}`;
    if (number.length < 10) return `${number.replace(/(\d{2})(\d{2})(\d{1})(\d+)/, "+$1 ($2) $3 $4-")}`;
    if (number.length === 12) return `${number.replace(/(\d{2})(\d{2})(\d{1})(\d{4})/, "+$1 ($2) $3 $4-")}`;
    if (number.length < 13) return `${number.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d+)/, "+$1 ($2) $3 $4-$5")}`;

    return `${number.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/, "+$1 ($2) $3 $4-$5")}`;
};

export const cpfAutoFormat = (cpf: string): string =>
{
    const cleanedCpf = cpf.trim().replace(/[^0-9]/g, "");

    if (cleanedCpf.length < 4)
    {
        return cleanedCpf;
    }
    else if (cleanedCpf.length < 7)
    {
        return cleanedCpf.replace(/(\d{3})/, "$1.");
    }
    else if (cleanedCpf.length < 10)
    {
        return cleanedCpf.replace(/(\d{3})(\d{3})/, "$1.$2.");
    }
    else
    {
        return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    }
};

export const regexInputs = (n: string): string => n.replace(/[^\d]/g, "");