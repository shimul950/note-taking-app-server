

export interface ICreateNotePayload {
  title: string;
  content: string;
}

export interface IUpdateNotePayload {
  title?: string;
  content?: string;
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
}