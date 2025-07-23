export type ICenterPolice = {
  userId: string
  centerStationName: string
  logo?: string
  contactNumber?: string
  emergencyContact1?: string
  emergencyContact2?: string
  centerStationAddress?: string
  status?: string
  isBlocked: boolean
  isDeleted: boolean
  createdAt: string // or Date
  updatedAt: string // or Date
}
