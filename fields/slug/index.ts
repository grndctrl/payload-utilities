import { Field } from 'payload'
import { formatSlug } from './hooks'
import FieldComponent from './Component'

type SlugField = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const slug: SlugField = (fieldToUse = 'title') => ({
  name: 'slug',
  type: 'group',
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'isOverrideActive',
      type: 'checkbox',
    },
  ],
  admin: {
    position: 'sidebar',
    components: {
      Field: FieldComponent,
    },
  },
  hooks: {
    beforeValidate: [formatSlug(fieldToUse)],
  },
})
