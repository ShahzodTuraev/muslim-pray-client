export interface PrayerTimeData {
  id: "01" | "02" | "03" | "04" | "05";
  prayer: string;
  time: string;
  sunrise?: string;
  checked: null | string;
}

export interface SavePrayerTime {
  req_task_id: string;
  req_task_code: string;
  req_task_name: string;
  createId: string;
  createdAt: Date;
  updateAt: Date;
}
export interface DeletePrayerTime {
  message: string;
}
