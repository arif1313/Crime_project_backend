export type ILocalPoliceCenter = {
  id: string
  userId: string
  stationName: string
  logo?: string
  contactNumber?: string
  emergencyContact1?: string
  emergencyContact2?: string
  stationAddress?: string
  status?: string
  isBlocked: boolean
  isDeleted: boolean
  createdAt: string // or Date
  updatedAt: string // or Date
}
