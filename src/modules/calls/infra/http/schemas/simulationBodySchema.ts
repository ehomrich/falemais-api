import { Segments, Joi } from 'celebrate';

export default {
  [Segments.BODY]: {
    planSlug: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    duration: Joi.number().positive().required(),
  },
};
