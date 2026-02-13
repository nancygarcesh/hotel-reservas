import Joi from 'joi'

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email es requerido'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'Contraseña es requerida'
    })
})

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(150)
    .required()
    .messages({
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.max': 'El nombre no puede tener más de 150 caracteres',
      'any.required': 'Nombre es requerido'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email es requerido'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'Contraseña es requerida'
    }),
  phone: Joi.string()
    .pattern(/^[0-9+\-\s()]{9,20}$/)
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Teléfono inválido'
    })
})

export const roomSchema = Joi.object({
  room_number: Joi.string()
    .required()
    .messages({
      'any.required': 'Número de habitación es requerido'
    }),
  type: Joi.string()
    .required()
    .messages({
      'any.required': 'Tipo de habitación es requerido'
    }),
  capacity: Joi.number()
    .min(1)
    .max(10)
    .required()
    .messages({
      'number.min': 'Capacidad mínima es 1',
      'number.max': 'Capacidad máxima es 10',
      'any.required': 'Capacidad es requerida'
    }),
  price_per_night: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.min': 'El precio no puede ser negativo',
      'any.required': 'Precio por noche es requerido'
    }),
  description: Joi.string()
    .allow('', null)
    .max(1000)
    .messages({
      'string.max': 'Descripción no puede tener más de 1000 caracteres'
    }),
  amenities: Joi.string()
    .allow('', null)
    .max(500)
    .messages({
      'string.max': 'Amenities no pueden tener más de 500 caracteres'
    })
})

export const reservationSchema = Joi.object({
  room_id: Joi.number()
    .required()
    .messages({
      'any.required': 'Habitación es requerida'
    }),
  start_date: Joi.date()
    .min(new Date().setHours(0, 0, 0, 0))
    .required()
    .messages({
      'date.min': 'La fecha de inicio no puede ser anterior a hoy',
      'any.required': 'Fecha de inicio es requerida'
    }),
  end_date: Joi.date()
    .greater(Joi.ref('start_date'))
    .required()
    .messages({
      'date.greater': 'La fecha de fin debe ser posterior a la fecha de inicio',
      'any.required': 'Fecha de fin es requerida'
    })
})

export const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(150)
    .messages({
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.max': 'El nombre no puede tener más de 150 caracteres'
    }),
  phone: Joi.string()
    .pattern(/^[0-9+\-\s()]{9,20}$/)
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Teléfono inválido'
    }),
  role_id: Joi.number()
    .min(1)
    .messages({
      'number.min': 'Rol inválido'
    })
})