export type IReport = {
  reportId: string
  reportTime: Date // or Date, if using actual Date objects
  reportTitle: string
  reportDescription?: string
  reportImage?: string
  reporterEmail: string
  reportLocation?: string
  reportType?: string
  informPerson?: string
  informLocalPolice?: string
  reporterContact?: string
  reporterAddress?: string
  createdAt: string // or Date
  updatedAt: string // or Date
  isBlocked: boolean
  isDelete: boolean
  status?: string
}
