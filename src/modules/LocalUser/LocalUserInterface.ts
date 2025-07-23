import { Schema, model, connect } from 'mongoose'

export type ILocalUser = {
  id: string
  userId: string
  role: string
  firstName: string
  middleName?: string
  lastName: string
  profileImage?: string
  gender?: 'male' | 'female' | 'other'
  age?: number
  dateOfBirth?: string
  contactNumber?: string
  emergencyContact?: string
  address?: string
  currentLocation?: string
  connectedMembers?: string[]
  status?: string
  isBlocked: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
