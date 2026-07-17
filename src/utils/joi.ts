// export const joiGeneralMessage = {
//     'string.base': 'Nilai {#label} harus berupa tipe teks.',
//     'string.empty': '{#label} tidak boleh kosong.',
//     'string.email': 'Format email pada {#label} tidak valid.',
//     'any.required': '{#label} harus diisi.',
//     'string.min': '{#label} harus memiliki panjang minimal {#limit} karakter.',
//     'any.only': 'type harus berupa salah satu dari {#valids}',
//     'boolean.base': 'Nilai {#label} harus berupa boolean.',
// }
export const joiGeneralMessage = {
    'string.base': 'Nilai {#label} harus berupa tipe teks.',
    'string.empty': '{#label} tidak boleh kosong.',
    'string.email': 'Format email pada {#label} tidak valid.',
    'string.min': '{#label} harus memiliki panjang minimal {#limit} karakter.',
    'string.max': '{#label} harus memiliki panjang maksimal {#limit} karakter.',
    'string.pattern.base': '{#label} tidak sesuai format yang diharapkan.',
    'any.required': '{#label} harus diisi.',
    'any.only': '{#label} harus berupa salah satu dari {#valids}.',
    'boolean.base': 'Nilai {#label} harus berupa boolean.'
}

export const cleanJoiErrorMessage = (error: any) => {
    if (error.isJoi) {
        const { details } = error
        const message = details
            .map((i: any) => i.message.replace(/"/g, ''))
            .join(', ')
        return message
    }
    return error.message
}