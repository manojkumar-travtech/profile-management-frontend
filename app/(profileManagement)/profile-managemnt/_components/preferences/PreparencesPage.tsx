import { DynamicForm } from '@/components/custom/Form'
import React from 'react'
import { preferencesFormConfig } from './preferencesFormConfig'

const PreparencesPage = () => {
  return (
    <div>
      < DynamicForm formConfig={preferencesFormConfig}  />
    </div>
  )
}

export default PreparencesPage
