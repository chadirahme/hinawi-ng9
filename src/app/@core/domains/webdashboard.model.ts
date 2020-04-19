export class WebDashboard {

  id: number;
  userId: number;
  dashName: string;
  dashOrder: number;
  youTubeDesc: string;
  safeURL: any;
}

export class MobileAttendance {
  userId: number;
  recNo: number;
  userName: string;
  customerType: string;
  customerName: string;
  checkinNote: string;
  checkoutNote: string;
  checkinLatitude: number;
  checkinLongitude: number;
  checkoutLatitude: number;
  checkoutLongitude: number;
  checkinTime: any;
  checkoutTime: any;
  localCheckinTime: any;
  reasonId: number;
  reasonDesc: string;
  checkoutReasonDesc: string;
}

export class ChequeModel {
  id: number;
}

export class HRListValues {
  id: number;
  fieldId: number;
  fieldName: string;
  description: string;
  arDescription: string;
  subId: number;
  defaultValue: string;
  required: string;
  priorityId: number;
  isEdit: string;
  notes: string;
  qbListID: string;
}
