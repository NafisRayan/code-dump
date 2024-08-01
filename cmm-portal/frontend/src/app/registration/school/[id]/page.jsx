import RegistrationPage from '@/app/components/registration'
import React from 'react'

const page = ({ params }) => {
  return (
    <RegistrationPage schoolID={params.id} />
  )
}

export default page