// issue.model.ts

export interface Issue {

  _id: string;
  issueKey: string;
  name: string;
  projectName: string;
  issuetype: string;
  summary: string;
  description: string;
  userName: string;
  status: string;
  timestamp: string;
  comments: [
    {
      body: any,
      //author:any

    }

  ],
  history: [
    {
      field: string,
      from: string,
      to: string,
      changedBy: string,
      changedAt: string
    }
  ]

}
